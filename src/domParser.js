import uniqueId from 'lodash/uniqueId.js';

const domParser = (data) => {
  const parseChannel = (channel) => ({
    title: channel.querySelector('title')?.textContent || '',
    description: channel.querySelector('description')?.textContent || '',
  });

  const parseItem = (item) => ({
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
    description: item.querySelector('description')?.textContent || '',
    id: uniqueId(),
  });

  return new Promise((resolve, reject) => {
    try {
      const domPars = new DOMParser();
      const xmlDoc = domPars.parseFromString(data, 'application/xml');

      const rss = xmlDoc.querySelector('rss');
      const items = xmlDoc.querySelectorAll('item');
      const channels = xmlDoc.querySelectorAll('channel');

      if (!rss) {
        throw new Error('errors.err2');
      }

      const getFeed = Array.from(channels).map(parseChannel);
      const getPosts = Array.from(items).map(parseItem);

      const result = { feed: getFeed, posts: getPosts };

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export default domParser;
