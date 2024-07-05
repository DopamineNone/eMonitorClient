/*
 * 配置API处理函数，包括：
 * 1. 配置响应函数
 */

export function commandHandler(frequencyInSeconds) {
    // 使用 configStore 修改 store 中的状态
    window.setFrequency(frequencyInSeconds * 1000)
}
