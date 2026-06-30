

export interface POSTS {
  id?: string
  title: string
  content: string
  thumbnail?: string
  isFeatured?: Boolean
  status?: 'PUBLISHED' | 'PENDING' | 'REJECTED'
  tags?: string[]
  views?: number
  authorId: string
  createdAt?: Date
  updatedAt?: Date
  comment?: string[]
}
