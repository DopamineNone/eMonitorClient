<script setup>
import { desktopCaputure } from 'electron'
desktopCaputure.getSources({ types: ['screen'] })
// import { getScreenStream } from '../utils/monitor'
// const stream = getScreenStream()
// const video = document.getElementById('video')
// video.srcObject = stream
// video.play()
</script>

<template>
    <div class="console">
        <video id="video" autoplay></video>
    </div>
</template>
