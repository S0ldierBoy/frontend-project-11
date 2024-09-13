import _ from 'lodash';
import axios from 'axios';
import domParser from './domParser.js';

export const fetchRss = (url) =>
  axios
    .get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
      {
        timeout: 10000,
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      if (error.response || error.request) {
        throw new Error('errors.networkError');
      }
      throw new Error('errors.serverError');
    });

export const checkForUpdates = (watchedState) => {
  const updatePromises = watchedState.feeds.map((feed) =>
    fetchRss(feed.url)
      .then((data) => {
        const parsedData = domParser(data.contents);

        const newPosts = parsedData.posts.filter(
          (post) =>
            !watchedState.posts.some(
              (existingPost) => existingPost.link === post.link
            )
        );

        const newPostsWithIds = newPosts.map((post) => ({
          ...post,
          id: _.uniqueId('post-'),
          feedId: feed.id,
        }));

        watchedState.posts = [...newPostsWithIds, ...watchedState.posts];
      })
      .catch((error) => {
        console.error(`errors.rssFetchError ${feed.url}:`, error.message);
      })
  );

  Promise.all(updatePromises).finally(() => {
    setTimeout(() => checkForUpdates(watchedState), 5000);
  });
};
