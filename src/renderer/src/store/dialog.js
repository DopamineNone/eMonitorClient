import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
    // 弹窗显示状态
    const dialogVisible = ref(false)

    // 弹窗标题
    const dialogTitle = ref('')

    // 弹窗消息
    const dialogMessage = ref('')

    // 弹窗按钮控件
    const dialogButtons = ref([])

    return {
        dialogVisible,
        dialogTitle,
        dialogMessage,
        dialogButtons
    }
})
