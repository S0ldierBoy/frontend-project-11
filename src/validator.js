import * as yup from 'yup';

const createSchema = (urls) =>
  yup.object().shape({
    url: yup.string().url('errors.err1').notOneOf(urls, 'errors.duplicate'),
  });

const validateUrl = (url, state) => {
  const schema = createSchema(state.urls);
  return schema.validate({ url }).catch((error) => {
    throw new Error(error.message);
  });
};

export default validateUrl;
