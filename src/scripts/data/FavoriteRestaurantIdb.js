import { openDB } from 'idb'
import Config from '../globals/Config'

const dbPromise = openDB(Config.DATABASE_NAME, 1, {
    upgrade(database) {
        database.createObjectStore(Config.OBJECT_STORE_NAME, { keyPath: 'id' })
    }
})

const FavoriteRestaurantIdb = {
    async getRestaurant(id) {
        if (!id) return
        return (await dbPromise).get(Config.OBJECT_STORE_NAME, id)
    },
    async getAllRestaurants() {
        return (await dbPromise).getAll(Config.OBJECT_STORE_NAME)
    },
    async putRestaurant(restaurant) {
        if (!restaurant.hasOwnProperty('id')) return
        return (await dbPromise).put(Config.OBJECT_STORE_NAME, restaurant)
    },
    async deleteRestaurant(id) {
        return (await dbPromise).delete(Config.OBJECT_STORE_NAME, id)
    },
    async searchRestaurants(query) {
        return (await this.getAllRestaurants()).filter(restaurant => {
            const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase()
            const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '')

            const loweredCaseQuery = query.toLowerCase()
            const jammedQuery = loweredCaseQuery.replace(/\s/g, '')

            return jammedRestaurantName.indexOf(jammedQuery) !== -1
        })
    }
}

export default FavoriteRestaurantIdb
