import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import {organizations,users} from "../../drizzle/schema.js";

const getAllOrgDetails = async (req, res) => {
    const orgDetails = await db.select().from(organizations);
    return res.status(200).send({orgDetails});
}
const getOrgDetails = async (req,res)=>{
    const orgDetails = req.org;
    return res.status(200).send({orgDetails});
}
const postOrgDetails = async (req,res)=>{
    const newOrg= req.body;
    
    const org = await db.select().from(organizations).where(eq(organizations.org_slug, newOrg.org_slug));
    if(org && org.length > 0){
        return  res.status(400).send({message: "Organization with this slug already exists"});
    }
    await db.insert(organizations).values(newOrg).returning();
    return res.status(201).send({newOrg});
}
const updateOrgDetails = async (req, res) => {
    const orgDetails = req.org;
    const updatedOrg = req.body;
    await db.update(organizations).set(updatedOrg).where(eq(organizations.org_id, orgDetails.org_id));
    return res.status(200).send({updatedOrg});
}

const deleteOrg = async (req,res) => {
    const org = req.org; 
    console.log(org);
     if (!org || !org.org_id) {
       return res
         .status(400)
         .send({ message: "Organization not found in request" });
     }

     try {
       await db.delete(users).where(eq(users.org_id, org.org_id));

       const deletedOrg = await db
         .delete(organizations)
         .where(eq(organizations.org_id, org.org_id))
         .returning();

       if (deletedOrg.length === 0) {
         return res.status(404).send({ message: "Organization not found" });
       }

       res
         .status(200)
         .send({
           message: "Organization and its users deleted",
           org: deletedOrg[0],
         });
     } catch (err) {
       console.error("❌ Delete org error:", err);
       res.status(500).send({ message: "Failed to delete organization" });
     }
}
export {
    getAllOrgDetails,
    getOrgDetails,
    postOrgDetails,
    updateOrgDetails,
    deleteOrg
}