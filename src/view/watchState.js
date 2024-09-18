import onChange from 'on-change';
import renderInput from './renderInput.js';
import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';
import openModal from './modal.js';

const createWatchState = (state, elements, i18n) => {
  const watchedState = onChange(state, (path) => {
    switch (path) {
      case 'feeds':
        renderFeed(state.feeds, i18n, elements);
        renderPosts(state.posts, state, i18n, elements);
        break;

      case 'posts':
        renderPosts(state.posts, state, i18n, elements);
        break;

      case 'viewedPosts':
        renderPosts(state.posts, state, i18n, elements);
        break;

      case 'selectedPostId': {
        const post = state.posts.find((p) => p.id === state.selectedPostId);
        if (post) {
          openModal(post, i18n);
        }
        break;
      }

      case 'error':
      case 'feedback':
      case 'isSubmitting':
        renderInput(elements, state, i18n);
        break;

      default:
        break;
    }
  });

  return watchedState;
};

export default createWatchState;
