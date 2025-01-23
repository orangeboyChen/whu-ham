<script setup lang="ts">

import {onMounted, ref} from "vue";
import {getLatestIOSVersionInfo, IOSVersionInfo} from "../service/ios_version_fetch";
import ArrowLink from "../../../components/ArrowLink.vue";
import {formatDate} from "../service/date";

const versionInfo = ref<IOSVersionInfo>()

onMounted(async () => {
  versionInfo.value = await getLatestIOSVersionInfo();
})

</script>

<template>
  <div>
    <div v-if="versionInfo">
      <h3>{{ versionInfo.name }} - 正式版</h3>
      <span class="caption">发布于 {{ formatDate(versionInfo.publishDate) }}</span>
      <blockquote>
        <div class="ham_text_t1">{{ versionInfo.updateLog }}</div>
      </blockquote>
      <ArrowLink href="https://apps.apple.com/cn/app/ham/id1577896044" text="前往App Store下载正式版"/>
    </div>

    <div>
      <h3>测试版</h3>
      <div class="info custom-block">
        <p class="custom-block-title">提示</p>
        <p>下载测试版前，请确保你的设备已安装
          <ArrowLink href="https://apps.apple.com/us/app/testflight/id899247664" text="TestFlight"/>
          。
        </p>
      </div>
      <ArrowLink href="itms-beta://testflight.apple.com/join/waKNnCG3" text="加入TestFlight内测"/>
    </div>
  </div>
</template>

<style scoped>

</style>
