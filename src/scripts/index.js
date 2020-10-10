import 'regenerator-runtime'
import '../styles/main.scss'
import App from './views/app'
import SwRegister from './utils/SwRegister'

const app = new App({
    button: document.querySelector('#hamburgerButton'),
    drawer: document.querySelector('#navigationDrawer'),
    content: document.querySelector('main')
})

window.addEventListener('hashchange', () => {
    app.renderPage()
})

window.addEventListener('load', () => {
    app.renderPage()
    SwRegister()
})
