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
        return reject(new Error('errors.unknownError'));
      }

      const channel = rss.querySelector('channel');
      const items = rss.querySelectorAll('item');

      const feed = {
        title: channel.querySelector('title')?.textContent || '',
        description: channel.querySelector('description')?.textContent || '',
        posts: Array.from(items).map((item) => ({
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '',
          description: item.querySelector('description')?.textContent || '',
        })),
      };

      resolve(feed);
    } catch (error) {
      reject(error);
    }
  });
};

export default domParser;
