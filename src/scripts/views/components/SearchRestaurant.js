import RestaurantSource from '../../data/RestaurantSource'
import { Search } from '../../globals/Icons'
import { createRestaurantItemTemplate } from '../templates/TemplateCreator'

const SearchRestaurant = {
    init({ container }) {
        this._conatiner = container
        this.render()
    },

    render() {
        this._conatiner.innerHTML =
            `<label for="query">Search Restaurant</label>
            <input id="query" placeholder="Search..">
            <button id="submit" aria-label="search">${Search}</button>`

        const getSearch = async () => {
            const container = document.querySelector('#restaurant-list')
            const query = document.querySelector('#query').value.toLowerCase()
            const { restaurants } = await RestaurantSource.getList()
            const result = restaurants.filter(res => res.name.toLowerCase().includes(query))
            container.innerHTML = ''
            result.map(restaurant => {
                container.innerHTML += createRestaurantItemTemplate(restaurant)
            })
        }

        document.querySelector('#query').addEventListener('change', getSearch)
        document.querySelector('#submit').addEventListener('click', getSearch)
    }
}

export default SearchRestaurant
