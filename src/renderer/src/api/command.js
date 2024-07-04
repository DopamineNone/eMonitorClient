/*
 * 配置API处理函数，包括：
 * 1. 配置响应函数
 */
import { useStatusStore } from '../store/config.js'
import { pinia } from '../store/index.js'

export function commandHandler(frequencyInSeconds) {
    const status = useStatusStore(pinia)

    // 使用 configStore 修改 store 中的状态
    status.uploadFrequency = frequencyInSeconds * 1000
}
