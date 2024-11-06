import * as yup from 'yup'

export const validationSchema = yup.object({
  cardNumber: yup
    .string()
    .matches(/^(\d{4}\s?){4}$/, 'Номер карты должен содержать 16 цифр')
    .required('Введите номер карты'),
  cardExpiry: yup
    .string()
    .matches(
      /^(0[1-9]|1[0-2])\s\/\s([0-9]{2})$/,
      'Дата должна быть в формате ММ / ГГ'
    )
    .required('Введите срок'),
  cardCVV: yup
    .string()
    .matches(/^\d{3}$/, 'CVV должен содержать 3 цифры')
    .required('Введите CVV'),
  amount: yup
    .number()
    .min(10, 'Сумма должна быть больше 10')
    .required('Введите cумму'),
  fullName: yup.string().required('Введите имя'),
})
