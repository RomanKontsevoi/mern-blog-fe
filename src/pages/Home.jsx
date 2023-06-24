import React, { useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Grid from '@mui/material/Grid'
import { useDispatch, useSelector } from 'react-redux'

import { Post } from '../components/Post'
import { TagsBlock } from '../components/TagsBlock'
import { CommentsBlock } from '../components/CommentsBlock'
import { fetchPosts, fetchTags } from '../redux/slices/posts'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.posts)
  const { data: userData } = useSelector(state => state.auth)
  const [sortBy, setSortBy] = useState('updatedAt')

  const handleSortByChange = (_, newValue) => {
    setSortBy(newValue)
  }

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchPosts({ sortBy }))
  }, [ dispatch, sortBy ])

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={sortBy}
        aria-label="basic tabs example"
        onChange={handleSortByChange}
      >
        <Tab value="updatedAt" label="Новые" />
        <Tab value="viewsCount" label="Популярные" />
      </Tabs>
      <Grid
        container
        spacing={4}
      >
        <Grid
          xs={8}
          item
        >
          {(isPostsLoading ?
            [ ...Array(5) ] :
            posts.items)
            .map((obj, index) => isPostsLoading ?
              (
                <Post
                  key={index}
                  isLoading
                />
              ) : (
                <Post
                  key={index}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl ? obj.imageUrl : ''}
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user?._id}
                />
              ))}
        </Grid>
        <Grid
          xs={4}
          item
        >
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
          />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
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
          />
        </Grid>
      </Grid>
    </>
  )
}
