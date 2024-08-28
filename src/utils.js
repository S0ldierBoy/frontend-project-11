import axios from 'axios';
import domParser from './domParser.js';

const fetchRss = (url) => {
  return axios
    .get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response || error.request) {
        // Ошибка сервера, например 404 или 500
        throw {
          code: 'netError2',
          message: 'Ошибка сервера: ' + error.message,
        };
      } else {
        // Ошибка сети
        throw { code: 'netError1', message: 'Ошибка сети: ' + error.message };
      }
    });
};

const checkForUpdates = (state, watchedState) => {
  const updatePromises = state.urls.map((url) =>
    fetchRss(url)
      .then((data) => domParser(data.contents))
      .then((parsedData) => {
        const newPosts = parsedData.posts.filter(
          (post) =>
            !state.posts.some((existingPost) => existingPost.link === post.link)
        );

        if (newPosts.length > 0) {
          watchedState.posts.unshift(...newPosts);
        }
      })
      .catch((error) => {
        console.error(`Error fetching RSS feed from ${url}:`, error.message);
      })
  );

  Promise.all(updatePromises).finally(() => {
    setTimeout(() => checkForUpdates(state, watchedState), 5000);
  });
};

export { fetchRss, checkForUpdates };
