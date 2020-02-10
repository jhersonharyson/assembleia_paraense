import http from '../http'


class PushNotificationService {
    register(token){
       return http.post('/register-push-notification', {token})
    }
}

export default new PushNotificationService();