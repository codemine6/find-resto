const Alert = {
    async init({ message }) {
        this._message = message
        this.render()
    },

    render() {
        document.querySelector('alert').innerHTML =
            `<div class="alert">
                <div>
                    <span>Oops!</span>
                    <p>${this._message}</p>
                    <button>OK</button>
                </div>
            </div>`

        document.querySelector('alert button').addEventListener('click', () => {
            document.querySelector('alert').innerHTML = ''
        })
    }
}

export default Alert
