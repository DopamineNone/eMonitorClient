import { ipcMain, dialog } from 'electron'

export function loadIPCListeners(mainWindow, app) {
    // 监听窗口大小变化
    ipcMain.on('resize', (event, width, height) => {
        mainWindow.setSize(width, height)
        mainWindow.center()
    })

    ipcMain.on('alert', (event, message) => {
        const options = {
            type: 'warning',
            buttons: ['确认'],
            defaultId: 0,
            cancelId: 0,
            detail: message,
            message: ''
        }
        dialog.showMessageBoxSync(null, options)
    })
}
