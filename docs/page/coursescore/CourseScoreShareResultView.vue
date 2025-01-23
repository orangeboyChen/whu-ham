<script setup lang="ts">

import {getColorConfig} from './service/color';

const colorConfig = getColorConfig();
console.log(window.location.search)

</script>

<template>
  <div>{{colorConfig['0-59']}}</div>
</template>

<style scoped lang="scss">

</style>
