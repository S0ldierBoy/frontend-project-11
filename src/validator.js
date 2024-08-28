import * as yup from 'yup';

// Создаем схему валидации с переводом сообщений об ошибках через i18n
const createSchema = (urls, i18n) =>
  yup.object().shape({
    url: yup
      .string()
      .url(i18n.t('errors.err1')) // Используем i18n для перевода ошибки URL
      .notOneOf(urls, i18n.t('errors.duplicate')), // Перевод ошибки о дубликате
  });

// Функция валидации URL
const validateUrl = (url, state, i18n) => {
  const schema = createSchema(state.urls, i18n);
  return schema.validate({ url }).catch((error) => {
    // Получаем первый текст ошибки из массива и пробрасываем его
    throw new Error(error.errors[0]);
  });
};

export default validateUrl;
