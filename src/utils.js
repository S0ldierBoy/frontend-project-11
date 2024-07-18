import axios from 'axios';

const fetchRss = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при запросе:', error);
        reject(error);
      });
  });
};

export default fetchRss;
