import path from 'path'
import { Tray, Menu } from 'electron'

// 最小化到托盘
export function createTray(tray, mainWindow, app) {
    tray = new Tray(path.join(__dirname, '../../build/icon.ico')) //先拿图标代替
    const contextMenu = Menu.buildFromTemplate([
        { label: '显示应用', click: () => mainWindow.show() },
        { label: '退出', click: () => app.quit() }
    ])
    tray.setToolTip('eMonitor')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        showWindow()
    })
}

function showWindow(mainWindow) {
    if (mainWindow) {
        mainWindow.show()
    }
}
