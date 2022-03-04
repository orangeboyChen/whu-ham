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
    <div class="link">
      <a href="https://testflight.apple.com/join/waKNnCG3" target="_blank" rel="noopener noreferrer">
        加入TestFlight内测
        <OutboundLink/>
      </a>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
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
    // this.getIOSBetaVersionInfo();
  },
  methods: {
    formatDate: function(date) {
      moment.locale('zh-cn');
      return moment(date).fromNow();
    },
    getIOSReleaseVersionInfo: async function () {
      let res = await axios.get('https://itunes.apple.com/lookup?id=1577896044');
      if(res.status !== 200 || res.data.resultCount <= 0) {
        return;
      }

      let releaseReleaseInfo = res.data.results[0];

      //组装数据
      this.finalRelease.name = releaseReleaseInfo.version;
      this.finalRelease.updateLog = releaseReleaseInfo.releaseNotes;
      this.finalRelease.publishDate = new Date(releaseReleaseInfo.releaseDate);
    },
    getIOSBetaVersionInfo: async function () {
      let res = await axios.get('https://api.ham.nowcent.cn/version');
      if(res.status !== 200) {
        return;
      }

      let betaReleaseInfo = res.data.data.iosVersion;
      this.betaRelease.name = `${betaReleaseInfo.versionName}(${betaReleaseInfo.versionCode})`
      this.betaRelease.updateLog = betaReleaseInfo.versionDescription ?? '';
      this.betaRelease.publishDate = betaReleaseInfo.publishDate ?? null;

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