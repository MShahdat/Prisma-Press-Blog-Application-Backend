import { Role } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"
import { authorization } from "../../middleWare/auth"
import { COMMENT, moderatePayload, updatePayload } from "./comments.type"


//& COMMENT CREATE
const commentCreateIntoDB = async (authorId: string, payload: COMMENT) => {
  
  const {postId} = payload
  const post = await prisma.post.findUnique({
    where: {id: postId}
  })

  if(!post){
    return null
  }

  const comment = await prisma.comment.create({
    data: {
      ...payload,
      authorId,
    },
    include: {
      author: {
        omit: {
          password: true
        }
      },
      post: true
    }
  })


  return comment
}



//& GET COMMENTS BY AUTHOR ID
const getByAuthorIdFromDB = async (authorId: string) => {
  const comments = await prisma.comment.findMany({
    where: {
      authorId,
      status: "APPROVED"
    }
  })
  return comments
}



//& GET COMMENTS BY COMMENT ID
const getByCommentIdFromDB = async (commentId: string) => {
const comments = await prisma.comment.findMany({
    where: {
      id: commentId,
      status: "APPROVED"
    }
  })
  return comments
}



//& UPDATE COMMENT
const updateCommentIntoDB = async (id: string, payload: updatePayload, loggedRole: Role, userId: string) => {
  const allowKey = ['content']
  const keys = Object.keys(payload)

  const isValid = keys.some((key) => !allowKey.includes(key))
  if(isValid){
    throw new Error('Invalid or extra fields in request body')
  }

  const comment = await prisma.comment.findUnique({
    where: { id }
  })

  if(!comment){
    return null
  }

  const authorId = comment.authorId

  const getAccess = authorization.ownAuth(loggedRole, authorId, userId)
  if(getAccess === 'unauthorized'){
    return 'unauthorized'
  }

  const updateComment = await prisma.comment.update({
    where: {id},
    data: {
      ...payload
    }
  })

  return updateComment
}



//& DELETE COMMENT
const deleteCommentFromDB = async (id: string, loggedRole: Role, userId: string) => {
  const comment = await prisma.comment.findUnique({
    where: {id}
  })

  if(!comment){
    return null
  }

  const authorId = comment.authorId;
  const getAccess = authorization.ownAuth(loggedRole, authorId, userId)
  if(getAccess === 'unauthorized'){
    return 'unauthorized'
  }

  const deleteComment = await prisma.comment.delete({
    where: {id}
  })
  return deleteComment
}


//& MODERATE COMMENTS
const moderateCommentIntoDB = async (id: string, payload: moderatePayload) => {

  const validKey = ['status'];
  const keys = Object.keys(payload);

  const isValid = keys.some((key) => !validKey.includes(key))
  if(isValid){
    throw new Error('Invalid or extra fields in request body')
  }

  const comment = await prisma.comment.findUnique({
    where: {id}
  })
  if(!comment){
    return null
  }

  const updateComment = await prisma.comment.update({
    where: {id},
    data: {
      ...payload
    }
  })
  return updateComment
}



export const commentServices = {
  commentCreateIntoDB,
  getByAuthorIdFromDB,
  getByCommentIdFromDB,
  updateCommentIntoDB,
  deleteCommentFromDB,
  moderateCommentIntoDB,
}