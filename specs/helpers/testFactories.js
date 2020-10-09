/* eslint-disable import/prefer-default-export */
import FavoriteRestaurantIdb from '../../src/scripts/data/FavoriteRestaurantIdb'
import FavoriteButton from '../../src/scripts/views/components/FavoriteButton'

export const createFavoriteButton = async (restaurant) => {
    await FavoriteButton.init({
        container: document.querySelector('.button-container'),
        favoriteRestaurants: FavoriteRestaurantIdb,
        restaurant
    })
}
