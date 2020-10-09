import { Search } from '../../../globals/Icons'
import { createRestaurantItemTemplate } from '../../templates/TemplateCreator'

class FavoriteRestaurantSearchView {
    getTemplate() {
        return (
            `<div class="content">
                <div id="search-restaurant">
                    <input id="query" type="text" placeholder="Search..">
                    <button id="submit" aria-label="search">${Search}</button>
                </div>
                <h2></h2>
                <div id="restaurants" class="restaurants"></div>
            </div>`
        )
    }

    runWhenUserIsSearching(callback) {
        document.getElementById('query').addEventListener('change', e => {
            callback(e.target.value)
        })
        document.getElementById('submit').addEventListener('click', () => {
            const query = document.getElementById('query').value
            callback(query)
        })
    }

    showFavoriteRestaurants(restaurants = []) {
        let html
        if (restaurants.length) {
            html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '')
        } else {
            html = this._getEmptyRestaurantTemplate()
        }

        document.getElementById('restaurants').innerHTML = html
        document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'))
    }

    _getEmptyRestaurantTemplate() {
        return '<div class="restaurants-not-found">Restaurants not Found</div>'
    }
}

export default FavoriteRestaurantSearchView
