import React, { memo, useCallback } from 'react'
import styles from './Card.module.scss'
import { CardActions } from './CardActions'

type CardType = {
  url: string
  id: string
  liked: boolean
  onLike: (id: string) => void
  onDelete: (id: string) => void
}

export const Card = memo(
  ({ url, liked, onLike, id, onDelete }: CardType): JSX.Element => {
    const handleLike = useCallback(() => {
      onLike(id)
    }, [id, onLike])

    const handleDelete = useCallback(() => {
      onDelete(id)
    }, [id, onDelete])

    return (
      <div className={styles.container}>
        <div className={styles.photo}>
          <img src={url} alt="cat" />
        </div>
        <CardActions
          liked={liked}
          onDelete={handleDelete}
          onLike={handleLike}
        />
      </div>
    )
  }
)
