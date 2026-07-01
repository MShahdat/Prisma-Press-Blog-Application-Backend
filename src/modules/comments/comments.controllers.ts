import { Request, Response } from "express"
import { commentServices } from "./comments.services";
import { createResponse, notFoundResponse, successResponse, unauthorizedResponse } from "../../utility/responseMessage";
import { Role } from "../../../generated/prisma/enums";


//& COMMENT CREATE
const createComment = async (req: Request, res: Response) => {
  const body = req.body;
  const userId = req.user?.id as string

  console.log('user id ', userId)

  const result = await commentServices.commentCreateIntoDB(userId, body)

  if (!result) {
    return notFoundResponse(res)
  }

  return createResponse(res, 'comment created successfully', result)

}



//& GET COMMENTS BY AUTHOR ID
const getByAuthorId = async (req: Request, res: Response) => {
  const authorId = req.params.authorId as string
  const result = await commentServices.getByAuthorIdFromDB(authorId)

  if (!result || result.length === 0 ) {
    return notFoundResponse(res)
  }

  return successResponse(res, 'comments retrive successfully', result)

}



//& GET COMMENTS BY COMMENT ID
const getByCommentId = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string
  const result = await commentServices.getByCommentIdFromDB(commentId)

  if (!result || result.length === 0) {
    return notFoundResponse(res)
  }
  return successResponse(res, 'comments retrive successfully', result)
}



//& UPDATE COMMENT
const updateComment = async (req: Request, res: Response) => {
  const id = req.params.commentId as string
  const body = req.body
  const role = req.user?.role as Role
  const userId = req.user?.id as string

  const result = await commentServices.updateCommentIntoDB(id, body, role, userId)
  
  if(!result){
    return notFoundResponse(res)
  }
  if(result === 'unauthorized'){
    return unauthorizedResponse(res, 'Unauthorized access')
  }

  return successResponse(res, 'comment updated successfully', result)
}



//& DELETE COMMENT
const deleteComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const userId = req.user?.id as string;
  const role = req.user?.role as Role;

  const result = await commentServices.deleteCommentFromDB(commentId, role, userId)
  if(!result){
    return notFoundResponse(res)
  }
  if(result === 'unauthorized'){
    return unauthorizedResponse(res, 'unauthorized access')
  }
  return successResponse(res, 'comment deleted successfully')
}


//& MODERATE COMMENTS
const moderateComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId as string;
  const body = req.body
  
  const result = await commentServices.moderateCommentIntoDB(commentId, body);
  
  if(!result){
    return notFoundResponse(res)
  }
  return successResponse(res, 'comment moderate successfully', result)
}



export const commentControler = {
  createComment,
  getByAuthorId,
  getByCommentId,
  updateComment,
  deleteComment,
  moderateComment,
}