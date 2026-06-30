import { prisma } from "../../lib/prisma"
import { POSTS } from "./type"



const postIntoDB = async (id: string, payload: POSTS) => {
  const post = await prisma.post.create({
    data: {
      ...payload,
      authorId: id
    },
  })
  return post
}



export const postServices = {
  postIntoDB,
}