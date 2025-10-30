import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import OrganizationCard from "../components/OrgCard";
import BasicDetails from "../components/BasicDetails";
import Users from "../components/Users";
import { useNavigate, useParams } from "react-router-dom";

const Org = () => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [orgDetails, setOrgDetails] = useState(null); // State for org data
  const [loading, setLoading] = useState(true); // Optional loading state
  const params = useParams();

  const getOrgDetailsBySlug = async (slug) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/org/o/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch org details");
      const data = await res.json();
      setOrgDetails(data.orgDetails); // Save org details in state
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(params.orgSlug);
    getOrgDetailsBySlug(params.orgSlug);
  }, [params.orgSlug]);

  if (loading) return <div>Loading...</div>; // Optional loader

  return (
    <div className="text-black flex flex-col gap-6 sm:px-[70px] px-4">
      <div className="text-[#777777] flex gap-3 items-center py-2 justify-between">
        <div className="flex items-center gap-3">
          <section>
            <span>
              <GoHome className="h-5 w-5 font-400" />
            </span>
          </section>
          <section>
            <span>
              <FaAngleRight className="h-3 w-3" />
            </span>
          </section>
          <section onClick={() => navigate("/")} className="cursor-pointer">
            Manage B2B organization
          </section>
          <section>
            <span>
              <FaAngleRight className="h-3 w-3" />
            </span>
          </section>
          <section className="cursor-pointer">Organization details</section>
        </div>
      </div>

      <div>
        {orgDetails && (
          <OrganizationCard
            orgName={orgDetails.org_name}
            mail={orgDetails.org_mail}
            contact={orgDetails.org_contact}
            url={orgDetails.website_url || ""}
            status={orgDetails.status || "inactive"}
          />
        )}
      </div>

      <div className="flex h-8 gap-2 items-center">
        <span
          className={`h-8 flex justify-center items-center rounded-md py-1.5 px-4 cursor-pointer ${
            tab === 0
              ? "bg-[#F0EBFF] text-[#6834FF]"
              : "bg-[#F5F6F7] text-[#777777]"
          }`}
          onClick={() => setTab(0)}
        >
          Basic details
        </span>
        <span
          className={`h-8 flex justify-center items-center rounded-md py-1.5 px-4 cursor-pointer ${
            tab === 1
              ? "bg-[#F0EBFF] text-[#6834FF]"
              : "bg-[#F5F6F7] text-[#777777]"
          }`}
          onClick={() => setTab(1)}
        >
          Users
        </span>
      </div>

      <div>
        {tab === 0 ? (
          <BasicDetails orgDetails={orgDetails} />
        ) : (
          <Users orgDetails={orgDetails} />
        )}
      </div>
    </div>
  );
};

export default Org;
