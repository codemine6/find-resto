const RestaurantMenus = {
    init({ container, menus }) {
        this._container = container
        this._menus = menus
        this.render()
    },

    render() {
        this._container.innerHTML =
            `<div>
                <p>Foods</p>
                ${this._menus.foods.map(food => (
                    `<li>${food.name}</li>`
                )).join('')}
            </div>
            <div>
                <p>Drinks</p>
                ${this._menus.drinks.map(drink => (
                    `<li>${drink.name}</li>`
                )).join('')}
            </div>`
    }
}

export default RestaurantMenus
