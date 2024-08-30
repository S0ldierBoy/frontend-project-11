import axios from 'axios';
import domParser from './domParser.js';
import _ from 'lodash';

const assignIdsToPosts = (data, url) => {
  // Используем link как id для постов
  const postsWithLinks = data.posts.map((post) => ({
    ...post,
    id: post.link,
  }));

  const feedWithUrl = {
    ...data,
    id: _.uniqueId('feed-'),
    url: url,
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
      }
    )
    .then((response) => response.data) // Получаем документ
    .catch((error) => {
      if (error.response || error.request) {
        throw new Error('errors.netError1'); // Ошибка сервера, например 404 или 500
      } else {
        throw new Error('errors.netError2'); // Ошибка запроса
      }
    });

const checkForUpdates = (state, watchedState) => {
  const updatePromises = Object.values(state.feeds).map((feed) =>
    fetchRss(feed.url)
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
        console.error(
          `Error fetching RSS feed from ${feed.url}:`,
          error.message
        );
      })
  );

  Promise.all(updatePromises).finally(() => {
    setTimeout(() => checkForUpdates(state, watchedState), 5000);
  });
};

export { fetchRss, checkForUpdates, assignIdsToPosts };

const data1 = {
  title: 'Lorem ipsum feed for an interval of 1 minutes with 10 item(s)',
  description: 'This is a constantly updating lorem ipsum feed',
  posts: [
    {
      title: 'Lorem ipsum 2024-08-30T17:16:00Z',
      link: 'http://example.com/test/1725038160',
      description: 'Aute do voluptate elit exercitation occaecat elit et.',
    },
  ],
};
