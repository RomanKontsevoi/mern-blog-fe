import React from 'react'
import styles from './UserInfo.module.scss'
import { baseURL } from '../../axios'

export const UserInfo = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl ? `${baseURL}/${avatarUrl}` : `${baseURL}/uploads/user_icon.png`}
        alt={fullName}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  )
}
