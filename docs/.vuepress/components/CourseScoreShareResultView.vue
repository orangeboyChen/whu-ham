<template>
  <div>
    <h2>给分数据 - {{ courseInfo.name }}</h2>
    <span>{{ courseInfo.instructor }}</span>


    <div style="height: 16px;"/>

    <div class="container">
      <div class="course-score-item">
        <div class="course-score-item-tip">90-100</div>
        <div style="background: #4CAF50;"
             :style="{width: scoreInfo.a / scoreInfo.total * 80 + '%'}"
             class="course-score-item-division"
             v-if="scoreInfo.a > 0"></div>
        <span style="color: #4CAF50;">{{ scoreInfo.a }}</span>
      </div>

      <div class="course-score-item">
        <div class="course-score-item-tip">85-90</div>
        <div style="background: #8BC34A"
             :style="{width: scoreInfo.b / scoreInfo.total * 80 + '%'}"
             class="course-score-item-division"
             v-if="scoreInfo.b > 0"></div>
        <span style="color: #8BC34A;">{{ scoreInfo.b }}</span>
      </div>

      <div class="course-score-item">
        <div class="course-score-item-tip">80-85</div>
        <div style="background: #FFEB3B"
             :style="{width: scoreInfo.c / scoreInfo.total * 80 + '%'}"
             class="course-score-item-division"
             v-if="scoreInfo.c > 0"></div>
        <span style="color: #FFEB3B;">{{ scoreInfo.c }}</span>
      </div>

      <div class="course-score-item">
        <div class="course-score-item-tip">70-80</div>
        <div style="background: #FFC107"
             :style="{width: scoreInfo.d / scoreInfo.total * 80 + '%'}"
             class="course-score-item-division"
             v-if="scoreInfo.d > 0"></div>
        <span style="color: #FFC107;">{{ scoreInfo.d }}</span>
      </div>

      <div class="course-score-item">
        <div class="course-score-item-tip">60-70</div>
        <div style="background: #FF9800"
             :style="{width: scoreInfo.e / scoreInfo.total * 80 + '%'}"
             class="course-score-item-division"
             v-if="scoreInfo.e > 0"></div>
        <span style="color: #FF9800;">{{ scoreInfo.e }}</span>
      </div>

      <div class="course-score-item">
        <div class="course-score-item-tip">0-60</div>
        <div style="background: #FF5722"
             :style="{width: scoreInfo.f / scoreInfo.total * 80 + '%'}"
             class="course-score-item-division"
             v-if="scoreInfo.f > 0"></div>
        <span style="color: #FF5722;">{{ scoreInfo.f }}</span>
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
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        total: 0,
        average: 0.0
      },
      dataTime: ''
    }
  },
  created() {
    const { name, instructor, sign, data, dataTime } = this.$route.query
    this.courseInfo.name = decodeURI(name)
    this.courseInfo.instructor = decodeURI(instructor)
    this.dataTime = dataTime

    const correctSign = md5(`${name}${instructor}${data}${dataTime}uTYbpYG7YSVzncQZ`)
    if (correctSign !== sign) {
      this.$router.push('/')
      return
    }
    this.scoreInfo = JSON.parse(data)
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
