import Config from '../../globals/Config'

const createRestaurantItemTemplate = (restaurant) => (
    `<div class="restaurant-item">
        <img loading="lazy" width="405" height="270" src="${Config.BASE_IMAGE_URL}small/${restaurant.pictureId}" alt="${restaurant.name && restaurant.name.toLowerCase()}"/>
        <span class="city">${restaurant.city}</span>
        <span class="rating" style="--rate: ${restaurant.rating * 20}%"></span>
        <a class="restaurant-name" href="/#/detail/${restaurant.id}">${restaurant.name || '-'}</a>
        <p>${restaurant.description && restaurant.description.substr(0, 190)}...</p>
    </div>`
)

const createMainInfoRestaurantTemplate = (restaurant) => (
    `<img
        src="${Config.BASE_IMAGE_URL}large/${restaurant.pictureId}"
        srcset="${Config.BASE_IMAGE_URL}small/${restaurant.pictureId} 576w, ${Config.BASE_IMAGE_URL}medium/${restaurant.pictureId} 768w, ${Config.BASE_IMAGE_URL}large/${restaurant.pictureId} 992w"
        sizes="(max-width: 600) 576px, 768px, 992px"
        alt="${restaurant.name.toLowerCase()}"
    />
    <span class="city">${restaurant.city}</span>
    <span class="rating" style="--rate: ${restaurant.rating * 20}%"></span>
    <div class="categories">${restaurant.categories.map(cat => `<span>${cat.name}</span>`).join('')}</div>
    <p class="address">${restaurant.address}</p>
    <h1 class="restaurant-name">${restaurant.name}</h1>`
)

const createMenuTemplate = () => (
    `<button data-id="description" class="activate">Description</button>
    <button data-id="menus">Menus</button>
    <button data-id="review">Reviews</button>`
)

export { createRestaurantItemTemplate, createMainInfoRestaurantTemplate, createMenuTemplate }
