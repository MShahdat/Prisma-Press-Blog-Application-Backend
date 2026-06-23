import { Router } from "express";
import { authController } from "./auth.controllers";


const router = Router()

router.post('/login', authController.login)
router.post('/refresh-token', authController.refreshToken)

export const authRouter = router;