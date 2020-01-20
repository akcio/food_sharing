class FoodSharingAPI {
    constructor() {
        this.apiURL = 'https://ileaban.space/api/v1/';
    }

    async shareItem(vk_id, in_caption, in_description, latitude, longitude, in_price, imageURL, in_expire) {
        return fetch(this.apiURL + 'share/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: vk_id,
                caption: in_caption,
                description: in_description,
                image_url: imageURL,
                lat: latitude,
                lon: longitude,
                price: in_price,
                expiration: in_expire
            })
        })
        .then(function (response) {
            return response.json();
        })
    }

    async getNearby(latitude, longitude) {
        return fetch(this.apiURL + 'nearby/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lat: latitude,
                lon: longitude,
            })
        })
        .then(function (response) {
            return response.json()
        })
    }

    async deleteMyItem(item_id, user_id) {
        return fetch(this.apiURL + 'delete/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                share_id: item_id,
                vk_id: user_id,
            })
        })
        .then(function (response) {
            return response.json()
        })
    }

    async getItemsByUserId(user_id) {
        return fetch(this.apiURL + 'by_user/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: user_id
            })
        })
        .then(function (response) {
            return response.json()
        })
    }
}

export default new FoodSharingAPI();