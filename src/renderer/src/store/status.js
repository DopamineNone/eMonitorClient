import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

// 与客户端主机有关的信息仓库
export const useStatusStore = defineStore('status', () => {
    const wss = ref(null)

    // 屏幕视频流
    const stream = ref(null)

    //上传频率
    const uploadFrequency = ref(10000)

    const isConnected = ref(false)

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
