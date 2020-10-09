const SkeletonDetail = {
    async init({ container }) {
        this._container = container
        this.render()
    },

    render() {
        this._container.innerHTML =
            `<div class="skeleton-detail">
                <div class="image"></div>
                <div class="category"></div>
                <div class="address"></div>
                <div class="name"></div>
                <div class="text"></div>
                <div class="text"></div>
                <div class="text"></div>
                <div class="text"></div>
                <div class="text"></div>
                <div class="text"></div>
            </div>`
    }
}

export default SkeletonDetail
