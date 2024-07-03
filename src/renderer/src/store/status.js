import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 与客户端主机有关的信息仓库
export const useStatusStore = defineStore('status', () => {
    // websocket连接器
    let wss = null

    const isConnected = computed(() => {
        return wss !== null && wss?.readyState === WebSocket.OPEN
    })

    // 监控视频流对象
    let videoStream = null

    // 登录标志位
    const isLoggedIn = ref(false)

    return {
        wss,
        isConnected,
        videoStream,
        isLoggedIn
    }
})
