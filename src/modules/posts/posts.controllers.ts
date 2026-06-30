import { Request, Response } from "express"
import { postServices } from "./posts.services"
import { createResponse, notFoundResponse, unauthorizedResponse } from "../../utility/responseMessage";
import { jwtToken } from "../../utility/jwt";
import config from "../../config/env";
import strict from "node:assert/strict";

const posts = async (req: Request, res: Response) => {
  const body = req.body;

  const id = req.user?.id as string

  const result = await postServices.postIntoDB(id, body)
  return createResponse(res, 'post created successfuly', result)

}



export const postsController = {
  posts,
}