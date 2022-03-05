<template>
  <div>
    <div v-if="finalRelease.name !== ''">
      <h3 style="margin-bottom: 2px;">正式版 {{finalRelease.name}}</h3>
      <span class="caption">发布于 {{formatDate(finalRelease.publishDate)}}</span>

      <blockquote>
        <h4 style="margin-bottom: 4px;margin-top: 8px;">更新日志</h4>
        <div v-html="finalRelease.updateLog.replace(/新增内容：\n/g, '').replace(/· /g, '').replace(/\n/g, '<br>')"></div>
      </blockquote>
    </div>
    <div class="link">
      <a href="https://apps.apple.com/cn/app/ham/id1577896044" target="_blank" rel="noopener noreferrer">
        前往App Store下载正式版
        <OutboundLink/>
      </a>

    </div>
    <div v-if="betaRelease.name !== ''">
      <h3 style="margin-bottom: 2px;">测试版 {{betaRelease.name}}</h3>
      <span v-if="betaRelease.publishDate != null" class="caption">发布于 {{formatDate(betaRelease.publishDate)}}</span>
      <blockquote v-if="betaRelease.updateLog !== ''">
        <h4 style="margin-bottom: 4px;margin-top: 8px;">更新日志</h4>
        <div v-html="betaRelease.updateLog.replace(/- /g, '').replace(/\n/g, '<br>')"></div>
      </blockquote>
    </div>
    <div class="custom-block tip"  style="border-color: lightgray;">
      <p class="custom-block-title">提示</p>
      <p>下载测试版前，请确保你的设备已安装
        <a href="https://apps.apple.com/us/app/testflight/id899247664" target="_blank" rel="noopener noreferrer">
        TestFlight
        <OutboundLink/>
      </a>
        。
      </p>
    </div>
    <div class="link">
<!--      https://testflight.apple.com/join/waKNnCG3-->
      <a href="itms-beta://testflight.apple.com/join/waKNnCG3" target="_blank" rel="noopener noreferrer">
        加入TestFlight内测
        <OutboundLink/>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import {jsonp} from "vue-jsonp";

export default {
  name: "iOSDownloadLink",
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

</style>