import onChange from 'on-change';
import renderInput from './renderInput.js';
import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const createWatchState = (state, elements, i18n) =>
  onChange(state, (path) => {
    switch (path) {
      case 'feeds':
        renderFeed(state.feeds, i18n);
        renderPosts(state.posts, state, i18n);
        break;

      case 'posts':
        renderPosts(state.posts, state, i18n);
        break;

      case 'error':
      case 'feedback':
        renderInput(elements, state, i18n);
        break;

      default:
        break;
    }
  });

export default createWatchState;
