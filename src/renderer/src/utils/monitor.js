/*
 * 处理屏幕监控相关函数，包括：
 * 1. 获取屏幕监控视频流函数
 * 2. 截屏处理函数
 */
import JSZip from 'jszip'
import { useStatusStore } from '../store/status'
import { pinia } from '../store/index'
import { watchEffect } from 'vue'
import { uploadRequestHandler } from '../api/upload'

let timer = null

// 获取屏幕监控视频流函数
export async function getScreenStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: 'screen:0:0',
                width: 1280,
                height: 720
            }
        }
    })

    useStatusStore(pinia).stream = stream
}

// 定时截屏器
export function runScreenShotTimer(video) {
    const frequency = useStatusStore(pinia).uploadFrequency
    const Timer = () => {
        return setInterval(getScreenShot(video), frequency)
    }
    timer = Timer()
    watchEffect(() => {
        frequency
        clearInterval(timer)
        timer = Timer()
    })
}

export function stopScreenShotTimer() {
    clearInterval(timer)
}

// 截屏处理函数
function getScreenShot(videoDOM) {
    const canvas = document.createElement('canvas')
    canvas.width = 1280
    canvas.height = 720
    const ctx = canvas.getContext('2d')

    // 绘制视频到canvas上
    ctx.drawImage(videoDOM, 0, 0, canvas.width, canvas.height)

    // 将canvas转换为图片,再转换为ZIP文件的base64编码数据，并将结果推入上传任务队列
    canvas.toBlob(
        async (blob) => {
            const zip = new JSZip()
            const screenshotData = await blob.arrayBuffer()

            // 获取截图的 base64 编码图像数据,以及时间戳
            const timestamp = Date.now()
            const filename = `screenshot_${timestamp}.png`

            // 将 base64 图像数据添加到 ZIP 文件中，使用时间戳命名文件
            zip.file(filename, screenshotData)

            // 生成 ZIP 文件，在进行 base64 编码并上传
            zip.generateAsync({ type: 'uint8array' })
                .then((buffer) => {
                    const screenshot = btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
                    uploadRequestHandler(screenshot)
                })
                .catch((err) => {
                    console.error(err)
                })
        },
        'image/png',
        1
    )
}
