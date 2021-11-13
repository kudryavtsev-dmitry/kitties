import { DeleteOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons'
import React, { memo } from 'react'
import styles from './CardActions.module.scss'

type CardActionsType = {
  liked: boolean
  onDelete: () => void
  onLike: () => void
}

export const CardActions = memo(
  ({ onLike, onDelete, liked }: CardActionsType) => {
    return (
      <div className={styles.actions}>
        <DeleteOutlined className={styles.icon} onClick={onDelete} />
        {liked ? (
          <HeartFilled className={styles.likeIcon} onClick={onLike} />
        ) : (
          <HeartOutlined className={styles.icon} onClick={onLike} />
        )}
      </div>
    )
  }
)
