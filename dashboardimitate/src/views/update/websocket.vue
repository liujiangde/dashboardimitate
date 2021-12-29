<!--  -->
<template>
    <n-space vertical>
    <n-input-group>
      <n-input :value="state.text" @input="changetext" :style="{ width: '50%' }" />
      <n-button type="primary" @click="send" ghost>发送</n-button>
    </n-input-group>
  </n-space>
</template>

<script lang="ts" setup >
import { ref,reactive, getCurrentInstance, defineComponent,
    onBeforeMount,// 在组件挂载之前执行的函数
    onMounted,
    onBeforeUpdate,// 在组件修改之前执行的函数
    onUpdated,
    onBeforeUnmount,// 在组件卸载之前执行的函数
    onUnmounted
 } from 'vue';
import { useRouter } from "vue-router"

// 使用方式：node运行src/utils/ws-server.js 然后启动两个前端服务，控制台查看效果。
const router = useRouter();
let state = reactive({
    text : '',
})

 const changetext = (value)=>{
  state.text = value
}

    //调用websocket对象建立连接：
    //参数：ws/wss(加密)://ip:port （字符串）
    // var websocket = null;
    // if('WebSocket' in window){
    const  websocket = new WebSocket('ws://127.0.0.1:8080');
    // }
    const getStatus = (params) => {
      switch (params) {
        case 0:
          return '链接还没有建立（正在建立链接)'
        case 1:
          return '链接建立成'
        case 2:
          return '链接正在关闭'
        case 3:
          return '链接已经关闭'
        default:
          return;
      }
    }
    websocket.onopen = function () {
      console.log(getStatus(websocket.readyState));
    }
    // 绑定按钮点击事件
    function send() {
      // ws 消息发送
      websocket.send(state.text)
    }

    // 监听服务端消息推送事件
    websocket.onmessage = function (back) {
      console.log( '监听服务端消息推送事件',back.data)
    }

    // 监听连接错误信息
    websocket.onerror = function (e) {
      console.log('Error occured: ' + e);
    };
    // 监听连接关闭
    websocket.onclose = function (evt) {
      console.log("链接关闭");
    };

    // 关闭方式1 不推荐
    // router.afterEach(()=>{
    //   websocket.close()

    // })
    // 方式2
    onUnmounted(()=>{
      websocket.close()
    })

</script>
<style lang="scss" scoped>

</style>
