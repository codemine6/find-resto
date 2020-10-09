/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/FavoriteRestaurantIdb'
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorited-restaurants/FavoriteRestaurantSearchPresenter'
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorited-restaurants/FavoriteRestaurantSearchView'

describe('Searching restaurants', () => {
    let presenter
    let favoriteRestaurants
    let view

    const searchRestaurants = (query) => {
        const queryElement = document.getElementById('query')
        queryElement.value = query
        queryElement.dispatchEvent(new Event('change'))
    }

    const setRestaurantsSearchContainer = () => {
        view = new FavoriteRestaurantSearchView()
        document.body.innerHTML = view.getTemplate()
    }

    const constructPresenter = () => {
        favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
        presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants, view })
    }

    beforeEach(() => {
        setRestaurantsSearchContainer()
        constructPresenter()
    })

    describe('When query is not empty', () => {
        it('should be able to capture the query typed by the user', () => {
            searchRestaurants('Resto a')
            expect(presenter.latestQuery).toEqual('Resto a')
        })

        it('should ask the model to serach fol favorited restaurant', () => {
            searchRestaurants('Resto a')
            expect(favoriteRestaurants.searchRestaurants).toHaveBeenCalledWith('Resto a')
        })

        it('should show the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: 1 }])
            expect(document.querySelectorAll('.restaurant-item').length).toEqual(1)

            presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }])
            expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
        })

        it('should show the title of the found restaurants', () => {
            presenter._showFoundRestaurants([{ id: '1', name: 'Satu' }])
            expect(document.querySelectorAll('.restaurant-name').item(0).textContent)
            .toEqual('Satu')
        })

        it('should show - for found restaurant without name', () => {
            presenter._showFoundRestaurants([{ id: 1 }])
            expect(document.querySelectorAll('.restaurant-name').item(0).textContent).toEqual('-')
        })

        it('should show - when the restaurant returned does contain a name', (done) => {
                document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                const restaurantNames = document.querySelectorAll('.restaurant-name')
                expect(restaurantNames.item(0).textContent).toEqual('-')
                done()
            })

            favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([{ id: 444 }])
            searchRestaurants('resto a')
        })
    })

    describe('When query is empty', () => {
        it('should capture the query as empty', () => {
            searchRestaurants(' ')
            expect(presenter.latestQuery.length).toEqual(0)
            searchRestaurants('   ')
            expect(presenter.latestQuery.length).toEqual(0)
            searchRestaurants('\t')
            expect(presenter.latestQuery.length).toEqual(0)
        })

        it('should show all favorite restaurants', () => {
            searchRestaurants(' ')
            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled()
        })
    })

    describe('When no favorite restaurants could be found', () => {
        it('should show the empty message', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurants-not-found').length).toEqual(1)
                done()
            })

            favoriteRestaurants.searchRestaurants.withArgs('resto a').and.returnValues([])
            searchRestaurants('resto a')
        })
    })
})
