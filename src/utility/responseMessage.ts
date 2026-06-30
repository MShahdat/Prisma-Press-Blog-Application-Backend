import { Request, Response } from "express";
import httpCode from 'http-status'
import { USER } from "../modules/user/user.type";



//& ROOT RESPONSE
export const rootResponse = (res: Response) => {
  const response = {
    success: true,
    statusCode: httpCode.OK,
    author: "Md. Shahdat Hossain",
    message: "Welcome to our prisma press backend API"
  }
  res.status(200).json({
    response
  })
}


//& SUCCESS RESPNSE
export const successResponse = <T> (res: Response, message?: string, data?: T) => {
  const response = {
    success: true,
    statusCode: httpCode.OK,
    message: message || "Request completed successfully",
    data
  }
  res.status(httpCode.OK).json(response)
}


//& ERROR RESPONSE
export const errorResponse = (res: Response, message: string, error?: any) => {
  const response = {
    success: false,
    statusCode: 500,
    message,
    error: error?.stack
  }
  res.status(500).json(response)
}



//& CREATE RESPNSE
export const createResponse = <T>(res: Response, message: string, data?: T) => {
  const response = {
    success: true,
    statusCode: httpCode.CREATED,
    message,
    data
  }
  res.status(httpCode.CREATED).json(response)
}


//& LOGIN RESPONSE
export const loginResponse = <T>(res: Response, data: T) => {
  const response = {
    success: true,
    statusCode: httpCode.OK,
    message: "Login successfully",
    data
  }

  res.status(httpCode.OK).json(response)
}

//& NOT-FOUND RESPNSE
export const notFoundResponse = (res: Response) => {
  const response = {
    success: false,
    statusCode: httpCode.NOT_FOUND,
    message : "Not Found!!",
    data: null
  }
  res.status(httpCode.NOT_FOUND).json(response)
}




//& UNAUTHORIZED RESPONSE
export const unauthorizedResponse = (res: Response, message?: string) => {
  const response = {
    success: false,
    statusCode: httpCode.UNAUTHORIZED,
    message : message || "Unauthorized access!",
  }
  res.status(httpCode.UNAUTHORIZED).json(response)
}




//& FORBIDDEN RESPONSE
export const forbiddenResponse = (res: Response, message: string) => {
  const response = {
    success: false,
    statusCode: httpCode.FORBIDDEN,
    message
  }
  res.status(httpCode.FORBIDDEN).json(response)
}


//& BAD REQUEST RESPONSE
export const badResponse = (res: Response, message: string) => {
  const response = {
    success: false,
    statusCode: httpCode.BAD_REQUEST,
    message,
    data: null
  }
  res.status(httpCode.BAD_REQUEST).json(response)
}




