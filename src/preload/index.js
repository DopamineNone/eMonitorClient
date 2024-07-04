import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcRenderer } from 'electron'
import getmac from 'getmac'

// 向渲染进程暴露的API
const api = {
    // 获取主机MAC地址
    MAC: getmac.default(),
    // 修改主窗口大小
    setWindowSize: (width, height) => {
        // 向主进程发送消息，通知其修改窗口大小
        ipcRenderer.send('resize', width, height + (window.outerHeight - window.innerHeight))
    }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('api', api)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.api = api
}
