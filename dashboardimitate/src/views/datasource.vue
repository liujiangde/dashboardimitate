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
        <Gaode class="amap-gaode">

        </Gaode>
      </div>
      <div class="data-overview-content-r">
          <div class="data-overview-content-r-qrcode">
            <img src="src/assets/zsm.jpeg" class="data-overview-content-r-img" alt="" srcset="">
          </div>
          <div class="data-overview-content-r-fall">
            ajifng
          </div>
      </div>
  </div>
</template>

<script lang="ts"  setup >
import Gaode from "./datasource/gaode.vue";
import CountShow  from "./datasource/countShow.vue";
import { h, computed,reactive, onMounted, toRefs, nextTick, ref,  defineComponent} from 'vue'

const state = reactive({
    activeKey: 'one',
    countList: {
      first : 10,
      second: 20,
      third: 30,
      four: 40
    },
    cycle: '实时',
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
        state.cycle = '实时'
        // Object.keys(state.countList).forEach( item  => state.countList[item.toString()] += 1   )
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
        state.cycle = '实时'
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

      background-color: red;
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
