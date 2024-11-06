import { useCallback, useMemo } from 'react'
import { useFormik } from 'formik'
import {
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material'
import { validationSchema } from './validation'
import {
  amountHandler,
  cardNumberHandler,
  cvvHandler,
  expiryHandler,
  fullNameHandler,
  onSubmitHandler,
} from './helpers'
import { initialValues, DESCRIPTION } from './consts'
import { CustomButton, CustomTextField, Wrapper } from './ui'
import { FormValues, HandleFieldChange } from './types'

const PaidForm = () => {
  const {
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormik<FormValues>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmitHandler,
  })

  const handleFieldChange: HandleFieldChange = useCallback(
    (fieldName, handler) =>
      ({ target }) => {
        const value = handler(target.value)
        console.log()

        if (value !== undefined) setFieldValue(fieldName, value)
      },
    [setFieldValue]
  )

  const handleAmountChange = useMemo(
    () => handleFieldChange('amount', amountHandler),
    [handleFieldChange]
  )
  const handleCardCVVChange = useMemo(
    () => handleFieldChange('cardCVV', cvvHandler),
    [handleFieldChange]
  )
  const handleCardExpiryChange = useMemo(
    () => handleFieldChange('cardExpiry', expiryHandler),
    [handleFieldChange]
  )
  const handleCardNumberChange = useMemo(
    () => handleFieldChange('cardNumber', cardNumberHandler),
    [handleFieldChange]
  )

  const handleFullNameChange = useMemo(
    () => handleFieldChange('fullName', fullNameHandler),
    [handleFieldChange]
  )

  const slotProps = useMemo(
    () => ({
      amount: {
        input: {
          startAdornment: <InputAdornment position="start">₽</InputAdornment>,
        },
      },
      message: {
        htmlInput: {
          maxLength: 50,
        },
      },
    }),
    []
  )

  return (
    <Wrapper>
      <Typography variant="h6" gutterBottom>
        {DESCRIPTION}
      </Typography>
      <form onSubmit={handleSubmit}>
        <CustomTextField
          fullWidth
          id="cardNumber"
          label="Номер карты"
          value={values.cardNumber}
          error={errors.cardNumber}
          touched={touched.cardNumber}
          onChange={handleCardNumberChange}
          onBlur={handleBlur}
        />
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}
        >
          <CustomTextField
            fullWidth
            id="cardExpiry"
            placeholder="ММ / ГГ"
            label="Срок действия"
            value={values.cardExpiry}
            error={errors.cardExpiry}
            touched={touched.cardExpiry}
            onChange={handleCardExpiryChange}
            onBlur={handleBlur}
          />
          <CustomTextField
            fullWidth
            id="cardCVV"
            label="CVV"
            value={values.cardCVV}
            error={errors.cardCVV}
            touched={touched.cardCVV}
            onChange={handleCardCVVChange}
            onBlur={handleBlur}
          />
        </div>
        <CustomTextField
          fullWidth
          id="amount"
          label="Сумма перевода"
          value={values.amount || ''}
          error={errors.amount}
          touched={touched.amount}
          onChange={handleAmountChange}
          onBlur={handleBlur}
          slotProps={slotProps.amount}
        />
        <CustomTextField
          fullWidth
          id="fullName"
          label="Ваше имя"
          value={values.fullName}
          error={errors.fullName}
          touched={touched.fullName}
          onChange={handleFullNameChange}
          onBlur={handleBlur}
        />
        <CustomTextField
          fullWidth
          id="message"
          label="Сообщение получателю"
          value={values.message}
          error={errors.message}
          touched={touched.message}
          onChange={handleChange}
          onBlur={handleBlur}
          slotProps={slotProps.message}
        />

        <Stack direction="row" spacing={2} paddingY={'16px'}>
          <CustomButton color="primary" variant="contained" type="submit">
            Перевести
          </CustomButton>
          <CustomButton
            color="primary"
            variant="outlined"
            type="button"
            onClick={handleReset}
          >
            Вернуться
          </CustomButton>
        </Stack>
      </form>
    </Wrapper>
  )
}

export default PaidForm
