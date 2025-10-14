import express from "express"
import { signUp,login,logout,checkAuth } from "../controllers/auth.controller.js"
import { protectedRoute } from "../middleware/auth.protectedRoute.js"

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",logout)
router.get("/checkauth",protectedRoute,checkAuth)

export default router