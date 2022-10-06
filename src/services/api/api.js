// import axios from "axios";



// export class PhoneAPI {
//     constructor() {
//         this.baseUrl = 'http://localhost:5000/'
//         this.axios = axios.create({ baseUrl: this.baseUrl })
//     }

//     async schedule() {
//         const response = await this.axios.get('/entregas-motoboy')

//         return response
//     }

// }


// export default new PhoneAPI()


import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001'
  // baseURL: 'https://track-values-api.herokuapp.com/api'

})
