import { ipcMain } from 'electron'

export function loadIPCListeners(mainWindow, app) {
    // 监听窗口大小变化
    ipcMain.on('resize', (event, width, height) => {
        mainWindow.setSize(width, height)
        mainWindow.center()
    })

    // 监听窗口最小化
    ipcMain.on('minimize', () => {
        mainWindow.hide()
    })

    // 监听窗口关闭
    ipcMain.on('close', () => {
        mainWindow.destroy()
        app.quit()
    })
}
