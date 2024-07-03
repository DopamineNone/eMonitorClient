/*
 * WebSocket 连接器基础封装
 */

import { WebSocket } from 'ws'
import { useStatusStore } from '../store/status'
import { pinia } from '../store'
import { responseHandler } from './daemon'

// 创建新的Websocket
function newWebSocket(serverIp = 'localhost', serverPort = 8080) {
    const wss = new WebSocket(`ws://${serverIp}:${serverPort}`)

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

function runWebSocket(serverIP, serverPort) {
    const wss = newWebSocket(serverIP, serverPort)
    useStatusStore(pinia).wss = wss
}

function closeWebSocket() {
    const status = useStatusStore(pinia)
    status.wss?.close(1000, 'close by client')
    status.wss = null
}

export { runWebSocket, closeWebSocket, sendRequest }
