import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state, i18n) => {
  const { feeds, posts } = state;

  renderFeed(feeds, i18n);
  renderPosts(posts, state, i18n);
};

export default feedView;
