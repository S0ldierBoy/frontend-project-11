import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url('errors.err1').required('errors.err1'),
});

const validateUrl = (url) => {
  return schema
    .validate({ url })
    .then(() => null)
    .catch((error) => error.message);
};

export default validateUrl;
