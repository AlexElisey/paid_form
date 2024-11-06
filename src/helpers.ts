import { CheckNumbersLength, FormValues, GetHashSum } from './types'
import { API_KEY, SECRET, DESCRIPTION } from './consts'

export const getHashSum: GetHashSum = async ({
  api_key,
  transaction,
  amount,
}) => {
  const amountInCents = Math.round(amount * 100)
  const hashString = `${api_key}${transaction}${amountInCents}${SECRET}`

  // Конвертируем строку в массив байтов
  const encoder = new TextEncoder()
  const data = encoder.encode(hashString)

  // Вычисляем SHA-256 хэш
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // Преобразуем результат в шестнадцатеричную строку
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

  return hashHex
}

export const amountMask = (value: string): string => {
  // Разделяем целую и дробную часть
  const [integerPart, decimalPart] = value.split('.')
  const digitsOnlyInteger = integerPart.replace(/\D/g, '')
  // Форматируем целую часть, добавляя пробелы между тысячами
  const formattedIntegerPart = digitsOnlyInteger.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ' '
  )

  // Возвращаем отформатированное значение с копейками, если они есть
  return decimalPart !== undefined
    ? `${formattedIntegerPart}.${decimalPart.slice(0, 2)}`
    : formattedIntegerPart
}

export const cardNumberMask = (value: string): string => {
  const digitsOnly = value.replace(/\D/g, '')
  // Форматируем группы по 4 цифры, добавляя пробелы
  return digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const cardExpiryMask = (value: string) => {
  // Убираем все нецифровые символы, оставляем только цифры
  const digitsOnly = value.replace(/\D/g, '')
  // Автоматически добавляем "/" после двух цифр, если еще нет
  if (value === `${digitsOnly}/`) return `${digitsOnly.slice(0, 2)} / `
  if (digitsOnly.length <= 2) return digitsOnly
  return `${digitsOnly.slice(0, 2)} / ${digitsOnly.slice(2, 4)}`
}

const convertToTimestamp = (monthYear: string): number => {
  const match = monthYear.match(/(\d{2})\s*\/\s*(\d{2})/)

  if (!match) throw new Error('Invalid date format. Expected MM / YY.')

  const month = Number(match[1])
  const year = Number(match[2]) + 2000

  // Создаем дату: 1-е число, указанный месяц и год
  const date = new Date(year, month - 1, 1)

  return date.getTime()
}

export const removeSpaces = (value: string): string => value.replace(/\s+/g, '')

export const checkNumbersLength: CheckNumbersLength = ({ value, length }) => {
  const sanitizedValue = removeSpaces(value)
  return !sanitizedValue.match(/\D/g) && sanitizedValue?.length <= length
}

export const amountHandler = (value: string): string | undefined => {
  console.log('value', value)

  if (!value.startsWith('0')) {
    const formattedValue = amountMask(value)
    return formattedValue
  }
}
export const cvvHandler = (value: string): string | undefined => {
  if (checkNumbersLength({ value, length: 3 })) return value
}
export const expiryHandler = (value: string): string => cardExpiryMask(value)
export const cardNumberHandler = (value: string): string | undefined => {
  if (checkNumbersLength({ value, length: 16 })) return cardNumberMask(value)
}
export const fullNameHandler = (value: string): string | undefined => {
  // Разрешаем пустую строку, строки начинающиеся с буквы, состоящие только из букв и пробелов
  if (value === '' || /^[\p{L}][\p{L}\s]*$/u.test(value)) {
    return value.toUpperCase()
  }
}

export const onSubmitHandler = async (values: FormValues) => {
  const amount = parseFloat(values.amount as unknown as string)
  const transaction = String(Math.round(Math.random() * 1_000_000_000_000_000))

  const hash_sum = await getHashSum({ amount, api_key: API_KEY, transaction })
  const payload = {
    hash_sum,
    transaction,
    description: DESCRIPTION,
    api_key: API_KEY,
    amount,
    email: 'example@email.com',
    custom_data: {
      card_num: parseInt(values?.cardNumber),
      card_exp: convertToTimestamp(values?.cardExpiry),
      card_cvv: values?.cardCVV,
      full_name: values?.fullName,
      message: values?.message,
    },
  }
  alert(JSON.stringify(payload, null, 2))
}
