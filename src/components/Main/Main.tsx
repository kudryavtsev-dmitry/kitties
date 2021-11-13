import { LoadingOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card } from '..'
import { catsStore } from '../../stores'
import { LikedButton } from './LikedButton'
import styles from './Main.module.scss'

export const Main = observer((): JSX.Element => {
  const { fetchCats, cats, likeCat, likedCats, deleteCat, isLoading } =
    catsStore

  const [likedToggle, setLikedToggle] = useState(false)

  const filteredCats = useMemo(() => {
    return likedToggle ? cats.filter((cat) => likedCats.includes(cat.id)) : cats
  }, [cats, likedCats, likedToggle])

  useEffect(() => {
    fetchCats()
  }, [fetchCats])

  const handleSelectLiked = useCallback(() => {
    setLikedToggle((v) => !v)
  }, [])

  const handleLikeCat = useCallback(
    (id: string) => {
      likeCat(id)
    },
    [likeCat]
  )

  const handleDeleteCat = useCallback(
    (id: string) => {
      deleteCat(id)
    },
    [deleteCat]
  )

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <LoadingOutlined />
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <LikedButton
          likedToggle={likedToggle}
          selectLiked={handleSelectLiked}
        />
      </div>
      <div className={styles.cardsContainer}>
        {filteredCats.map((cat) => (
          <Card
            key={cat.id}
            url={cat.url}
            id={cat.id}
            liked={likedCats.includes(cat.id)}
            onLike={handleLikeCat}
            onDelete={handleDeleteCat}
          />
        ))}
      </div>
    </div>
  )
})
