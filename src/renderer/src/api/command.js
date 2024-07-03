/*
 * 配置API处理函数，包括：
 * 1. 配置响应函数
 */
import { useConfigStore } from '../store/config.js'
import { pinia } from '../store/index.js'
function commandHandler(frequencyInSeconds) {
    const configStore = useConfigStore(pinia)

    // 使用 configStore 修改 store 中的状态
    configStore.uploadFrequency = frequencyInSeconds * 1000
}

// 导出响应函数
export { commandHandler }
