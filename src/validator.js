import * as yup from 'yup';

// Создаем схему валидации для URL
const createSchema = (existingUrls) =>
  yup.object().shape({
    url: yup
      .string()
      .url('errors.err1') // Проверка на валидный URL
      .notOneOf(existingUrls, 'errors.duplicate'), // Проверка на уникальность URL
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
