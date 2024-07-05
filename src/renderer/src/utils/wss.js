/*
 * WebSocket 连接器基础封装
 */
import { responseHandler } from './daemon'

// 创建新的Websocket
function newWebSocket(serverIp, serverPort) {
    try {
        const wss = new WebSocket(`ws://${serverIp}:${serverPort}`)

        wss.onopen = responseHandler.openHandler
        wss.onmessage = responseHandler.messageHandler
        wss.onclose = responseHandler.closeHandler
        wss.onerror = responseHandler.errorHandler

        return wss
    } catch (error) {
        console.error(error)
    }
    return null
}

export function sendRequest(data) {
    window.wss?.send(JSON.stringify(data))
}

export function runWebSocket(serverIP = '127.0.0.1', serverPort = 8080) {
    const wss = newWebSocket(serverIP, serverPort)
    if (wss !== null) {
        window.wss = wss
        window.setWss(wss)
        window.setConnectStatus(true)
        window.api.alert('连接成功！')
    } else {
        window.api.alert('连接失败！')
    }
}

export function closeWebSocket() {
    if (window.wss === null) {
        return
    }
    window.wss.close(1000, 'close by client')
    window.wss = null
    window.setWss(null)
}
