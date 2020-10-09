import FormReview from './FormReview'
import { Plus } from '../../globals/Icons'

const ConsumerReviews = {
    init({ container, reviews }) {
        this._container = container
        this._reviews = reviews
        this.render()
    },

    render() {
        this._container.innerHTML =
            `<div id="add-review">
                <i>${Plus}</i>
                <button>Add Review</button>
            </div>
            <div id="new-review"></div>
            <div class="review-list">
                ${this._reviews.map(review => (
                    `<div>
                        <span>${review.name[0]?.toUpperCase() ?? 'A'}</span>
                        <p class="name">${review.name !== '' ? review.name : '-'}</p>
                        <p class="review">${review.review !== '' ? review.review : '-'}</p>
                        <p class="date">${review.date}</p>
                    </div>`
                )).join('')}
            </div>`

        FormReview.init({
            container: document.querySelector('#new-review')
        })

        document.querySelector('#add-review').addEventListener('click', () => {
            document.querySelector('#form-review').classList.toggle('show')
        })
    }
}

export default ConsumerReviews
