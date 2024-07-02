import { defineStore } from 'pinia'
import { ref } from 'vue'

// 与客户端主机有关的信息仓库
export const useStatusStore = defineStore('status', () => {
    // websocket连接器
    let wss = null

    // 监控视频流对象
    let videoStream = null

    // 登录标志位
    const isLoggedIn = ref(false)

    // 主机MAC地址
    const macAddress = ref('')

    return {
        wss,
        videoStream,
        isLoggedIn,
        macAddress
    }
})
