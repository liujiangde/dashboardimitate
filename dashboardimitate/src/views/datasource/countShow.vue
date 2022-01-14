<template>
  <div class="data-content">
          <div class="data-conten-ttitle">
            <div>{{props.title }}</div>
            <slot
            name = 'menu'
            v-bind:activeKey="props.value" ></slot>
          </div>
          <div class="data-list-content">
              <div class="data-list-info">
                <p>{{props.cycle}}的数量</p>
                <span>{{props.countList.first}}</span>
              </div>
              <div class="data-list-info">
                <p>{{props.cycle}}的数量</p>
                <span>{{props.countList.second}}</span>
              </div>
              <div class="data-list-info">
                <p>{{props.cycle}}的数量</p>
                <span>{{props.countList.third}}</span>
              </div>
              <div class="data-list-info">
                <p>{{props.cycle}}的数量</p>
                <span>{{props.countList.four}}</span>
              </div>
            </div>
        </div>
</template>

<script setup lang="ts">
  import { h, computed,reactive, onMounted, toRefs, nextTick, ref,  defineComponent} from 'vue'
  const props = defineProps({
        title: {
          type:String,
          default:'概况'
        },
        value:{
            type:String,
            default:'two'
        },
        countList: {
          type: Object,
          default: {
            first : 0,
            second: 0,
            third: 0,
            four: 0
          }
        },
        cycle: {
          type:String,
          default:'昨天'
        }
    })

const state = reactive({


})
</script>

<style scoped lang='scss'>

@import '/src/theme.scss';

.data-content{
        padding: 12px;
        .data-conten-ttitle{
          font-size: $lineHight-h2;
          display: flex;
        }
        .data-list-content{
        display: flex;
        justify-content: space-around;
        width: 100%;
        height: 100px;
        .data-list-info{
          width: 25%;
          > span{
            font-size: $font-h2;
          }
        }
      }
      }
</style>
