import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state) => {
  const feedData = Object.values(state.feeds).map((feed) => ({
    id: feed.id,
    title: feed.title,
    description: feed.description,
    url: feed.url,
  }));

  const postData = Object.values(state.feeds).flatMap((feed) =>
    feed.posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      link: post.link,
    }))
  );
  renderPosts(postData);
  renderFeed(feedData);
};

export default feedView;
