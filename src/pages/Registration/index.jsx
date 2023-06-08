import React from 'react'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'

import styles from './Login.module.scss'
import { useForm } from 'react-hook-form'
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const Registration = () => {
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
      fullName: 'Иван Сусанин',
      email: 'susanin@mail.com',
      password: '12345'
    },
    mode: 'onChange',
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

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
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={!!errors.fullName?.message}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
        />
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
          fullWidth
          disabled={!isValid}
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  )
}
