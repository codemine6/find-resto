import RestaurantSource from '../../data/RestaurantSource'
import ConsumerReviews from './ConsumerReviews'
import UrlParser from '../../routes/UrlParser'

const FormReview = {
    init({ container }) {
        this._container = container
        this.render()
    },

    render() {
        this._container.innerHTML =
            `<form id="form-review">
                <label for="name">Name</label>
                <input id="name" placeholder="Name.."/>
                <label for="message">Message</label>
                <textarea id="review" rows="5" placeholder="Message.."></textarea>
                <button class="send" disabled>Send</button>
            </form>`

        document.querySelector('#name').addEventListener('change', e => {
            if (e.target.value) {
                document.querySelector('.send').removeAttribute('disabled')
            } else {
                document.querySelector('.send').setAttribute('disabled', 'true')
            }
        })

        document.querySelector('.send').addEventListener('click', async e => {
            e.preventDefault()
            const { id } = UrlParser.parseActiveUrlWithoutCombiner()
            const data = {
                id,
                name: document.querySelector('#name').value,
                review: document.querySelector('#review').value
            }
            document.querySelector('#form-review').removeAttribute('class')
            const { customerReviews } = await RestaurantSource.addReview(data)
            ConsumerReviews.init({
                container: document.querySelector('#consumer-reviews'),
                reviews: customerReviews.reverse()
            })
        })
    }
}

export default FormReview
