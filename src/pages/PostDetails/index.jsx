import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import SimpleMDE from 'react-simplemde-editor'

import 'easymde/dist/easymde.min.css'
import styles from './PostDetails.module.scss'
import axios, { baseURL } from '../../axios'
import { useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth'

export const AddPost = () => {
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  let { id } = useParams()

  const [ isLoading, setLoading ] = useState(false)
  const [ imageUrl, setImageUrl ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ text, setText ] = useState('')
  const [ tags, setTags ] = useState('')
  const inputFileRef = useRef(null)

  useEffect(() => {
    if (id) {
      const getPost = async () => {
        try {
          const { data } = await axios.get(`/posts/${id}`)
          setImageUrl(data.imageUrl)
          setText(data.text)
          setTitle(data.title)
          setTags(data.tags.join(', '))
        } catch (e) {
          console.log('Ошибка при загрузке статьи')
        }
      }

      getPost()
    }
  }, [ id ])

  const handleChangeFile = async ({ target }) => {
    console.log('works')
    try {
      const formData = new FormData()
      const [ file ] = target.files
      formData.append('image', file)
      const { data } = await axios.post('upload', formData)
      console.log(data)
      setImageUrl(data.url)
    } catch (e) {
      console.log('Ошибка при загрузке файла')
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const onTextChange = React.useCallback((value) => {
    setText(value)
  }, [])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  )

  const onSubmit = async () => {
    try {
      setLoading(true)
      const tagsArray = tags
        .split(',')
        .map(tag => tag.trim())
      const fields = { title, tags: tagsArray, text, imageUrl }
      const { data } = id ?
        await axios.patch(`/posts/${id}`, fields) :
        await axios.post('/posts', fields)
      navigate(`/posts/${data._id ?? id}`)
    } catch (e) {
      console.warn('Ошибка при создании статьи')
    } finally {
      setLoading(false)
    }
  }

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        variant="outlined"
        size="large"
        onClick={() => inputFileRef.current.click()}
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`${baseURL}${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onTextChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          size="large"
          variant="contained"
          onClick={onSubmit}
        >
          {id ? 'Обновить' : 'Опубликовать'}
        </Button>
        {isLoading && 'Выполняется сохранение...'}
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  )
}
