import { Router } from "express";
import { authController } from "./auth.controllers";
import catchAsync from "../../utility/catchAsync";


const router = Router()

router.post('/login', catchAsync(authController.login))
router.post('/refresh-token', catchAsync(authController.refreshToken))

export const authRouter = router;