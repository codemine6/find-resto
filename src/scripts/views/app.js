import DrawerInitiator from '../utils/DrawerInitiator'
import UrlParser from '../routes/UrlParser'
import Routes from '../routes/Routes'

class App {
    constructor({ button, drawer, content }) {
        this._button = button
        this._drawer = drawer
        this._content = content

        this._initialAppShell()
    }

    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content
        })
    }

    async renderPage() {
        const url = UrlParser.parseActiveUrlWithCombiner()
        const page = Routes[url]
        this._content.innerHTML = await page.render()
        await page.afterRender()
    }
}

export default App
