import { Request, Response } from "express"
import { postServices } from "./posts.services"
import { createResponse, notFoundResponse, successResponse, unauthorizedResponse } from "../../utility/responseMessage";
import { jwtToken } from "../../utility/jwt";
import config from "../../config/env";
import strict from "node:assert/strict";
import { prisma } from "../../lib/prisma";
import { Role } from "../../../generated/prisma/enums";


//& CREATE POST
const createPost = async (req: Request, res: Response) => {
  const body = req.body;
  const id = req.user?.id as string

  const result = await postServices.createPostIntoDB(id, body)
  return createResponse(res, 'post created successfuly', result)

}



//& GET ALL POSTS
const getPosts = async(req: Request, res: Response) => {

  const result = await postServices.getPostFromDB()
  if(!result){
    return notFoundResponse(res)
  }
  return successResponse(res, 'all posts retrive successfully', result)
}



//& GET MY POSTS
const getMyPosts = async (req: Request, res: Response) => {
  const id = req.user?.id as string
  const result = await postServices.getMyPostFromDB(id);
  
  if(!result){
    return notFoundResponse(res)
  }

  return successResponse(res, 'all my posts retrive successfully', result)
}



//& GET POST BY ID
const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.postId as string
  const result = await postServices.getPostByIdFromDB(postId)

  if(!result){
    return notFoundResponse(res)
  }
  return successResponse(res, 'post retrive successfully', result)
} 



//& UPDATE POST
const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.postId as string;
  const body = req.body
  const userId = req.user?.id as string
  const role = req.user?.role

  const result = await postServices.updatePostIntoDB(postId, body, userId, role as Role)

  if(!result) {
    return notFoundResponse(res)
  }

  if(result === 'unauthorized'){
    return unauthorizedResponse(res, 'unauthorized access!')
  }

  return successResponse(res, 'post updated successfully', result)

}



//& DELETE POST
const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId as string
  const userId = req.user?.id as string
  const role = req.user?.role as Role
  const result = await postServices.deletePostFromDB(postId, userId, role)
  if(!result){
    return notFoundResponse(res)
  }
  if(result === 'unauthorized'){
    return unauthorizedResponse(res, 'unauthorized access!')
  }

  return successResponse(res, 'post delete successfully')

}




export const postsController = {
  createPost,
  getPosts,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,

}