import { ActiveStatus, Role } from "../../generated/prisma/enums"


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        name: string
        email: string
        activeStatus: ActiveStatus
        role: Role
      }
    }
  }
}