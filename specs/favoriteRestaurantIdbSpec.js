/* eslint-disable no-undef */
import { itActAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract'
import FavoriteRestaurantIdb from '../src/scripts/data/FavoriteRestaurantIdb'

describe('Favorite Restaurant Idb Contract Test Implementation', () => {
    afterEach(async () => {
        (await FavoriteRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
            await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id)
        })
    })

    itActAsFavoriteRestaurantModel(FavoriteRestaurantIdb)
})
