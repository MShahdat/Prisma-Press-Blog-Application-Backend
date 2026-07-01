

export interface USER {
  id?: string
  name: string
  email: string
  password?: string
  activeStatus?: "ACTIVE" | "BLOCKED"
  role?: "ADMIN" | "USER"
  createdAt?: Date
  updatedAt?: Date
  profilePhoto?: string
  bio?:string
}


export interface UpdatePayload {
  name?: string
  password?: string
  updatedAt?: Date
  profilePhoto?: string
  bio?:string
}

