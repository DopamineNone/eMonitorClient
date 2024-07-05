<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login', 'register', 'connect', 'disconnect'])
const props = defineProps({
    isConnected: {
        type: Boolean,
        default: false
    }
})

const ip = ref('')
const port = ref('')
const username = ref('')
const password = ref('')

function login() {
    emit('login', username.value, password.value)
}

function register() {
    emit('register', username.value, password.value)
}

function connect() {
    emit('connect', ip.value, port.value)
}

function disconnect() {
    emit('disconnect')
}
</script>

<template>
    <form v-if="!isConnected" id="service-form" class="form">
        <span class="input-span">
            <label for="ip" class="label">服务端IP</label>
            <input id="ip" v-model="ip" type="ip" name="ip"
        /></span>
        <span class="input-span">
            <label for="port" class="label">服务端端口</label>
            <input id="port" v-model="port" type="port" name="port"
        /></span>
        <span class="btn-span">
            <input class="submit" type="submit" name="connect" value="连接" @click="connect" />
        </span>
    </form>
    <form v-else id="auth-form" class="form">
        <span class="input-span">
            <label for="username" class="label">用户名</label>
            <input id="username" v-model="username" type="username" name="username"
        /></span>
        <span class="input-span">
            <label for="password" class="label">密码</label>
            <input id="password" v-model="password" type="password" name="password"
        /></span>
        <span class="btn-span">
            <input class="submit" type="submit" name="login" value="登录" @click="login" />
            <input class="submit" type="submit" name="register" value="注册" @click="register" />
        </span>
        <span class="btn-span">
            <input class="quit" type="submit" name="disconnect" value="断开连接" @click="disconnect" />
        </span>
    </form>
</template>

<style scoped>
.form {
    --bg-light: #efefef;
    --bg-dark: #707070;
    --clr: #58bc82;
    --clr-warn: #ff5722;
    --clr-alpha: #9c9c9c60;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
}

.form .input-span {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form input[type='ip'],
.form input[type='port'],
.form input[type='username'],
.form input[type='password'] {
    border-radius: 0.5rem;
    padding: 1rem 0.75rem;
    width: 100%;
    height: 40px;
    border: none;
    display: flex;
    align-items: center;
    background-color: var(--clr-alpha);
    outline: 2px solid var(--bg-dark);
    color: var(--bg-light);
}

.form input[type='ip']:focus,
.form input[type='port']:focus,
.form input[type='username']:focus,
.form input[type='password']:focus {
    outline: 2px solid var(--clr);
}

.label {
    align-self: flex-start;
    color: var(--clr);
    font-weight: 600;
}

.btn-span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;
}

.btn-span .submit,
.btn-span .quit {
    padding: 1rem 0.75rem;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 3rem;
    background-color: var(--bg-dark);
    color: var(--bg-light);
    border: none;
    cursor: pointer;
    transition: all 300ms;
    font-weight: 600;
    font-size: 0.9rem;
}

.btn-span .submit:hover {
    background-color: var(--clr);
    color: var(--bg-dark);
}

.btn-span .quit:hover {
    background-color: var(--clr-warn);
}

.span {
    text-decoration: none;
    color: var(--bg-dark);
}

.span a {
    color: var(--clr);
}
</style>
