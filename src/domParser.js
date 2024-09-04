const domParser = (data) => {
  const domPars = new DOMParser();
  const xmlDoc = domPars.parseFromString(data, 'application/xml');

  const parseError = xmlDoc.querySelector('parsererror');
  if (parseError) {
    throw new Error('errors.invalidRss'); // Генерируем исключение при ошибке парсинга
  }

  const channel = xmlDoc.querySelector('channel');
  const items = xmlDoc.querySelectorAll('item');

  const feed = {
    title: channel.querySelector('title')?.textContent || '',
    description: channel.querySelector('description')?.textContent || '',
    posts: Array.from(items).map((item) => ({
      title: item.querySelector('title')?.textContent || '',
      link: item.querySelector('link')?.textContent || '',
      description: item.querySelector('description')?.textContent || '',
    })),
  };

  return feed; // Возвращаем объект с фидом и постами
};

export default domParser;
