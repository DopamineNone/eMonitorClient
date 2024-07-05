<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount, watchEffect } from 'vue'
import { useStatusStore } from '../store/status'
import { getScreenShot } from '../utils/monitor'
import { closeWebSocket } from '../utils/wss'

const status = useStatusStore()
let timer = null

// 定时截屏器
function runScreenShotTimer(video) {
    clearInterval(timer)
    const Timer = () => {
        return setInterval(() => {
            getScreenShot(video)
        }, status.uploadFrequency)
    }
    timer = Timer()
}

// 停止定时截屏器
function stopScreenShotTimer() {
    clearInterval(timer)
    timer = null
}
// 重新加载窗口大小
onBeforeMount(() => {
    window.api.setWindowSize(1280, 900)
})

// UI元素载入后，加载屏幕显示源，并启动定时截屏器
onMounted(() => {
    const video = document.getElementById('video')
    if (video && status.stream instanceof MediaStream) {
        video.srcObject = window.stream
        video.play()
    }
    runScreenShotTimer(video)
    // 监听频率变化，更新定时截屏器
    watchEffect(() => {
        status.uploadFrequency
        stopScreenShotTimer()
        runScreenShotTimer(video)
    })
})

// 该页面被销毁时，关闭视频播放
onBeforeUnmount(() => {
    const video = document.getElementById('video')
    if (video) {
        video.srcObject = null
    }
    stopScreenShotTimer()
})
</script>

<template>
    <video id="video" autoplay></video>
    <ul class="console">
        <li></li>
    </ul>
    <span class="btn-span">
        <input class="quit" type="submit" name="login" value="断开连接" @click="closeWebSocket" />
    </span>
</template>

<style scoped>
#video {
    width: 100%;
}

.btn-span {
    width: 100%;
    max-width: 250px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 50px auto;
}

.btn-span .quit {
    padding: 1rem 0.75rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: #707070;
    color: #efefef;
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
}

.btn-span .quit:hover {
    background-color: #ff5722;
}
</style>
