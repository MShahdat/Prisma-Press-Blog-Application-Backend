import { Router } from "express";
import { commentControler } from "./comments.controllers";
import catchAsync from "../../utility/catchAsync";
import { authorization } from "../../middleWare/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router()

router.post('/', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(commentControler.createComment));
router.get('/author/:authorId', catchAsync(commentControler.getByAuthorId))
router.get('/:commentId', catchAsync(commentControler.getByCommentId))
router.patch('/:commentId', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(commentControler.updateComment));
router.delete('/:commentId', authorization.roleAuth(Role.ADMIN, Role.USER), catchAsync(commentControler.deleteComment));
router.patch('/:commentId/moderate', authorization.roleAuth(Role.ADMIN), catchAsync(commentControler.moderateComment))


export const commentRouter = router