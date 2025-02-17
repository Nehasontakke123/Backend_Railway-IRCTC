// import express from "express";
// import { register, login } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

// export default router;






import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";  // ✅ Correct names

const router = express.Router();

router.post("/register", registerUser);  // ✅ Correct function name
router.post("/login", loginUser);        // ✅ Correct function name

export default router;
