import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
const os = require('os')

// Custom APIs for renderer
const api = {
    getMacAddress: () => {
        const networkInterfaces = os.networkInterfaces()
        // 查找第一个非内部的网络接口的 MAC 地址
        for (let key in networkInterfaces) {
            const iface = networkInterfaces[key]
            for (let i = 0; i < iface.length; i++) {
                const { address, internal } = iface[i]
                if (!internal && address && address !== '127.0.0.1' && address !== '::1') {
                    return iface[i].mac.toUpperCase()
                }
            }
        }
        return null // 如果找不到有效的 MAC 地址，返回 null
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
