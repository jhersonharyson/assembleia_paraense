import axios from 'axios';

export default axios.create({
  baseURL: 'http://10.0.0.103:3001/api/v1/ws/' ,
  //timeout: 10000
});
