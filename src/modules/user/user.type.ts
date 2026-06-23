

export interface USER {
  id?: string
  name: string
  email: string
  password?: string
  activeStatus?: "ACTIVE" | "BLOCK"
  role?: "ADMIN" | "USER" | "AUTHOR"
  createdAt?: Date
  updatedAt?: Date
  profilePhoto?: string
  bio?:string
}