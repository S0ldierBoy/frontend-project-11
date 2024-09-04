const domParser = (data) => new Promise((resolve, reject) => {
  try {
    const domPars = new DOMParser();
    const xmlDoc = domPars.parseFromString(data, 'application/xml');

    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      reject(new Error('errors.invalidRss'));
      return;
    }

    const rss = xmlDoc.querySelector('rss');
    if (!rss) {
      reject(new Error('errors.unknownError'));
      return;
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

export default domParser;
