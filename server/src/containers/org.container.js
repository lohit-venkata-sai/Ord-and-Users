import { eq } from "drizzle-orm";
import db from "../../db/index.js";
import {organizations} from "../../drizzle/schema.js";

const getAllOrgDetails = async (req, res) => {
    const orgDetails = await db.select().from(organizations);
    return res.status(200).send({orgDetails});
}
const getOrgDetails = async (req,res)=>{
    const orgDetails = req.org;
    return res.status(200).send({orgDetails});
}
const postOrgDetails = async (req,res)=>{
    const newOrg = req.body;
    const org = await db.select().from(organizations).where(eq(organizations.org_slug, newOrg.org_slug));
    if(org && org.length > 0){
        return  res.status(400).send({message: "Organization with this slug already exists"});
    }
    await db.insert().into(organizations).values(newOrg);
    return res.status(201).send({newOrg});
}
const updateOrgDetails = async (req, res) => {
    const orgDetails = req.org;
    const updatedOrg = req.body;
    await db.update(organizations).set(updatedOrg).where(eq(organizations.org_id, orgDetails.org_id));
    return res.status(200).send({updatedOrg});
}


export {
    getAllOrgDetails,
    getOrgDetails,
    postOrgDetails,
    updateOrgDetails
}