import axios from 'axios';
import domParser from './domParser.js';

const fetchRss = (url, watchedState) => {
  return axios
    .get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(
        url
      )}&disableCache=true`
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response || error.request) {
        watchedState.error = 'errors.netError2';
        throw new Error('Ошибка сервера. Проверьте URL или подключение.');
      } else {
        watchedState.error = 'errors.netError1';
        throw new Error('Ошибка сети. Проверьте ваше интернет-соединение.');
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
        console.error('errors.netError1');
      })
  );

  Promise.all(updatePromises).finally(() => {
    setTimeout(() => checkForUpdates(state, watchedState), 5000);
  });
};

export { fetchRss, checkForUpdates };
