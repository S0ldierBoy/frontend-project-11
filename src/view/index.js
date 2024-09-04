import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state) => {
  const feeds = Object.values(state.feeds);
  const posts = feeds.flatMap((feed) => feed.posts);

  renderPosts(posts, state);
  renderFeed(feeds);
};

export default feedView;
