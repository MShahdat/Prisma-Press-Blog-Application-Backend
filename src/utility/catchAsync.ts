import { NextFunction, Request, RequestHandler, Response } from "express";
import { errorResponse } from "./responseMessage";


//& HEIGHER ORDER FUNCTION
const catchAsync = (fn:RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      errorResponse(res, error.message, error)
    }
  }
}


export default catchAsync