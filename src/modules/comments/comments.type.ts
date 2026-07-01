

export interface COMMENT {
  id?: string
  content: string
  postId: string
  authorId?:string
  status?: 'APPROVED' | 'REJECTED'
  createdAt?: Date
  updatedAt?: Date
}



export interface updatePayload {
  content: string
}


export interface moderatePayload {
  status: 'APPROVED' | 'REJECTED'
}

