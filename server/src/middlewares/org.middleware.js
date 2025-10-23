import db from "../../db/index.js";
import { organizations } from "../../drizzle/schema.js";
import { eq } from "drizzle-orm";

const isOrgAvailable = async (req, res, next) => {
  try {
    const slug = req.params.orgId; 
    console.log("Middleware slug:", slug);

    if (!slug) {
      return res.status(400).send({ message: "orgId parameter is required" });
    }

      const org = await db
        .select()
        .from(organizations)
        .where(eq(organizations.org_slug, slug));

    if (!org || org.length === 0) {
      return res.status(404).send({ message: "Organization not found" });
    }

    req.org = org[0]; // attach to request
    next();
  } catch (error) {
    console.error("Error in isOrgAvailable middleware:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export { isOrgAvailable };
