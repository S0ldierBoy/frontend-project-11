import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state, i18n) => {
  const feeds = Object.values(state.feeds);
  const posts = feeds.flatMap((feed) => feed.posts);

  renderPosts(posts, state, i18n);
  renderFeed(feeds, i18n);
};

export default feedView;
