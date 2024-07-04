import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
// import { createWindow } from './init'
// import { createTray } from './tray'
import { Tray, Menu } from 'electron'

const path = require('path')

let tray = null
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 640,
        height: 735,
        show: false,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            sandbox: false
        }
    })

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    // 隐藏窗口设置
    mainWindow.on('minimize', (event) => {
        event.preventDefault() // 阻止默认的最小化行为
        mainWindow.hide() // 隐藏窗口
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
}

function createTray() {
    tray = new Tray(path.join(__dirname, '../../build/icon.ico')) //先拿图标代替
    const contextMenu = Menu.buildFromTemplate([
        { label: '显示应用', click: () => mainWindow.show() },
        { label: '退出', click: () => app.quit() }
    ])
    tray.setToolTip('eMonitor')
    tray.setContextMenu(contextMenu)

    tray.on('click', () => {
        mainWindow.show()
    })
}

// 禁止应用多开
const getLock = app.requestSingleInstanceLock()

if (!getLock) {
    app.quit()
} else {
    app.on('second-instance', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    // IPC test
    ipcMain.on('ping', () => console.log('pong'))

    createWindow()
    createTray()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
