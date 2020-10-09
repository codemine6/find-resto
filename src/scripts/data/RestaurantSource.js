import Config from '../globals/Config'

const RestaurantSource = {
    async getList() {
        try {
            const res = await fetch(`${Config.BASE_URL}/list`)
            if (res.ok) {
                return res.json()
            }
        } catch {
            return { message: 'Failed to get data' }
        }
    },

    async getDetail(id) {
        try {
            const res = await fetch(`${Config.BASE_URL}/detail/${id}`)
            if (res.ok) {
                return res.json()
            }
            throw new Error()
        } catch {
            return { message: 'Failed to get data' }
        }
    },

    async addReview(data) {
        try {
            const res = await fetch(`${Config.BASE_URL}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Auth-Token': '12345'
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                return res.json()
            }
        } catch {
            return { message: 'Failed to add review' }
        }
    }
}

export default RestaurantSource
