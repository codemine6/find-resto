/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/FavoriteRestaurantIdb'
import * as TestFactories from './helpers/testFactories'

describe('Favoriting A Restaurant', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div class="button-container"></div>'
    })

    it('should show the favorite button when the restaurant has not been favorited before', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        expect(document.querySelector('[aria-label="add to favorite"]')).toBeTruthy()
    })

    it('should not show the favorite button when the restaurant has not been favorited before', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        expect(document.querySelector('[aria-label="delete from favorite"]')).toBeFalsy()
    })

    it('should to be abble to favorite the restaurant', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        document.querySelector('#favorite-button').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getRestaurant('36fa3p5gw45kfhujxow')).toEqual({ id: '36fa3p5gw45kfhujxow' })
        FavoriteRestaurantIdb.deleteRestaurant('36fa3p5gw45kfhujxow')
    })

    it('should not add a restaurant again when its already favorited', async () => {
        await TestFactories.createFavoriteButton({ id: '36fa3p5gw45kfhujxow' })
        await FavoriteRestaurantIdb.putRestaurant({ id: '36fa3p5gw45kfhujxow' })
        document.querySelector('#favorite-button').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([{ id: '36fa3p5gw45kfhujxow' }])
        FavoriteRestaurantIdb.deleteRestaurant('36fa3p5gw45kfhujxow')
    })

    it('should not add a restaurant when it has no id', async () => {
        await TestFactories.createFavoriteButton({})
        document.querySelector('#favorite-button').dispatchEvent(new Event('click'))
        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([])
    })
})
