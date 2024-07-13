const parser = (data) => {
  const parsers = new DOMParser();
  const dom = parsers.parseFromString(data, 'application/xml');
  const items = dom.querySelectorAll('item');

  const result = Array.from(items).map((item) => ({
    title: item.querySelector('title').textContent,
    link: item.querySelector('link').textContent,
    description: item.querySelector('description').textContent,
    //pubDate: item.querySelector('pubDate').textContent,
  }));
  return console.log(result);
};
export default parser;
