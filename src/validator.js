import * as yup from 'yup';

// Функция валидации URL
const validateUrl = (url, state) => {
  // Создаём массив существующих URL-ов
  const existingUrls = Object.values(state.feeds).map((feed) => feed.url);

  const schema = yup.object().shape({
    url: yup
      .string()
      .url('errors.invalidUrl') // Проверка на валидный URL
      .notOneOf(existingUrls, 'errors.duplicateRss'), // Проверка на уникальность URL
  });

  // Выполняем валидацию
  return schema.validate({ url }).catch((error) => {
    throw new Error(error.message);
  });
};

export default validateUrl;
