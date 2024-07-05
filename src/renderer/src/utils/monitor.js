/*
 * 处理屏幕监控相关函数，包括：
 * 1. 获取屏幕监控视频流函数
 * 2. 截屏处理函数
 */
import JSZip from 'jszip'
import { useStatusStore } from '../store/status'
import { pinia } from '../store/index'
import { uploadRequestHandler } from '../api/upload'

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

    window.stream = stream
}

// 截屏处理函数
export function getScreenShot(videoDOM) {
    console.log('working')
    const canvas = document.createElement('canvas')
    canvas.width = videoDOM.videoWidth
    canvas.height = videoDOM.videoHeight
    const ctx = canvas.getContext('2d')

    // 绘制视频到canvas上
    ctx.drawImage(videoDOM, 0, 0, canvas.width, canvas.height)

    // 将canvas转换为图片,再转换为ZIP文件的base64编码数据，并将结果推入上传任务队列
    canvas.toBlob(
        async (blob) => {
            // const zip = new JSZip()
            const screenshotData = await blob.arrayBuffer()
            let base64Data = ''
            const chuckSize = 1024 * 3
            for (let i = 0; i < screenshotData.byteLength; i += chuckSize) {
                base64Data += btoa(String.fromCharCode.apply(null, new Uint8Array(screenshotData, i, chuckSize)))
            }
            uploadRequestHandler(base64Data)

            // // 获取截图的 base64 编码图像数据,以及时间戳
            // const timestamp = Date.now()
            // const filename = `screenshot_${timestamp}.png`

            // // 将 base64 图像数据添加到 ZIP 文件中，使用时间戳命名文件
            // zip.file(filename, screenshotData)

            // // 生成 ZIP 文件，在进行 base64 编码并上传
            // zip.generateAsync({ type: 'uint8array' })
            //     .then((buffer) => {
            //         const chuckSize = 1024 * 3
            //         let res = ''
            //         for (let i = 0; i < buffer.length; i += chuckSize) {
            //             res += btoa(String.fromCharCode.apply(null, buffer.slice(i, i + chuckSize)))
            //         }
            //         // console.log(res)
            //         uploadRequestHandler(res)
            //     })
            //     .catch((err) => {
            //         console.error(err)
            //     })
        },
        'image/png',
        1
    )
}
