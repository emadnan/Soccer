import axios from 'axios';
const baseDomain = 'https://admin.octo-boss.com';

const baseURL = `${baseDomain}/API`;
export default axios.create({
  baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': '',
    'Cache-Control': 'no-cache',
    Authorization: '',
  },
});
