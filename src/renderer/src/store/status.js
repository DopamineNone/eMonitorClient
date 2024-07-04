import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 与客户端主机有关的信息仓库
export const useStatusStore = defineStore('status', () => {
    // websocket连接器
    const wss = ref(null)

    // 屏幕视频流
    const stream = ref(null)

    //上传频率
    const uploadFrequency = ref(10000)

    const isConnected = computed(() => {
        return wss.value !== null && wss.value?.readyState === WebSocket.OPEN
    })

    // 登录标志位
    const isLoggedIn = ref(false)

    return {
        wss,
        stream,
        uploadFrequency,
        isConnected,
        isLoggedIn
    }
})
