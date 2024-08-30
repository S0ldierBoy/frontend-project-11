import axios from 'axios';
import domParser from './domParser.js';

const assignIdsToPosts = (data, url) => {
  const feedWithUrl = data.feed.map((feed) => ({ ...feed, url: url }));
  const postsWithIds = data.posts.map((post) => ({
    ...post,
    id: `post-${post.link}`,
  }));

  return { feed: feedWithUrl, posts: postsWithIds };
};

const fetchRss = (url) =>
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
        throw new Error('errors.netError1');
      } else {
        throw new Error('errors.netError2');
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
