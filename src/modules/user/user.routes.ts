import { Router } from "express";
import { userController } from "./user.controllers";
import { Role } from "../../../generated/prisma/enums";
import { authorization } from "../../middleWare/auth";
import catchAsync from "../../utility/catchAsync";


const router = Router()

router.post('/register', catchAsync(userController.userRegister))
router.get('/', authorization.roleAuth(Role.ADMIN), catchAsync(userController.allUserGet)) // extra
router.get('/me', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(userController.getMe));
router.put('/my-profile', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(userController.updateProfile))


export const userRouter = router