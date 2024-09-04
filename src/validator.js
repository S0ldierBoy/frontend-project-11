import * as yup from 'yup';

// Создаем схему валидации для URL
const createSchema = (existingUrls) => yup.object().shape({
  url: yup
    .string()
    .url('errors.invalidUrl') // Проверка на валидный URL
    .notOneOf(existingUrls, 'errors.duplicateRss'), // Проверка на уникальность URL
});

// Функция валидации URL
const validateUrl = (url, state) => {
  const existingUrls = Object.values(state.feeds).map((feed) => feed.url);
  // Создаём массив url-ов

  const schema = createSchema(existingUrls);

  return schema.validate({ url }).catch((error) => {
    throw new Error(error.message);
  });
};

export default validateUrl;
