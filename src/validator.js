import * as yup from 'yup';

const createSchema = (urls) =>
  yup.object().shape({
    url: yup
      .string()
      .required('errors.err1')
      .url('errors.err1')
      .notOneOf(urls, 'errors.duplicate'),
  });

const validateUrl = (url, state) => {
  const schema = createSchema(state.urls);
  return schema
    .validate({ url })
    .then(() => null)
    .catch((error) => error.message);
};

export default validateUrl;
