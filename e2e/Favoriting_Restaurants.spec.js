/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert')

Feature('Favoriting Restaurants')

Before((I) => {
    I.amOnPage('/#/favorite')
})

Scenario('showing empty favorited restaurants', (I) => {
    I.seeElement('#query')
    I.see('Restaurants not Found', '.restaurants-not-found')
})

Scenario('favoriting one restaurant', async (I) => {
    I.see('Restaurants not Found', '.restaurants-not-found')

    I.amOnPage('/')
    I.seeElement('.restaurant-name')

    const firstRestaurant = locate('.restaurant-name').first()
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant)
    I.click(firstRestaurant)

    I.seeElement('#favorite-button')
    I.click('#favorite-button')

    I.amOnPage('/#/favorite')
    I.seeElement('.restaurant-item')

    const favoritedRestaurantName = await I.grabTextFrom('.restaurant-name')
    assert.strictEqual(firstRestaurantName, favoritedRestaurantName)
})

Scenario('searching restaurants', async (I) => {
    I.see('Restaurants not Found', '.restaurants-not-found')

    I.amOnPage('/')
    I.seeElement('.restaurant-name')

    const titles = [];
    for (let i = 1; i <= 3; i++) {
        I.click(locate('.restaurant-name').at(i))
        I.seeElement('#favorite-button')
        I.click('#favorite-button')
        titles.push(await I.grabTextFrom('.restaurant-name'))
        I.amOnPage('/')
    }

    I.amOnPage('/#/favorite')
    I.seeElement('#query')

    const searchQuery = titles[1].substring(1, 3)
    const matchingRestaurants = titles.filter(title => title.indexOf(searchQuery) !== -1)

    I.fillField('#query', searchQuery)
    I.pressKey('Enter')

    const visibleFavoriteRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item')
    assert.strictEqual(matchingRestaurants.length, visibleFavoriteRestaurants)

    matchingRestaurants.forEach(async (title, index) => {
        const visibleTitle = await I.grabTextFrom(locate('.restaurant-name').at(index + 1))
        assert.strictEqual(title, visibleTitle)
    })
})
