export type Comment = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    id: number
    name: string
  }
}

export type SendComment = {
  comment: string,
  rating: string,
  filmId: number | null | undefined
}

export type Comments = {
  filmId: number,
  comments: Comment[]
}

