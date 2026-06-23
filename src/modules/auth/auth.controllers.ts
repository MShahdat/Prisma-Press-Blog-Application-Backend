import { Request, Response } from "express"
import { authServices } from "./auth.services"
import { badResponse, errorResponse, loginResponse, notFoundResponse, successResponse } from "../../utility/responseMessage"


const login = async (req: Request, res: Response) => {
  try {
    const body = req.body
    const result = await authServices.loginFromDB(body)

    if (result === 0) {
      notFoundResponse(res)
      return
    }
    if (!result) {
      badResponse(res, "Invalid user credentials")
      return
    }

    // console.log('refresh token : ', result.refreshToken)
    res.cookie('refreshToken', result.refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax"
    })

    // console.log('cookies', req.cookies)

    loginResponse(res, result)
  }
  catch (error: any) {
    errorResponse(res, error.message, error)
  }


}

const refreshToken = async (req: Request, res: Response) => {
  // console.log('cookies : ', req.cookies.refreshToken)
  try {
    const result = await authServices.generateRefreshToken(req.cookies.refreshToken)
    if(!result){
      throw new Error('User is blocked. Please try again letter')
    }

    const rs = {
      accessToken: result
    }
    successResponse(res, 'Token refreshed successfully', rs)

  }
  catch (error: any) {
    return errorResponse(res, error.message, error)
  }

}

export const authController = {
  login,
  refreshToken
}