/*
 * 处理屏幕监控相关函数，包括：
 * 1. 获取屏幕监控视频流函数
 * 2. 截屏处理函数
 */
import { remote } from 'electron'
const JSZip = require('jszip')

// 获取屏幕监控视频流
export function getScreenStream() {
    const { desktopCapturer } = remote
    const options = { types: ['screen'] }
    const result = {
        status: 'pending',
        data: null,
        err: null
    }

    // 获取视频流子函数
    const getStream = () => {
        desktopCapturer
            .getSources(options)
            .then((sources) => {
                for (const source of sources) {
                    // 找到全屏幕监控的视频流
                    if (source.name === 'Entire screen' || source.name === 'Screen 0') {
                        navigator.mediaDevices
                            .getUserMedia({
                                audio: false,
                                video: {
                                    mandatory: {
                                        chromeMediaSource: 'desktop',
                                        chromeMediaSourceId: source.id
                                    }
                                }
                            })
                            // 获取视频流成功
                            .then((stream) => {
                                result.status = 'success'
                                result.data = stream
                            })
                            // 获取视频流失败
                            .catch((error) => {
                                result.err = error
                                console.log(error)
                            })
                    }
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }
    getStream()

    // 阻塞等待视频流获取成功
    let tryCount = 0
    while (!result.status === 'success' && tryCount < 25) {
        setTimeout(() => {}, 200)
        tryCount += 1
    }
    return result
}

// 截屏处理函数
export function getScreenShot(videoDOM) {
    const canvas = document.createElement('canvas')
    canvas.width = videoDOM.videoWidth
    canvas.height = videoDOM.videoHeight
    const ctx = canvas.getContext('2d')

    // 绘制视频到canvas上
    ctx.drawImage(videoDOM, 0, 0, canvas.width, canvas.height)

    // 将canvas转换为图片(base64)
    return canvas.toDataURL('image/png')
}

//使用了上面的getScreenshot函数
export function shot2zipONbase64(videoDOM) {
    // 创建一个新的 JSZip 实例
    const zip = new JSZip()

    // 获取截图的 base64 编码图像数据,以及时间戳
    let screenshotData = getScreenShot(videoDOM)
    const timestamp = Date.now()
    const filename = `screenshot_${timestamp}.png`

    // 将 base64 图像数据添加到 ZIP 文件中，使用时间戳命名文件
    zip.file(filename, screenshotData.split('base64,')[1], { base64: true })

    // 生成 ZIP 文件
    return zip
        .generateAsync({ type: 'base64' })
        .then(function (base64) {
            return base64
        })
        .catch(function (err) {
            console.error('Error creating ZIP file: ', err)
            return null
        })
}
