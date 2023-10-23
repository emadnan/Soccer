import Axios from './axios';
// import {_retrieveData} from '../asyncStorage/AsyncFuncs';

class WService {
  static post = (type, form) => {
    return new Promise((resolve, reject) => {
      resolve(Axios.post(type, form, {timeout: 20000}));
    });
  };

  static getWithoutHeader = (type) => {
    return new Promise((resolve, reject) => {
      resolve(Axios.get(type, {timeout: 20000}));
    });
  };
}
module.exports = WService;
