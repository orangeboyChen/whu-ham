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
import HamLink from './ArrowLink.vue';

export default {
  name: "iOSDownloadLink",
  components: {ArrowLink: HamLink},
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
      moment.locale('zh-cn');
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

        //组装数据
        that.finalRelease.name = releaseReleaseInfo.version;
        that.finalRelease.updateLog = releaseReleaseInfo.releaseNotes;
        that.finalRelease.publishDate = new Date(releaseReleaseInfo.releaseDate);
      };

      let url = "https://itunes.apple.com/lookup?id=1577896044&callback=jsonpCallback";
      let script = document.createElement("script");
      script.setAttribute("src", url);
      document.getElementsByTagName("head")[0].appendChild(script);
    },
    getIOSBetaVersionInfo: async function () {
      let res = await axios.get('https://api.ham.nowcent.cn/version');
      if(res.status !== 200) {
        return;
      }

      let betaReleaseInfo = res.data.data.iosVersion;
      this.betaRelease.name = `${betaReleaseInfo.versionName}(${betaReleaseInfo.versionCode})`
      this.betaRelease.updateLog = betaReleaseInfo.versionDescription ?? '';
      this.betaRelease.publishDate = betaReleaseInfo.betaUpdateTime ?? null;
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
