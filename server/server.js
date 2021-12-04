// websocket
// 前端：
// 1:login
// 用户输入用户名密码登录/进入聊天室
// input username（6）->localstorage->enter the chatting room

// 2.home
// 列表/消息输入框/ 发送消息

// loclastorage -》 username -》 message =》id ——》》
//  消息时间 -》 后端socket服务
// 后端：
// 接收 -》 消息数据接收-》广播


const Ws = require('ws');
((Ws) => {
  const server = new Ws.Server({
    port: 3000
  })
  const init =()=>{
    bindEvent()
  }
  function bindEvent(){
    server.on('open',handleOpen);
    server.on('close',handleClose);
    server.on('error',handleError);
    server.on('connection',handleConnection);
  }
  function handleOpen(params) {
    console.log('open');
  }
  function handleClose(params) {
    console.log('close3')
    
  }
  function handleError(params) {
    console.log('error')
    
  }
  function handleConnection(params) {
    console.log('connection12')
    Ws.on('message',handleMessage)
  }
  function handleMessage(msg){
    console.log(msg);
  }
  init()
})(Ws)