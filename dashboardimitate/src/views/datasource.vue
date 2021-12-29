<!-- 数据概览 data-overview -->
<template>
  <div class="data-overview-content">
      <div class="data-overview-content-l">
        <CountShow :title="'概况'"  :value ="state.activeKey"  :countList ="state.countList" :cycle="state.cycle">
            <template   v-slot:menu ="slotprops">
              <n-menu v-model:value="slotprops.activeKey"
              @update:value="setactiveKey"
              mode="horizontal"
              :options="state.menuOptions" />
            </template>
        </CountShow>
        <Gaode class="amap-gaode" v-model:weath="weathdata">
        </Gaode>
      </div>
      <div class="data-overview-content-r">
          <div class="data-overview-content-r-qrcode">
            <img ref="imgset" :src='state.imgSrc' class="data-overview-content-r-img" alt="" srcset="">
          </div>
          <div class="data-overview-content-r-fall">
             <p>{{weathdata.city}}当日天气</p>
            <div>天气：{{weathdata.weather}}</div>
            <div >实时气温：{{weathdata.temperature}} &deg;C</div>
            <div>风向：{{weathdata.windDirection}}</div>
            <div>风力：{{weathdata.windPower}}级</div>
            <div>空气湿度：{{weathdata.humidity}}%</div>
            <div>天气获取时间：{{weathdata.reportTime}}</div>
          </div>
      </div>
  </div>
</template>

<script lang="ts"  setup >
import Gaode from "@/views/datasource/gaode.vue";
import CountShow  from "@/views/datasource/countShow.vue";
import { h, computed,reactive, onMounted, toRefs, nextTick, ref,  defineComponent} from 'vue'

const weathdata= ref({})

const state = reactive({
    imgSrc: 'https://image.shutterstock.com/image-photo/tree-frog-flying-laughing-animal-600w-752492104.jpg',
    activeKey: 'one',
    countList: {
      first : 10,
      second: 20,
      third: 30,
      four: 40
    },
    cycle: '今日',
   menuOptions : [
  {
    label: '实时',
    key: 'one',
  },
  {
    label: '昨日',
    key: 'two',
  },
  {
    label: '近7天',
    key: 'three',
  },
  {
    label: '近30天',
    key: 'four',
  }
]
})


const setactiveKey = (params: String) => {
    switch (params) {
      case 'one':
        state.activeKey = 'one'
        state.cycle = '今日'
        state.countList.first++
        return
      case 'two':
        state.activeKey = 'two'
        state.cycle = '昨日'
        state.countList.second++
        return
      case 'three':
        state.activeKey = 'three'
        state.cycle = '近7天'
        state.countList.third++
        return
      case 'four':
        state.activeKey = 'four'
        state.cycle = '近30天'
        state.countList.four++
        return
      default:
        state.activeKey = 'one'
        state.cycle = '今日'
        return
    }
}


</script>
<style lang="scss" scoped>
  @import '/src/theme.scss';

  .data-overview-content{
    display: flex;
    width: 100%;
    .data-overview-content-l{
      width: 75%;
      height: 100%;
      padding: 0 10px;

      .amap-gaode{
        height: 490px;
        width: 100%;
      }
    }
    .data-overview-content-r{
      width: 25%;
      height: 278px;

      // background-color: red;
      .data-overview-content-r-qrcode{
        width: 100%;
        // padding-bottom: 100%;
        // background-color: $pure-pink;
        // background-image: u;
        .data-overview-content-r-img{
          width: 100%;
          height: calc(100% - 278px);
          // img父容器的高度会比img的高度多几像素的问题
          // 基线问题，div是块级标签，img是行内块元素，在块元素里默认有3px或者4px空白（其实就是和文本的基线对齐不管有没有文本）
          display:block

        }
      }
      .data-overview-content-r-fall{
        width: 100%;
        height: 100%;
      }
     }
  }
</style>
