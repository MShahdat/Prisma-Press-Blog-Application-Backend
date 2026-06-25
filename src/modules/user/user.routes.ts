import { Router } from "express";
import { userController } from "./user.controllers";
import { Role } from "../../../generated/prisma/enums";
import { authorization } from "../../middleWare/auth";


const router = Router()

router.post('/register', userController.userRegister)
router.get('/', userController.allUserGet) // extra
router.get('/me', authorization.roleAuth(Role.ADMIN, Role.USER), userController.getMe);


export const userRouter = router