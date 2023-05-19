import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import styles from './Login.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth'

export const Login = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const {
    register,
    handleSubmit,
    formState: {
      errors, isValid,
    },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))

    if (!data.payload) {
      return alert('Не удалось авторизоваться')
    }

    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token)
    } else {
      alert('Не удалось авторизоваться')
    }
  }

  if (isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography
        classes={{ root: styles.title }}
        variant="h5"
      >
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          type="email"
          fullWidth
          error={!!errors.email?.message}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          error={!!errors.password?.message}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={!isValid}
          fullWidth
        >
          Войти
        </Button>
      </form>
    </Paper>
  )
}
