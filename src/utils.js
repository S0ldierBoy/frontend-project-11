import _ from 'lodash';
import axios from 'axios';
import domParser from './domParser.js';

const assignIdsToPosts = (data, url) => {
  // Используем link как id для постов
  const postsWithLinks = data.posts.map((post) => ({
    ...post,
    id: post.link,
  }));

  const feedWithUrl = {
    ...data,
    id: _.uniqueId('feed-'),
    url,
    posts: postsWithLinks,
  };

  return feedWithUrl;
};

const fetchRss = (url) =>
  axios
    .get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
      {
        timeout: 10000,
      },
    )
    .then((response) => response.data) // Получаем документ
    .catch((error) => {
      if (error.response || error.request) {
        throw new Error('errors.netError1'); // Ошибка сервера, например 404 или 500
      }
      throw new Error('errors.netError2'); // Ошибка запроса
    });

const checkForUpdates = (state, watchedState) => {
  const updatePromises = Object.values(state.feeds).map((feed) =>
    fetchRss(feed.url)
      .then((data) => domParser(data.contents))
      .then((parsedData) => {
        // Проверяем новые посты, которых нет в текущем фиде
        const newPosts = parsedData.posts.filter(
          (post) =>
            !feed.posts.some((existingPost) => existingPost.link === post.link));

        if (newPosts.length > 0) {
          // Добавляем новые посты в начало массива
          const updatedFeed = {
            ...feed,
            posts: [...newPosts, ...feed.posts],
          };
          // Обновляем фид в watchedState
          watchedState.feeds[feed.id] = updatedFeed;
        }
      })
      .catch((error) => {
        console.error(
          `Error fetching RSS feed from ${feed.url}:`,
          error.message,
        );
      }));

  Promise.all(updatePromises).finally(() => {
    setTimeout(() => checkForUpdates(state, watchedState), 5000);
  });
};

export { fetchRss, checkForUpdates, assignIdsToPosts };
