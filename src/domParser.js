const parseChannel = (channel) => ({
  title: channel.querySelector('title')?.textContent || '',
  link: channel.querySelector('link')?.textContent || '',
  description: channel.querySelector('description')?.textContent || '',
});

const parseItem = (item) => ({
  title: item.querySelector('title')?.textContent || '',
  link: item.querySelector('link')?.textContent || '',
  description: item.querySelector('description')?.textContent || '',
});

const domParser = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const domPars = new DOMParser();
      const xmlDoc = domPars.parseFromString(data, 'application/xml');

      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        return reject(new Error(parseError.textContent));
      }

      const rss = xmlDoc.querySelector('rss');

      if (!rss) {
        throw new Error('Неизвестная ошибка. Что-то пошло не так.');
      }

      const items = xmlDoc.querySelectorAll('item');
      const channels = xmlDoc.querySelectorAll('channel');

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
