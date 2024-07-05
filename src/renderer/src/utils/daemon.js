/*
 * websocket 守护器
 * 处理websocket连接相关事件
 * 并影响UI显示状态（已登录/未登录）
 */
import { registerResponseHandler } from '../api/register'
import { loginResponseHandler } from '../api/login'
import { commandHandler } from '../api/command'
import { useStatusStore } from '../store/status'
import { pinia } from '../store/index'

// 响应处理器
export const responseHandler = {
    // 连接建立处理器
    openHandler: () => {
        console.log('WebSocket 已连接')
    },
    // 接收到消息处理器
    messageHandler: (message) => {
        console.log('WebSocket 收到消息：', message)
        const result = JSON.parse(message)
        switch (result.type) {
            case 'register':
                registerResponseHandler(result.msg.status)
                break
            case 'login':
                loginResponseHandler(result.msg.status)
                break
            case 'command':
                commandHandler(result.msg.frequecy)
                break
            default:
                console.log('未知消息类型')
        }
    },
    // socket 关闭处理器
    closeHandler: (code, reason) => {
        console.log('WebSocket 已关闭：', code, reason)
        window.api.alert('WebSocket 已关闭，请检查网络连接')
        const statusStore = useStatusStore(pinia)
        statusStore.isLoggedIn = false
    },
    // 错wang
    errorHandler: (error) => {
        console.log('WebSocket 发生错误：', error)
        window.api.alert('WebSocket 发生错误，请检查网络连接')
        const statusStore = useStatusStore(pinia)
        statusStore.isLoggedIn = false
    }
}
