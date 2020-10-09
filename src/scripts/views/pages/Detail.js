import RestaurantSource from '../../data/RestaurantSource'
import FavoriteRestaurantIdb from '../../data/FavoriteRestaurantIdb'
import UrlParser from '../../routes/UrlParser'
import FavoriteButton from '../components/FavoriteButton'
import RestaurantMenus from '../components/RestaurantMenus'
import ConsumerReviews from '../components/ConsumerReviews'
import SkeletonDetail from '../components/SkeletonDetail'
import { createMainInfoRestaurantTemplate, createMenuTemplate } from '../templates/TemplateCreator'
import Alert from '../components/Alert'

const Detail = {
    async render() {
        document.querySelector('loader').removeAttribute('style')
        return (
            `<div class="main-info"></div>
            <div class="button-container"></div>
            <div class="menu-content"></div>
            <div class="more">
                <div>
                    <p id="description"></p>
                    <div id="restaurant-menus"></div>
                </div>
                <div id="consumer-reviews"></div>
            </div>`
        )
    },

    async afterRender() {
        this.renderSkeleton()
        const { id } = UrlParser.parseActiveUrlWithoutCombiner()
        const { restaurant } = await RestaurantSource.getDetail(id)
        if (restaurant) {
            document.querySelector('.main-info').innerHTML = createMainInfoRestaurantTemplate(restaurant)
            document.querySelector('.menu-content').innerHTML = createMenuTemplate()
            this.renderDescription(restaurant)
            await this.renderButton(restaurant)
            this.renderMenus(restaurant)
            this.renderReviews(restaurant)
            this.changeMenu()
        } else {
            Alert.init({
                message: 'Failed to fetch data'
            })
        }
        document.querySelector('loader').style.display = 'none'
    },

    renderDescription({ description }) {
        document.querySelector('#description').innerHTML = description
    },

    renderButton(restaurant) {
        FavoriteButton.init({
            container: document.querySelector('.button-container'),
            favoriteRestaurants: FavoriteRestaurantIdb,
            restaurant
        })
    },

    renderMenus({ menus }) {
        RestaurantMenus.init({
            container: document.querySelector('#restaurant-menus'),
            favoriteRestaurants: FavoriteRestaurantIdb,
            menus
        })
    },

    renderReviews({ consumerReviews }) {
        ConsumerReviews.init({
            container: document.querySelector('#consumer-reviews'),
            reviews: consumerReviews.reverse()
        })
    },

    renderSkeleton() {
        SkeletonDetail.init({
            container: document.querySelector('.main-info')
        })
    },

    changeMenu() {
        // document.querySelector('#description').style.display = 'none'
        document.querySelector('#restaurant-menus').style.display = 'none'
        document.querySelector('#consumer-reviews').style.display = 'none'

        document.querySelectorAll('.menu-content button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.activate').removeAttribute('class')
                btn.setAttribute('class', 'activate')
                const activate = btn.getAttribute('data-id')

                if (activate === 'description') {
                    document.querySelector('#description').removeAttribute('style')
                    document.querySelector('#restaurant-menus').style.display = 'none'
                    document.querySelector('#consumer-reviews').style.display = 'none'
                } else if (activate === 'menus') {
                    document.querySelector('#description').style.display = 'none'
                    document.querySelector('#restaurant-menus').removeAttribute('style')
                    document.querySelector('#consumer-reviews').style.display = 'none'
                } else {
                    document.querySelector('#description').style.display = 'none'
                    document.querySelector('#restaurant-menus').style.display = 'none'
                    document.querySelector('#consumer-reviews').removeAttribute('style')
                }
            })
        })
    }
}

export default Detail
