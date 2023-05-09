import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Post } from '../components/Post'
import { Index } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../redux/slices/posts'

export const FullPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { post: { item: {
    _id,
    text,
    title,
    user,
    imageUrl,
    createdAt,
    viewsCount,
    tags
  }, status } } = useSelector(state => state.posts)
  const isPostLoading = status === 'loading'

  useEffect(() => {
    dispatch(fetchPost(id))
  }, [ dispatch, id ])

  console.log(id)

  if(isPostLoading) {
    return <Post isLoading isFullPost />
  }

  return (
    <>
      <Post
        id={_id}
        title={title}
        imageUrl={imageUrl}
        user={user}
        createdAt={createdAt}
        viewsCount={viewsCount}
        commentsCount={3}
        tags={tags}
        isFullPost
      >
        {text}
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Вася Пупкин',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий 555555',
          },
          {
            user: {
              fullName: 'Иван Иванов',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  )
}
