import db from '../../db/index.js';
import { users } from '../../drizzle/schema.js';
import { eq } from 'drizzle-orm';
const getAllOrgUsers = async(req, res) => {
    const orgId = req.params.orgId;
    const usersInOrg = await db
        .select()
        .from(users)
        .where(eq(users.org_id, orgId));
    if(!usersInOrg || usersInOrg.length === 0){
        return res.status(404).send({message: "No users found in this organization"});
    }
    res.status(200).send(usersInOrg);
}
const createUserInOrg = async (req, res) => {
    const orgId = req.params.orgId;
    const newUser = req.body;
    const createdUser = await db
        .insert(users)
        .values({ ...newUser, org_id: orgId })
        .returning();
    res.status(201).send(createdUser);
}
const updateUserInOrg = async (req, res) => {
    const orgId = req.params.orgId;
    const org = await db.select().from(organizations).where(eq(organizations.org_id, orgId));
    if(!org || org.length === 0){
        return res.status(404).send({message: "Organization not found"});
    }
    const userId = req.params.userId;
    const user = await db.select().from(users).where(eq(users.id, userId), eq(users.org_id, orgId));
    if(!user || user.length === 0){
        return res.status(404).send({message: "User not found in this organization"});
    }
    const updatedData = req.body;
    const updatedUser = await db
        .update(users)
        .set(updatedData)
        .where(eq(users.id, userId), eq(users.org_id, orgId))
        .returning();
    res.status(200).send(updatedUser);
}
const deleteUserInOrg = async (req, res) => {
    const orgId = req.params.orgId;
    const userId = req.params.userId;
    await db
        .delete()
        .from(users)
        .where(eq(users.id, userId), eq(users.org_id, orgId));
    res.status(204).send();
}


export { getAllOrgUsers, createUserInOrg, updateUserInOrg, deleteUserInOrg };