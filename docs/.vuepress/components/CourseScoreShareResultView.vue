<template>
  <div>
    <h2>给分数据 - {{ courseInfo.name }}</h2>
    <span>{{ courseInfo.instructor }}</span>


    <div style="height: 16px;"/>

    <div class="container">
      <div class="course-score-item" v-for="(info, i) in scoreInfo.data">
        <div class="course-score-item-tip">{{ info.from }}-{{ info.to }}</div>
        <div
            :style="{ width: info.total / scoreInfo.total * 80 + '%',
            background: i < colorArr.length ? colorArr[i] : colorArr[colorArr.length - 1]
        }"
             class="course-score-item-division"
             v-if="info.total > 0"></div>
        <span :style="{
          color: i < colorArr.length ? colorArr[i] : colorArr[colorArr.length - 1]
        }">{{ info.total }}</span>
      </div>
    </div>

    <div v-if="scoreInfo.total > 2">
      <div style="height: 12px"/>
      <div>
        <span>均分 {{ scoreInfo.average.toFixed(1) }}</span>
      </div>
    </div>


    <div style="height: 56px"/>
    <span class="tip">该给分数据由用户于{{ dataTime }}生成，不保证数据实时性。</span>

  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'CourseScoreShareResultView',
  data() {
    return {
      courseInfo: {
        name: '',
        instructor: ''
      },
      scoreInfo: {
        total: 0,
        average: 0.0,
        data: []
      },
      dataTime: '',
      colorArr: [
          '#4CAF50',
          '#8BC34A',
          '#FFEB3B',
          '#FFC107',
          '#FF9800',
          '#FF5722',
      ]
    }
  },
  created() {
    const { name, instructor, sign, data, dataTime, v } = this.$route.query
    if (v !== '2') {
      this.pushToHome()
      return
    }
    this.courseInfo.name = decodeURI(name)
    this.courseInfo.instructor = decodeURI(instructor)
    this.dataTime = dataTime

    const correctSign = md5(`v2${name}${instructor}${data}${dataTime}uTYbpYG7YSVzncQZ`)
    if (correctSign !== sign) {
      this.pushToHome()
      return
    }
    this.scoreInfo = JSON.parse(data)
    console.log(this.scoreInfo)
  },
  pushToHome() {
    this.$router.push('/')
  }
}
</script>

<style>
.course-score-item {
  display: flex;
  align-items: center;
}

.course-score-item-tip {
  width: 52px;
  font-size: 14px;
}

.course-score-item-division {
  height: 6px;
  border-radius: 3px;
  margin-right: 8px;
}

.tip {
  font-size: 12px;
}

.container {
  width: 80%;
  position: relative;
}

</style>
