import {
  styled,
  Box,
  TextField,
  Typography,
  Button,
  ButtonProps,
} from '@mui/material'
import { CustomTextFieldType } from './types'

export const Wrapper = styled('div')({
  background: '#fff',
  borderRadius: 24,
  width: 600,
  margin: '3rem auto',
  padding: 32,
})

export const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="subtitle1" color="#22252BB2" gutterBottom>
    {children}
  </Typography>
)

export const CustomTextField: CustomTextFieldType = ({
  id,
  label,
  value,
  touched,
  fullWidth,
  error,
  onChange,
  onBlur,
  slotProps,
  ...rest
}) => {
  return (
    <Box paddingY={'16px'}>
      <FieldLabel>{label}</FieldLabel>
      <TextField
        id={id}
        fullWidth={fullWidth}
        value={value}
        error={touched && Boolean(error)}
        helperText={touched && error}
        onChange={onChange}
        onBlur={onBlur}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '&.Mui-error': {
              '& fieldset': {
                borderColor: '#C24100',
              },
            },
          },
        }}
        slotProps={{
          htmlInput: {
            style: {
              height: 52,
              boxSizing: 'border-box',
            },
          },
          formHelperText: {
            sx: {
              '&.Mui-error': {
                color: '#C24100',
              },
              marginLeft: 0,
            },
          },
          ...slotProps,
        }}
        {...rest}
      />
    </Box>
  )
}

export const CustomButton: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Button
    {...props}
    size="large"
    sx={{
      height: '52px',
      borderRadius: '12px',
    }}
  >
    {children}
  </Button>
)
