import _ from 'lodash';
import axios from 'axios';
import domParser from './domParser.js';

export const assignIdsToPosts = (data, url) => {
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

export const fetchRss = (url) =>
  axios
    .get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
      {
        timeout: 10000,
      }
    )
    .then((response) => response.data) // Получаем документ
    .catch((error) => {
      if (error.response || error.request) {
        throw new Error('errors.networkError'); // Ошибка сервера, например 404 или 500
      }
      throw new Error('errors.serverError'); // Ошибка запроса
    });

export const checkForUpdates = (watchedState) => {
  const updatePromises = Object.values(watchedState.feeds).map((feed) =>
    fetchRss(feed.url)
      .then((data) => {
        // Проверяем новые посты, которых нет в текущем фиде
        const parsedData = domParser(data.contents);

        const newPosts = parsedData.posts.filter(
          (post) =>
            !feed.posts.some((existingPost) => existingPost.link === post.link)
        );

        const newPostsWithIds = newPosts.map((post) => ({
          ...post,
          id: post.link, // Используем link как ID для новых постов
        }));

        watchedState.feeds[feed.id] = {
          ...feed,
          posts: [...newPostsWithIds, ...feed.posts],
        };
      })
      .catch((error) => {
        console.error(`errors.rssFetchError ${feed.url}:`, error.message);
      })
  );

  Promise.all(updatePromises).finally(() => {
    setTimeout(() => checkForUpdates(watchedState), 5000);
  });
};
