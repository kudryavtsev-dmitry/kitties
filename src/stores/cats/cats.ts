import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

type Cat = {
  url: string
  id: string
}

class CatsStore {
  private _cats: Cat[] = []

  private _likedCats: string[] = []

  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  get cats() {
    return this._cats
  }
  get likedCats() {
    return this._likedCats
  }

  likeCat = (id: string) => {
    if (this._likedCats.includes(id)) {
      this._likedCats = this._likedCats.filter((el) => el !== id)
    } else {
      this._likedCats = [...this._likedCats, id]
    }
  }

  deleteCat = (id: string) => {
    this._cats = this.cats.filter((cat) => cat.id !== id)
  }

  fetchCats = async () => {
    this.isLoading = true
    const { data } = await axios.get(`${process.env.REACT_APP_KITTY_URL}`, {
      params: {
        limit: 9,
      },
      headers: {
        'x-api-key': `${process.env.REACT_APP_X_API_KEY}`,
      },
    })
    if (data) {
      runInAction(() => {
        this.isLoading = false
        this._cats = data.map((el: Cat) => ({ url: el.url, id: el.id }))
      })
    }
  }
}

export const catsStore = new CatsStore()
