import RestaurantSource from '../../data/RestaurantSource'
import SearchRestaurant from '../components/SearchRestaurant'
import { createRestaurantItemTemplate } from '../templates/TemplateCreator'
import SkeletonList from '../components/SkeletonList'
import Alert from '../components/Alert'

const Home = {
    async render() {
        return (
            `<div id="banner">
                <img
                    src="images/hero-large.jpg"
                    srcset="images/hero-small.jpg 480w, images/hero-large.jpg 800w"
                    sizes="(max-width: 600px) 480px, 800px"
                    alt="hero"
                />
                <p>Find your favorite restaurant</p>
            </div>
            <div id="search-restaurant"></div>
            <div id="restaurants"></div>`
        )
    },

    async afterRender() {
        this.renderSkeleton()
        const { restaurants } = await RestaurantSource.getList()
        this.renderSearch()

        if (restaurants) {
            const container = document.querySelector('#restaurants')
            container.innerHTML = ''
            restaurants.map(restaurant => {
                container.innerHTML += createRestaurantItemTemplate(restaurant)
            })
        } else {
            Alert.init({
                message: 'Failed to fetch data'
            })
        }
        document.querySelector('loader').style.display = 'none'
    },

    renderSearch() {
        SearchRestaurant.init({
            container: document.querySelector('#search-restaurant')
        })
    },

    renderSkeleton() {
        SkeletonList.init({
            container: document.querySelector('#restaurants')
        })
    }
}

export default Home
