/*
 * WebSocket 连接器封装
 */

import { WebSocket } from 'ws'
import { useConfigStore } from '../store/config'
import { useStatusStore } from '../store/status'
import { pinia } from '../store'
import { responseHandler } from './daemon'

// 服务器 url
const BaseUrl = useConfigStore(pinia).baseUrl

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
    const status = useStatusStore(pinia)
    status.wss?.send(data)
}

export { newWebSocket, sendRequest }
