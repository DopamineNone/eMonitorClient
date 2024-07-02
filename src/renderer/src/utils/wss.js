/*
 * WebSocket 连接器封装
 */

import { WebSocket } from 'ws'
import { useConfigStore } from '../store/config'
import { useStatusStore } from '../store/status'

// 服务器 url
const BaseUrl = useConfigStore().baseUrl

// 响应处理器
const responseHandler = {
    openHandler: () => {
        console.log('WebSocket 已连接')
    },
    messageHandler: (message) => {
        console.log('WebSocket 收到消息：', message)
    },
    closeHandler: (code, reason) => {
        console.log('WebSocket 已关闭：', code, reason)
    },
    errorHandler: (error) => {
        console.log('WebSocket 发生错误：', error)
    }
}

// 创建新的Websocket
function newWebSocket() {
    const wss = new WebSocket(BaseUrl)

    wss.on('open', responseHandler.openHandler)

    wss.on('message', responseHandler.messageHandler)

    wss.on('close', responseHandler.closeHandler)

    wss.on('error', responseHandler.errorHandler)

    return wss
}

function sendRequest(data) {
    const status = useStatusStore()
    if (status.isLoggedIn) {
        status.wss.send(data)
    }
}

export { newWebSocket, sendRequest }
