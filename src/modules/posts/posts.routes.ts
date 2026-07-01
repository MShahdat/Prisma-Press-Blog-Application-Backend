import { Router } from "express";
import { postsController } from "./posts.controllers";
import { authorization } from "../../middleWare/auth";
import { Role } from "../../../generated/prisma/enums";
import catchAsync from "../../utility/catchAsync";


const router = Router();

router.post('/', authorization.roleAuth(Role.ADMIN, Role.USER), postsController.createPost)
router.get('/', catchAsync(postsController.getPosts))
router.get('/my-posts', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(postsController.getMyPosts))
router.get('/:postId', catchAsync(postsController.getPostById))
router.patch('/:postId', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(postsController.updatePost))
router.delete('/:postId', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(postsController.deletePost))



export const postsRouter = router
