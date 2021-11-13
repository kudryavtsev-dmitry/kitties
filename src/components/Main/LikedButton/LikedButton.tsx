import classnames from 'classnames'
import React, { memo } from 'react'
import styles from './LikedButton.module.scss'

type LikedButtonType = {
  likedToggle: boolean
  selectLiked: () => void
}

export const LikedButton = memo(
  ({ likedToggle, selectLiked }: LikedButtonType) => {
    return (
      <div
        className={classnames(styles.liked, { [styles.active]: likedToggle })}
        onClick={selectLiked}
      >
        Только понравившиеся котики
      </div>
    )
  }
)
