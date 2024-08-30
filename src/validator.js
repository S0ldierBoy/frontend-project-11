import * as yup from 'yup';

// Создаем схему валидации для URL
const createSchema = (existingUrls) =>
  yup.string().url('errors.err1').notOneOf(existingUrls, 'errors.duplicate');

// Функция валидации URL
const validateUrl = (url, state) => {
  const existingUrls = Object.keys(state.feeds); // Создаём массив url-ов
  const schema = createSchema(existingUrls);

  return schema.validate(url).catch((error) => {
    throw new Error(error.message);
  });
};

export default validateUrl;
