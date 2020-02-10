import http from '../http'


class AdvertisementService {
    getAdvertisement(){
       return http.get('/advertisements')
    }
}

export default new AdvertisementService();