<!-- 高德地图 -->
<template>
<div id="container" class="amap"  ref="map-container">
  <div class="amap-info">
    <h4 v-html="state.text"></h4>
    <p>当前中心点：<span id="map-center">{{ state.mapdata.center.join(' ') }}</span></p>
</div>
</div>
</template>

<script lang='ts' setup >
import AMapLoader from '@amap/amap-jsapi-loader';
import { reactive } from 'vue-demi';

let state = reactive({
    text : '地图当前静止',
    mapdata: {
      center: [120.200268,30.289831], //中心经纬度
      zoom: 10, //设置地图的缩放级别
      pitch:45, // 地图俯仰角度，有效范围 0 度- 83 度
      viewMode:'3D', // 地图式
      terrain: true // 开启地形图

    }
})
let map= {};
// 声明点击事件的回调函数
function onClick(e){

}
function mapMove(params){
      console.log(params);
        state.mapdata.zoom = params.getZoom(); //获取当前地图级别
        state.mapdata.center = params.getCenter(); //获取当前地图中心
        state.text = '当前地图正在移动'
    }
const initMap = (AMap) => {
            map = new AMap.Map("container",{
              ...state.mapdata
            });
            // 或者使用 $refs 获取节点
            console.log(map);

            // this.map = new AMap.Map(this.$refs.container);

        }


AMapLoader.load({
            "key": "1cc962c6961a28cf2cc48437ed6c2899",
              // 申请好的Web端开发者Key，首次调用 load 时必填
            "version": "1.4.15",    // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            "plugins": [],          // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            "AMapUI": {             // 是否加载 AMapUI，缺省不加载
            	"version": '1.1',   // AMapUI 缺省 1.1
            	"plugins":[]        // 需要加载的 AMapUI ui插件
            },
            "Loca": {               // 是否加载 Loca， 缺省不加载
            	"version": '1.3.2'  // Loca 版本，缺省 1.3.2
            }
        }).then( AMap => {
            initMap(AMap)
        }).catch(e => {
        	console.error(e);
        })
</script>
<style lang="scss" scoped>
  @import '/src/theme.scss';

.amap{
  height: 100%;
  width: 100%;
  // position: relative;
  .amap-info{
    width: auto;
    min-width: 20rem;
    opacity: 0.8;

    background-color: $white;
  }
}
</style>
