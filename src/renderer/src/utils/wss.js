/*
 * WebSocket 连接器基础封装
 */

import { WebSocket } from 'ws'
import { useStatusStore } from '../store/status'
import { pinia } from '../store/index'
import { responseHandler } from './daemon'

// 创建新的Websocket
function newWebSocket(serverIp, serverPort) {
    try {
        const wss = new WebSocket(`ws://${serverIp}:${serverPort}`)

        wss.on('open', responseHandler.openHandler)
        wss.on('message', responseHandler.messageHandler)
        wss.on('close', responseHandler.closeHandler)
        wss.on('error', responseHandler.errorHandler)

        return wss
    } catch (error) {
        console.error(error)
    }
    return null
}

export function sendRequest(data) {
    const status = useStatusStore(pinia)
    status.wss?.send(JSON.stringify(data))
}

export function runWebSocket(serverIP = 'localhost', serverPort = 8080) {
    const wss = newWebSocket(serverIP, serverPort)
    if (wss !== null) {
        useStatusStore(pinia).wss = wss
        window.api.alert('连接成功！')
    } else {
        window.api.alert('连接失败！')
    }
}

export function closeWebSocket() {
    const status = useStatusStore(pinia)
    if (status.wss === null) {
        return
    }
    status.wss?.close(1000, 'close by client')
    status.wss = null
}
