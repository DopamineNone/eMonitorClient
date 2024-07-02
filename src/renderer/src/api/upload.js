/*
 * 上传API处理函数，包括：
 * 1. 上传请求函数
 */
import { sendRequest } from '../utils/wss.js' // 导入发送请求函数

function uploadRequestHandler(data) {
    const uploadData = {
        type: 'screenshot',
        msg: {
            timestamp: new Date().toISOString(), // 时间戳
            screenshot: data //base64格式的图片数据
        }
    }
    sendRequest(uploadData) // 发送请求
}

export { uploadRequestHandler }
