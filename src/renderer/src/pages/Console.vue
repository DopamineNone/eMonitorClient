<script setup>
import { onMounted, onBeforeMount, onBeforeUnmount, watchEffect } from 'vue'
import { useStatusStore } from '../store/status'
import { runScreenShotTimer, stopScreenShotTimer } from '../utils/monitor'
const status = useStatusStore()

// 重新加载窗口大小
onBeforeMount(() => {
    window.api.setWindowSize(1280, 900)
})

// UI元素载入后，加载屏幕显示源
onMounted(() => {
    const video = document.getElementById('video')
    if (video && status.stream instanceof MediaStream) {
        console.log('Cosole', video)
        video.srcObject = status.stream
        video.play()
    }
    runScreenShotTimer()

    watchEffect()
})

// 该页面被销毁时，关闭视频播放
onBeforeUnmount(() => {
    const video = document.getElementById('video')
    if (video) {
        video.srcObject = null
    }
    stopScreenShotTimer()
    status.uploadQueue = []
})
</script>

<template>
    <video id="video" autoplay></video>
    <ul class="console">
        <li></li>
    </ul>
    <span class="btn-span">
        <input class="quit" type="submit" name="login" value="断开连接" @click="disconnect" />
    </span>
</template>

<style scoped>
#video {
    width: 100%;
}

.btn-span {
    width: 100%;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
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
