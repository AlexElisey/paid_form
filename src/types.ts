import { TextFieldProps } from '@mui/material/TextField/TextField'
import { ReactElement } from 'react'

export interface FormValues {
  cardNumber: string
  cardExpiry: string
  cardCVV: string
  amount: number
  fullName: string
  message?: string
}

export type GetHashSum = (props: {
  api_key: string
  transaction: string
  amount: number
}) => Promise<string>

export type CheckNumbersLength = (props: {
  value: string
  length: number
}) => boolean

export type HandleFieldChange = (
  fieldName: string,
  handler: (value: string) => string | undefined
) => (event: React.ChangeEvent<HTMLInputElement>) => void

export type CustomTextFieldType = (props: {
  fullWidth?: boolean
  error?: string
  touched?: boolean
  id: string
  label: string
  value?: string | number
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: unknown) => void
  slotProps?: TextFieldProps['slotProps']
  rest?: Array<any>
}) => ReactElement
