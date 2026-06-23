import { Router } from "express";
import { userController } from "./user.controllers";

const router = Router()

router.post('/register', userController.userRegister)
router.get('/', userController.allUserGet)


export const userRouter = router