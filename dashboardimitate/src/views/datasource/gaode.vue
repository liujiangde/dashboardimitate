<!-- 高德地图 -->
<template>
<div id="container" class="amap"  ref="map-container">
  <!-- <div class="amap-info">
    <h4 v-html="state.text"></h4>
    <p>当前中心点：<span id="map-center">{{ state.mapdata.center.join(' ') }}</span></p>
</div> -->
</div>
</template>

<script lang='ts' setup >
import AMapLoader from '@amap/amap-jsapi-loader'
import { reactive } from 'vue'
const emit = defineEmits(['weath'])
const state = reactive({
  text: '地图当前静止',
  mapdata: {
    center: [120.200268, 30.289831], // 中心经纬度
    zoom: 10, // 设置地图的缩放级别
    pitch: 45, // 地图俯仰角度，有效范围 0 度- 83 度
    viewMode: '2D', // 地图式
    terrain: true, // 开启地形图
    features: ['bg', 'point', 'road', 'building'] // 设置地图上显示的元素种类, 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
  }
})
let map: any = {}

const initMap = (AMap) => {
  map = new AMap.Map('container', {
    ...state.mapdata
  })

  // 现象：当数组中的组件有一个没加载进来的话，所有的组件都不会显示
  AMap.plugin(
    ['AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation', 'AMap.PlaceSearch', 'AMap.Weather'], function () { // 异步加载插件
      const toolbar = new AMap.ToolBar({ position: 'LT' })
      const Scale = new AMap.Scale({ position: 'LB' })
      const weather = new AMap.Weather() // 执行实时天气信息查询
      const container = document.getElementById('container')
      weather.getLive('杭州市', function (err, data) {
        if (!err) {
          // @ts-ignore
          emit('update:weath', data)
        }
      })
      const Geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })
      const palce = new AMap.PlaceSearch()
      map.addControl(Geolocation)
      map.addControl(Scale)
      map.addControl(toolbar)
    })

  // 或者使用 $refs 获取节点
  const infoWindow = new AMap.InfoWindow({ // 创建信息窗体
    isCustom: true, // 使用自定义窗体
    content: '<div style="width: 100%;height: 30px;background:#fff;line-height:30px">这是杭州</div>', // 信息窗体的内容可以是任意html片段
    offset: new AMap.Pixel(16, -45)
  })

  const onMarkerClick = function (e) {
    infoWindow.open(map, e.target.getPosition())// 打开信息窗体
    // e.target就是被点击的Marker
  }
  const onClick = (e) => {
    state.mapdata.center = [e.lnglat.lng, e.lnglat.lat]
    map.setCenter([e.lnglat.lng, e.lnglat.lat]) // 设置地图中心点
  }
  const trafficLayer = new AMap.TileLayer.Traffic({
    zIndex: 10
  })

  map.add(trafficLayer)// 添加图层到地图
  const marker = new AMap.Marker({
    position: [120.200268, 30.289831]// 位置
  })
  map.add(marker)// 添加到地图
  marker.on('click', onMarkerClick)// 绑定click事件
  map.on('click', onClick)
}
AMapLoader.load({
  key: 'bc4d1a7b0ff77285a51ac686784e427e',
  // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  AMapUI: { // 是否加载 AMapUI，缺省不加载
            	version: '1.1', // AMapUI 缺省 1.1
            	plugins: [] // 需要加载的 AMapUI ui插件
  },
  Loca: { // 是否加载 Loca， 缺省不加载
            	version: '1.3.2' // Loca 版本，缺省 1.3.2
  }
}).then(AMap => {
  initMap(AMap)
}).catch(e => {
        	console.error(e)
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
