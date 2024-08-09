import axios from 'axios';

const fetchRss = (url) => {
  return axios
    .get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response || error.request) {
        throw new Error('errors.netError2'); // Ошибка сервера, например 404 или 500
      } else {
        throw new Error('errors.netError1'); // Ошибка запроса
      }
    });
};

export default fetchRss;

// import axios from 'axios';

// const fetchRss = (url) => {
//   const allOriginsUrl = `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`;

//   return axios
//     .get(allOriginsUrl, {
//       headers: {
//         'Cache-Control': 'no-cache',
//         Pragma: 'no-cache',
//       },
//     })
//     .then((response) => response.data)
//     .catch((error) => {
//       if (error.response || error.request) {
//         throw new Error('errors.netError2'); // Ошибка сервера, например 404 или 500
//       } else {
//         throw new Error('errors.netError1'); // Ошибка запроса
//       }
//     });
// };

// export default fetchRss;
