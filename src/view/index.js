import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state, i18nextInstance) => {
  const { feeds, posts } = state;

  if (feeds.length > 0) {
    renderFeed(feeds, i18nextInstance);
  }

  if (posts.length > 0) {
    renderPosts(posts, i18nextInstance);
  }
};

export default feedView;