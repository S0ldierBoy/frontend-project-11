import onChange from 'on-change';
import renderInput from './renderInput.js';
import feedView from './index.js';

const createWatchState = (state, elements, i18nextInstance) =>
  onChange(state, (path) => {
    renderInput(elements, state, i18nextInstance);

    if (
      path === 'feeds' ||
      path.startsWith('feeds.') ||
      path === 'posts' ||
      path.startsWith('posts.') ||
      path === 'viewedPosts' ||
      path.startsWith('viewedPosts.')
    ) {
      feedView(state, i18nextInstance);
    }
  });

export default createWatchState;
