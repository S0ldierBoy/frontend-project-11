import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state) => {
  const { feed, posts } = state;

  console.log(posts);
  renderFeed(feed);
  renderPosts(posts);
};

export default feedView;
