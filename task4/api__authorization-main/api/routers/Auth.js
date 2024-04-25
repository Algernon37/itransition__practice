import { Router } from "express";
import AuthController from "../controllers/Auth.js";
import AuthValidator from "../validators/Auth.js";

const router = Router();

router.post("/sign-in", AuthValidator.signIn, AuthController.signIn);
router.post("/sign-up", AuthValidator.signUp, AuthController.signUp);
router.post("/logout", AuthValidator.logOut, AuthController.logOut);
router.post("/refresh", AuthValidator.refresh, AuthController.refresh);
router.post('/block/:userId', AuthController.blockUser);
router.post('/unblock/:userId', AuthController.unblockUser);
router.post('/delete/:userId', AuthController.deleteUser);
export default router;
 