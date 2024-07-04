<script setup>
import { useStatusStore } from '../store/status'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    buttons: {
        type: Array,
        required: false,
        default(names) {
            return [
                {
                    name: '确认',
                    callback: () => {
                        useStatusStore().dialogVisible = false
                    }
                }
            ]
        }
    }
})
</script>

<template>
    <div class="overlay">
        <div class="dialog">
            <p class="title">{{ title }}</p>
            <p class="message">{{ message }}</p>
            <div v-for="(item, index) in buttons" :key="index" class="dialog-buttons">
                <button @click="item.callback">{{ item.name }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}

.title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
}

.dialog {
    position: fixed;
    top: 1rem;
    left: 50%;
    width: 90%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
    padding: 10px 20px;
    transform: translateX(-50%);
    background-color: #202127;
    backdrop-filter: blur(24px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dialog-buttons {
    position: relative;
    bottom: 0;
    width: 50%;
    left: 50%;
    gap: 0.5rem;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.dialog-buttons button {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    background-color: #424242;
    color: #fff;
    cursor: pointer;
    outline: none;
}

.dialog-buttons button:hover {
    background-color: #58bc82;
}
</style>
