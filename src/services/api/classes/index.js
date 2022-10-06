

import { PhoneAPI } from '../index'

class Phone extends PhoneAPI {

    async show() {
        const response = await this.axios.get('/entregas-motoboy')
        return response
    }
}

export const phone = new Phone()