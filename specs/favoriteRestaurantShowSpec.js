/* eslint-disable no-undef */
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/favorited-restaurants/FavoriteRestaurantSearchView'
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/favorited-restaurants/FavoriteRestaurantShowPresenter'
import FavoriteRestaurantIdb from '../src/scripts/data/FavoriteRestaurantIdb'

describe('Showing all favorite restaurants', () => {
    let view

    const renderTemplate = () => {
        view = new FavoriteRestaurantSearchView()
        // document.body.innerHTML = view.getFavoriteRestaurantTemplate()
        document.body.innerHTML = view.getTemplate()
    }

    beforeEach(() => {
        renderTemplate()
    })

    describe('When no restaurants have been favorited', () => {
        it('should render the information that no restaurants have been favorited', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
            const presenter = new FavoriteRestaurantShowPresenter({
                view, favoriteRestaurants
            })

            presenter._displayRestaurants(restaurants)
        })

        it('should ask for the favorite restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)

            new FavoriteRestaurantShowPresenter({
                view, favoriteRestaurants
            })

            expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
        })

        it('should show the information that no restaurants have been favorited', (done) => {
            document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
                expect(document.querySelectorAll('.restaurants-not-found').length).toEqual(1)
                done()
            })

            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
            favoriteRestaurants.getAllRestaurants.and.returnValues([])

            new FavoriteRestaurantShowPresenter({
                view, favoriteRestaurants
            })
        })
    })

    describe('When favorite restaurants exist', () => {
        it('should renders the restaurants', () => {
            const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
            const presenter = new FavoriteRestaurantShowPresenter({
                view, favoriteRestaurants
            })

            presenter._displayRestaurants([
                {
                    id: 1,
                    name: 'resto a',
                    city: 'city a',
                    description: 'ahbsjabjsh'
                },
                {
                    id: 2,
                    name: 'resto b',
                    city: 'city b',
                    description: 'sabjsbj'
                }
            ])

            expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
        })
    })

    it('should show the restaurants', (done) => {
        document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
            expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
            done()
        })

        const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
        favoriteRestaurants.getAllRestaurants.and.returnValues([
            {
                id: 1,
                name: 'resto a',
                city: 'city a',
                description: 'ahbsjabjsh'
            },
            {
                id: 2,
                name: 'resto b',
                city: 'city b',
                description: 'sabjsbj'
            }
        ])

        new FavoriteRestaurantShowPresenter({
            view, favoriteRestaurants
        })
    })
})
