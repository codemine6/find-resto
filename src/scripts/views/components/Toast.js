const Toast = {
    async init({ message, time }) {
        this._message = message
        setTimeout(() => this.render(), 300)
        setTimeout(() => this.removeToast(), time)
    },

    render() {
        document.querySelector('toast').innerHTML = this._message
    },

    removeToast() {
        document.querySelector('toast').innerHTML = ''
    }
}

export default Toast
