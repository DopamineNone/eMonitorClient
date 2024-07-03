/*
 * 处理屏幕监控相关函数，包括：
 * 1. 获取屏幕监控视频流函数
 * 2. 截屏处理函数
 */
import { remote } from 'electron'

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
        syncSleep(200)
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

// 用于阻塞线程的函数
function syncSleep(ms) {
    const start = Date.now()
    while (Date.now() - start < ms) {
        continue
    }
}
