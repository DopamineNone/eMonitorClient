/*
 * 配置API处理函数，包括：
 * 1. 配置响应函数
 */
import { useConfigStore } from '../store/config.js'
function responseConfig(frequency_in_seconds) {
    const configStore = useConfigStore()

    // 使用 configStore 访问和修改 store 中的状态和方法
    console.log(configStore.baseUrl) // 输出 'ws://localhost:8080'
    configStore.setUploadFrequency(frequency_in_seconds * 1000)
}

// 导出响应函数
export { responseConfig }
