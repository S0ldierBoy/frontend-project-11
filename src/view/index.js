import renderFeed from './renderFeed.js';
import renderPosts from './renderPosts.js';

const feedView = (state, i18nextInstance) => {
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
      url: post.link,
    }))
  );

  renderFeed(feedData, i18nextInstance);
  renderPosts(postData, i18nextInstance);
};

export default feedView;
