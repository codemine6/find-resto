import { Star, StarFill } from '../../globals/Icons'
import Toast from './Toast'

const FavoriteButton = {
    async init({ container, favoriteRestaurants, restaurant }) {
        this._container = container
        this._restaurant = restaurant
        this._favoriteRestaurants = favoriteRestaurants
        await this.render()
    },

    async render() {
        if (await this._favoriteRestaurants.getRestaurant(this._restaurant.id)) {
            this._renderFavorited()
        } else {
            this._renderUnfavorited()
        }
    },

    _renderUnfavorited() {
        this._container.innerHTML =
            `<button id="favorite-button" aria-label="add to favorite">
                <i>${Star}</i>
            </button>`

        document.querySelector('#favorite-button').addEventListener('click', async () => {
            await this._favoriteRestaurants.putRestaurant(this._restaurant)
            this.render()
            Toast.init({
                message: 'Successfully added to favorites',
                time: 3000
            })
        })
    },

    _renderFavorited() {
        this._container.innerHTML =
            `<button id="favorite-button" aria-label="delete from favorite">
                <i>${StarFill}</i>
            </button>`

        document.querySelector('#favorite-button').addEventListener('click', async () => {
            await this._favoriteRestaurants.deleteRestaurant(this._restaurant.id)
            this.render()
            Toast.init({
                message: 'Successfully removed from favorites',
                time: 3000
            })
        })
    }
}

export default FavoriteButton
