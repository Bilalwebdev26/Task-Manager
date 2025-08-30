import express from "express"
import { loginUser, registerUser, updateProfile, userProfile } from "../controllers/auth.controller.js"
import { protectedRoute } from "../middlewares/auth.middleware.js"
const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/profile",protectedRoute,userProfile)
router.put("/update-profile",protectedRoute,updateProfile)

export default router