import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state, i18nextInstance) => {
  const { feeds, posts } = state;

  renderFeed(feeds, i18nextInstance);

  renderPosts(posts, i18nextInstance);
};

export default feedView;
