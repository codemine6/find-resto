import FavoriteRestaurantIdb from '../../data/FavoriteRestaurantIdb'
import FavoriteRestaurantSearchView from './favorited-restaurants/FavoriteRestaurantSearchView'
import FavoriteRestaurantSearchPresenter from './favorited-restaurants/FavoriteRestaurantSearchPresenter'
import FavoriteRestaurantShowPresenter from './favorited-restaurants/FavoriteRestaurantShowPresenter'

const view = new FavoriteRestaurantSearchView()

const Favorite = {
    async render() {
        return view.getTemplate()
    },

    async afterRender() {
        new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb })
        new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb })
        document.querySelector('loader').style.display = 'none'
    }
}

export default Favorite
