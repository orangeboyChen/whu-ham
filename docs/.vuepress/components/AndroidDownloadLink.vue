<template>
  <div>
    <div v-if="finalRelease.name !== ''">
      <div>
        <h3 style="margin-bottom: 2px;">正式版 {{finalRelease.name}}</h3>
        <span class="caption">发布于 {{formatDate(finalRelease.publishDate)}}</span>

        <blockquote>
          <span class="ham_text_t1">更新日志</span>
          <div v-html="finalRelease.updateLog.replace(/- /g, '').replace(/\n/g, '<br>')"></div>
        </blockquote>

        <ArrowLink :href="finalRelease.apkUrl" text="下载安装包"/>
      </div>
      <div v-if="betaRelease.name !== ''">
        <h3 style="margin-bottom: 2px;">测试版 {{betaRelease.name}}</h3>
        <span class="caption">发布于 {{formatDate(betaRelease.publishDate)}}</span>
        <blockquote>
          <span class="ham_text_t1">更新日志</span>
          <div v-html="betaRelease.updateLog.replace(/- /g, '').replace(/\n/g, '<br>')"></div>
        </blockquote>

        <div class="custom-container warning">
          <p class="custom-container-title">注意</p>
          <p>使用测试版含有不稳定因素。如果在使用时遇到了问题，欢迎在Github中进行反馈。</p>
        </div>
        <ArrowLink :href="betaRelease.apkUrl" text="下载测试版安装包"/>
      </div>
    </div>
    <div v-else>
      <ArrowLink href="https://github.com/orangeboyChen/whu-ham/releases/latest" text="前往Github Release"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import ArrowLink from "./ArrowLink.vue";

export default {
  name: "AndroidDownloadLink",
  components: {
    ArrowLink
  },
  data() {
    return {
      finalRelease: {
        name: '',
        updateLog: '',
        publishDate: new Date(),
        apkUrl: '',

      },
      betaRelease: {
        name: '',
        updateLog: '',
        publishDate: new Date(),
        apkUrl: '',
      }
    }
  },
  created() {
    this.getAndroidVersionInfo();
  },
  methods: {
    formatDate: function(date) {
      return moment(date).fromNow();
    },
    getAndroidVersionInfo: async function() {
      let res = await axios.get(`https://api.github.com/repos/orangeboyChen/whu-ham/releases`);
      if(res.status !== 200) {
        return;
      }

      //1. 对所有的release按照日期排序
      let releaseList = res.data;
      // releaseList.sort((a, b) => new Date(a['published_at']) > new Date(b['published_at']));

      //2. 找到正式版和beta版的asset
      let finalRelease = null;
      let betaRelease = null;

      for(let i = 0; i < releaseList.length; i++) {
        let release = releaseList[i];
        if(finalRelease == null && release.name.indexOf('beta') === -1) {
          finalRelease = release;
        }

        if(betaRelease == null && release.name.indexOf('beta') !== -1) {
          betaRelease = release;
        }

        if(finalRelease != null && betaRelease != null) {
          break;
        }
      }

      //3. 组装
      this.finalRelease.name = finalRelease.name;
      this.finalRelease.updateLog = finalRelease.body;
      this.finalRelease.publishDate = new Date(finalRelease['published_at']);
      if(finalRelease.assets.length > 0 && finalRelease.assets[0]['browser_download_url'].indexOf('apk') !== -1) {
        this.finalRelease.apkUrl = finalRelease.assets[0]['browser_download_url']
      }

      // this.betaRelease.name = betaRelease.name;
      // this.betaRelease.updateLog = betaRelease.body;
      // this.betaRelease.publishDate = new Date(betaRelease['published_at']);
      // if(betaRelease.assets.length > 0 && betaRelease.assets[0]['browser_download_url'].indexOf('apk') !== -1) {
      //   this.betaRelease.apkUrl = betaRelease.assets[0]['browser_download_url']
      // }
    }
  }
}
</script>

<style scoped>
.caption {
  color: gray;
  font-size: small;
}

.ham_text_t1 {
  font-size: 1.15rem;
  font-weight: 600;
}

</style>
