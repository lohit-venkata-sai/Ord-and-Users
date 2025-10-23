import { Router } from "express";
import { getAllOrgUsers, createUserInOrg, updateUserInOrg, deleteUserInOrg } from "../containers/user.container.js";
const router = Router();

router.get('/:orgId', getAllOrgUsers);
router.post('/:orgId', createUserInOrg);
router.put('/:orgId/:userId', updateUserInOrg);
router.delete("/:orgId/:userId", deleteUserInOrg);

export default router;