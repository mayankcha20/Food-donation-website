import express from "express";
import {
  deletePost,
  getMyPost,
  newPost,
  updatePost,
  getpost,
  getAllPost
} from "../controllers/post.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newPost);

router.get("/my", isAuthenticated, getMyPost);
router.get("/all",isAuthenticated, getAllPost);

router
  .route("/:id")
  .put(isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost)
  .get(isAuthenticated,getpost);

export default router;