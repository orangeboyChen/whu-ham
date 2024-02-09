<template>
  <div>
    <div v-if="finalRelease.name !== ''">
      <h3 style="margin-bottom: 2px;">正式版 {{finalRelease.name}}</h3>
      <span class="caption">发布于 {{formatDate(finalRelease.publishDate)}}</span>

      <blockquote>
        <span class="ham_text_t1">更新日志</span>
        <div v-html="finalRelease.updateLog.replace(/新增内容：\n/g, '').replace(/· /g, '').replace(/\n/g, '<br>')"></div>
      </blockquote>
    </div>
    <ArrowLink href="https://apps.apple.com/cn/app/ham/id1577896044" text="前往App Store下载正式版"/>
    <div v-if="betaRelease.name !== ''">
      <h3 style="margin-bottom: 2px;">测试版 {{betaRelease.name}}</h3>
      <span v-if="betaRelease.publishDate != null" class="caption">发布于 {{formatDate(betaRelease.publishDate)}}</span>
      <blockquote v-if="betaRelease.updateLog !== ''">
        <span class="ham_text_t1">更新日志</span>
        <div v-html="betaRelease.updateLog.replace(/- /g, '').replace(/\n/g, '<br>')"></div>
      </blockquote>
    </div>
    <div class="custom-container tip"  style="border-color: lightgray;">
      <p class="custom-container-title">提示</p>
      <p>下载测试版前，请确保你的设备已安装
        <ArrowLink href="https://apps.apple.com/us/app/testflight/id899247664" text="TestFlight"/>
        。
      </p>
    </div>
    <ArrowLink href="itms-beta://testflight.apple.com/join/waKNnCG3" text="加入TestFlight内测"/>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ArrowLink from './ArrowLink.vue';

export default {
  name: "iOSDownloadLink",
  components: {ArrowLink},
  data() {
    return {
      finalRelease: {
        name: '',
        updateLog: '',
        publishDate: new Date(),

      },
      betaRelease: {
        name: '',
        updateLog: '',
        publishDate: new Date(),
      }
    }
  },
  created() {
    this.getIOSReleaseVersionInfo();
    this.getIOSBetaVersionInfo();
  },
  methods: {
    formatDate: function(date) {
      moment.locale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
          LT: 'Ah点mm分',
          LTS: 'Ah点m分s秒',
          L: 'YYYY-MM-DD',
          LL: 'YYYY年MMMD日',
          LLL: 'YYYY年MMMD日Ah点mm分',
          LLLL: 'YYYY年MMMD日ddddAh点mm分',
          l: 'YYYY-MM-DD',
          ll: 'YYYY年MMMD日',
          lll: 'YYYY年MMMD日Ah点mm分',
          llll: 'YYYY年MMMD日ddddAh点mm分'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (h, meridiem) {
          let hour = h;
          if (hour === 12) {
            hour = 0;
          }
          if (meridiem === '凌晨' || meridiem === '早上' ||
              meridiem === '上午') {
            return hour;
          } else if (meridiem === '下午' || meridiem === '晚上') {
            return hour + 12;
          } else {
            // '中午'
            return hour >= 11 ? hour : hour + 12;
          }
        },
        meridiem: function (hour, minute, isLower) {
          const hm = hour * 100 + minute;
          if (hm < 600) {
            return '凌晨';
          } else if (hm < 900) {
            return '早上';
          } else if (hm < 1130) {
            return '上午';
          } else if (hm < 1230) {
            return '中午';
          } else if (hm < 1800) {
            return '下午';
          } else {
            return '晚上';
          }
        },
        calendar: {
          sameDay: function () {
            return this.minutes() === 0 ? '[今天]Ah[点整]' : '[今天]LT';
          },
          nextDay: function () {
            return this.minutes() === 0 ? '[明天]Ah[点整]' : '[明天]LT';
          },
          lastDay: function () {
            return this.minutes() === 0 ? '[昨天]Ah[点整]' : '[昨天]LT';
          },
          nextWeek: function () {
            let startOfWeek, prefix;
            startOfWeek = moment().startOf('week');
            prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
          },
          lastWeek: function () {
            let startOfWeek, prefix;
            startOfWeek = moment().startOf('week');
            prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
            return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
          },
          sameElse: 'LL'
        },
        ordinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
          switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
              return number + '日';
            case 'M':
              return number + '月';
            case 'w':
            case 'W':
              return number + '周';
            default:
              return number;
          }
        },
        relativeTime: {
          future: '%s内',
          past: '%s前',
          s: '几秒',
          m: '1 分钟',
          mm: '%d 分钟',
          h: '1 小时',
          hh: '%d 小时',
          d: '1 天',
          dd: '%d 天',
          M: '1 个月',
          MM: '%d 个月',
          y: '1 年',
          yy: '%d 年'
        },
        week: {
          // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
          dow: 1, // Monday is the first day of the week.
          doy: 4  // The week that contains Jan 4th is the first week of the year.
        }
      });
      return moment(date).fromNow();
    },
    getIOSReleaseVersionInfo: async function () {
      // let res = await axios.get('https://itunes.apple.com/lookup?id=1577896044', {
      //   headers: {
      //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.3 Safari/605.1.15'
      //   }
      // });
      // if(res.status !== 200 || res.data.resultCount <= 0) {
      //   return;
      // }

      // 得到查询结果后的回调函数;

      if(typeof window === 'undefined') {
        return;
      }

      let that = this;
      window.jsonpCallback = function (data) {
        let releaseReleaseInfo = data.results[0];
        console.log(releaseReleaseInfo)

        //组装数据
        that.finalRelease.name = releaseReleaseInfo.version;
        that.finalRelease.updateLog = releaseReleaseInfo.releaseNotes;
        that.finalRelease.publishDate = new Date(releaseReleaseInfo.currentVersionReleaseDate);
      };

      let url = "https://itunes.apple.com/lookup?id=1577896044&callback=jsonpCallback";
      let script = document.createElement("script");
      script.setAttribute("src", url);
      document.getElementsByTagName("head")[0].appendChild(script);
    },
    getIOSBetaVersionInfo: async function () {
      // let res = await axios.get('https://api.ham.nowcent.cn/version');
      // if(res.status !== 200) {
      //   return;
      // }
      //
      // let betaReleaseInfo = res.data.data.iosVersion;
      // this.betaRelease.name = `${betaReleaseInfo.versionName}(${betaReleaseInfo.versionCode})`
      // this.betaRelease.updateLog = betaReleaseInfo.versionDescription ?? '';
      // this.betaRelease.publishDate = betaReleaseInfo.betaUpdateTime ?? null;
    }
  }
}
</script>

<style scoped>
.caption {
  color: gray;
  font-size: small;
}

.link {
  margin-top: 16px;
}

.ham_text_t1 {
  font-size: 1.15rem;
  font-weight: 600;
}

</style>
