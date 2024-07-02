/*
 * 配置API处理函数，包括：
 * 1. 配置响应函数
 */
import { useConfigStore } from '../store/config.js'
function InstructionHandler(frequencyInSeconds) {
    const configStore = useConfigStore()

    // 使用 configStore 访问和修改 store 中的状态和方法
    configStore.uploadFrequency.value = frequencyInSeconds * 1000
}

// 导出响应函数
export { InstructionHandler }
