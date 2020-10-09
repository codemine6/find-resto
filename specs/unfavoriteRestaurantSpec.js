/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/FavoriteRestaurantIdb'
import * as TestFactories from './helpers/testFactories'

describe('Unfavoriting A Restaurant', () => {
    beforeEach(async () => {
        document.body.innerHTML = '<div class="button-container"></div>'
        await FavoriteRestaurantIdb.putRestaurant({ id: '36fa3p5gw45kfhujxow' })
    })

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant('36fa3p5gw45kfhujxow')
    })

    it('should display unfavorited widget when the restaurant has been liked', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        expect(document.querySelector('[aria-label="delete from favorite"]')).toBeTruthy()
    })

    it('should not display favorited widget when the restaurant has been favorited', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        expect(document.querySelector('[aria-label="add to favorite"]')).toBeFalsy()
    })

    it('should be able to delete favorited restaurant from the list', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        document.querySelector('[aria-label="delete from favorite"]').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
    })

    it('should not throw error if the unfavorited restaurant is not in the list', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        await FavoriteRestaurantIdb.deleteRestaurant('36fa3p5gw45kfhujxow')
        document.querySelector('[aria-label="delete from favorite"]').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
    })
})
