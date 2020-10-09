const SkeletonList = {
    async init({ container }) {
        this._container = container
        this.render()
    },

    render() {
        const element =
            `<div class="skeleton-item">
                <div class="image"></div>
                <div class="city"></div>
                <span class="rating"></span>
                <div class="name"></div>
                <div class="text"></div>
                <div class="text"></div>
                <div class="text"></div>
            </div>`

        this._container.innerHTML = element + element + element
    }
}

export default SkeletonList
