import { Router } from "express";
import { postsController } from "./posts.controllers";
import { authorization } from "../../middleWare/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post('/', authorization.roleAuth(Role.ADMIN, Role.USER), postsController.posts)



export const postsRouter = router
