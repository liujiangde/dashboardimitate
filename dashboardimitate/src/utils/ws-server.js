var Websocket = require('websocket').server
var http = require('http')

// 创建 HTTP 服务，作为第一次握手链接使用
var httpServer = http.createServer().listen(8080,function(){
  console.log('http://127.0.0.1:8080')
})

// 创建 websocket 服务
var wsServer = new Websocket({
  // 配置依赖的握手 http 服务器
  httpServer:httpServer,

  autoAcceptConnections:false
})

// 保存链接池
var conArr = []

// 监听 ws 请求事件
wsServer.on('request',function(request){
  debugger
  // 获取链接示例
  var connection = request.accept()
  // 保存连接池
  conArr.push(connection)
  // 监听消息事件
  connection.on('message',function(msg){
    console.log(msg)
    // 循环连接池，推送广播消息至客户端
    for(let i = 0;i<conArr.length;i++){
      conArr[i].send(msg.utf8Data)
    }
  })
})
