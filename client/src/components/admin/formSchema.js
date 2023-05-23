import * as yup from 'yup';

export const schema = yup.object().shape({
  title: yup.string().max(50, "No more than 50 characters allowed.")
    .required("Title is required."),
  description: yup.string().required("Description is required."),
  price: yup.string().matches(/^\d{1,7}(\.\d{0,2})?$/, "Please enter positive numbers only.")
    .required("Price is required.")
});