import axios from 'axios';

const fetchRss = (url) => {
  return axios
    .get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        throw new Error('errors.netError1'); // Ошибка сервера, например 404 или 500
      } else if (error.request) {
        throw new Error('errors.netError1'); // Проблемы с сетью
      } else {
        throw new Error('errors.netError1'); // Ошибка запроса
      }
    });
};

export default fetchRss;
