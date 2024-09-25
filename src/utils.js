import _ from 'lodash';
import axios from 'axios';
import domParser from './domParser.js';

export const fetchRss = async (url) => {
  try {
    const response = await axios.get(
      `https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}&disableCache=true`,
      { timeout: 10000 }
    );
    return response.data;
  } catch (error) {
    if (error.response || error.request) {
      throw new Error('errors.networkError');
    }
    throw new Error('errors.serverError');
  }
};

export const checkForUpdates = async (watchedState) => {
  try {
    const updatePromises = watchedState.feeds.map(async (feed) => {
      try {
        const data = await fetchRss(feed.url);
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

        watchedState.posts.unshift(...newPostsWithIds);
      } catch (error) {
        console.error(`errors.rssFetchError ${feed.url}:`, error.message);
      }
    });

    await Promise.all(updatePromises);
  } catch (error) {
    console.error(`errors.generalUpdateError`, error.message);
  } finally {
    setTimeout(() => checkForUpdates(watchedState), 5000);
  }
};
