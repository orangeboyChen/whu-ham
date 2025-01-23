<script setup lang="ts">
import {AndroidVersionInfo} from "../service/android_version_fetch";
import ArrowLink from "../../../components/ArrowLink.vue";
import {onMounted} from "vue";

const {item, i} = defineProps<{
  item: AndroidVersionInfo,
}>()

onMounted(() => {
  console.info(i)
})

</script>

<template>
  <div>
    <h3>{{ item.name }}</h3>
    <span class="caption">发布于 {{ item.prerelease }}</span>

    <blockquote>
      <div class="ham_text_t1">- 1111</div>
      <div class="ham_text_t1">- 1111</div>
    </blockquote>

    <div class="container">
      <span>ARM64 - <ArrowLink href="" text="下载"></ArrowLink></span>
    </div>
  </div>
</template>

<style scoped>

</style>
