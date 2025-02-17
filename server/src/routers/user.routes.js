import express from "express";
import {
  fetchUsers,
  fetchUserById,
  modifyUser,
  removeUser,
  getMyProfile,
  searchUser,
  SendRequest,
  acceptRequest,
  notifyMe

} from "../controllers/user.Controller.js";
import { protect, adminOnly } from "../middleware/auth.Middleware.js";
import { validateRequest, validateAcceptRequest } from "../validation/chat.validation.js"

const router = express.Router();

router.use(protect);

router.get("/me", getMyProfile);
router.get("/search", searchUser);
router.get("/all", adminOnly, fetchUsers);
router.post('/request', validateRequest, SendRequest)
router.put('/acceptRequest', validateAcceptRequest, acceptRequest)
router.get('/notification', notifyMe)
router
  .route("/:id")
  .get(fetchUserById)
  .put(modifyUser)
  .delete(adminOnly, removeUser);

export default router;
