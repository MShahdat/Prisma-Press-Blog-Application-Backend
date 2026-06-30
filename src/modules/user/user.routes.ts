import { Router } from "express";
import { userController } from "./user.controllers";
import { Role } from "../../../generated/prisma/enums";
import { authorization } from "../../middleWare/auth";


const router = Router()

router.post('/register', userController.userRegister)
router.get('/', authorization.roleAuth(Role.ADMIN, Role.USER), userController.allUserGet) // extra
router.get('/me', authorization.roleAuth(Role.ADMIN, Role.USER), userController.getMe);
router.put('/my-profile', authorization.roleAuth(Role.ADMIN, Role.USER), userController.updateProfile)


export const userRouter = router