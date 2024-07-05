d
import { useStatusStore } from '../store/status'
import { pinia } from '../store/index'

export const logout = () => {
    setTimeout(() => {
        useStatusStore(pinia).isLoggedIn = true
    }, 1000)
}
