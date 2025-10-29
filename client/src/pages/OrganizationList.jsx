import React, { useEffect, useRef, useState } from "react";
import Loading from "../components/Loading.jsx";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { FaAngleRight } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import Button from "../components/Button.jsx";
import { Bin, Eye, Funnel } from "../../public/svgs.jsx";
import Drawer from "@mui/material/Drawer";
const OrganizationList = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [organizations, setOrganozations] = useState([]);
  const [details, setDetails] = useState({
    org_name: "",
    org_slug: "",
    org_mail: "",
    org_contact: "",
  });
  const getOrganizationsList = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/org`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { orgDetails } = await res.json();
      setOrganozations(orgDetails);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !details.org_name ||
      !details.org_slug ||
      !details.org_mail ||
      !details.org_contact
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/org`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create organization");
      }

      const { newOrg } = await res.json();
      console.log("✅ Organization added:", newOrg);

      // Reset form & refresh org list
      setDetails({
        org_name: "",
        org_slug: "",
        org_mail: "",
        org_contact: "",
      });
      await getOrganizationsList();

      setIsOpen(false);
    } catch (err) {
      console.error("❌ Error submitting organization:", err);
      setError(err.message || "Something went wrong while adding organization");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrg = async (orgSlug) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this organization and all its users? This action cannot be undone."
    );
    if (!confirmDelete) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/org/o/${orgSlug}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete organization");
      }

      alert("Organization deleted successfully");
    } catch (err) {
      console.error("Error deleting organization:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMoreDetails = (slug) => {
    navigate(`/${slug}`);
  };
  useEffect(() => {
    getOrganizationsList();
    console.log(organizations);
  }, []);
  if (isLoading) return <Loading />;
  if (error || error.length > 0) <div>there is an error {error.message}</div>;
  return (
    <div className="flex flex-col gap-3 px-[70px] mb-10">
      <div className="mt-2 text-[#777777] flex gap-3 items-center  py-2 justify-between">
        <div className="flex items-center gap-3">
          <section className="">
            <span>
              <GoHome className="h-5 w-5 font-400  " />
            </span>
          </section>
          <section className="">
            <span>
              <FaAngleRight className="h-3 w-3  " />
            </span>
          </section>
          <section>Manage B2B organization</section>
        </div>
        <section className="flex justify-center self-end items-center">
          <span className="p-2 hover:bg-[#e9e3fd] bg-[#f0ebff] rounded cursor-pointer">
            <FiSearch className="h-3.5 w-3.5 text-[#6834FF] " />
          </span>
        </section>
      </div>
      <div className="text-black border border-gray-400 rounded-sm">
        <div className="flex justify-between items-center h-14 px-3 py-5">
          <span className="text-[#232323] font-semibold">
            <h4>B2B organizations</h4>
          </span>
          <span className="text-white text-sm">
            <Button
              text={"+ Add organization"}
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </span>
        </div>
        <div className="w-full bg-white  overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 ">
                <tr className="h-11">
                  <th
                    scope="col"
                    className=" text-center text-sm font-medium text-gray-600"
                  >
                    Sr. No
                  </th>
                  <th
                    scope="col"
                    className="pl-5 text-left text-sm font-medium text-gray-600"
                  >
                    Organizations
                  </th>
                  <th
                    scope="col"
                    className=" text-left text-sm font-medium text-gray-600"
                  >
                    Pending requests
                  </th>
                  <th
                    scope="col"
                    className=" text-left text-sm font-medium text-gray-600"
                  >
                    <div className="flex items-center gap-1">
                      Status
                      <img src={Funnel} alt="" />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="pl-3 text-left text-sm font-medium text-gray-600"
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className=" divide-gray-200">
                {(organizations || organizations.length > 0) &&
                  organizations.map((item, ind) => (
                    <tr className="text-sm" key={ind}>
                      <td className="whitespace-nowrap text-sm text-center ">
                        {ind + 1}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 ">
                        <div className="flex items-center gap-3">
                          <img
                            className="h-8 w-8 rounded"
                            src={item.profile_img_url || null}
                            alt="Logo"
                          />
                          {item.org_name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap text-sm text-gray-700 align-middle">
                        45 pending requests
                      </td>

                      <td className="py-4 whitespace-nowrap text-gray-700 align-middle">
                        {item.status === "active" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F8E9] px-3 py-1 text-sm font-medium text-[#12BB23]">
                            <span className="h-2 w-2 rounded-full bg-[#12BB23]"></span>
                            Active
                          </span>
                        )}
                        {item.status === "inactive" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F6F7] px-3 py-1 text-sm font-medium text-[#777777]">
                            <span className="h-2 w-2 rounded-full bg-[#97A1B2]"></span>
                            Inactive
                          </span>
                        )}
                        {item.status === "blocked" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDEAEA] px-3 py-1 text-sm font-medium text-[#E92B2B]">
                            <span className="h-2 w-2 rounded-full bg-[#E92B2B]"></span>
                            Blocked
                          </span>
                        )}
                      </td>
                      <td className="pl-3 py-4  whitespace-nowrap text-sm text-gray-700 align-middle">
                        <div className="flex gap-4 text-gray-500">
                          <img
                            src={Eye}
                            alt="eye"
                            className="cursor-pointer"
                            onClick={() => handleMoreDetails(item.org_slug)}
                          />
                          <img
                            src={Bin}
                            alt="bin"
                            className="cursor-pointer"
                            onClick={() => handleDeleteOrg(item.org_slug)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <Drawer open={isOpen} anchor="right">
            <div className="w-[600px] h-full flex flex-col gap-3">
              <header className="h-18 flex items-center justify-between py-5 px-4 shadow-sm">
                <span>Add Organization</span>
                <span onClick={() => setIsOpen(false)}>
                  <IoClose className="h-5 w-5 text-[#97A1B2] cursor-pointer" />
                </span>
              </header>
              <main className="px-6 border-b border-gray-500 h-full">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  ref={formRef}
                  className="flex flex-col gap-3"
                >
                  <div className=" flex justify-between h-16 gap-3">
                    <div className="flex flex-col gap-1 text-[#777777] flex-1">
                      <label htmlFor="name">Name of organization</label>
                      <input
                        type="text"
                        placeholder="Text"
                        name="name"
                        required
                        onChange={(e) =>
                          setDetails((prev) => {
                            return { ...prev, ["org_name"]: e.target.value };
                          })
                        }
                        value={details.org_name}
                        className="py-1 px-3 border rounded-md border-[#B9C0CB]"
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-[#777777] flex-1">
                      <label htmlFor="slug">Slug</label>
                      <input
                        type="text"
                        placeholder="Type here"
                        name="slug"
                        required
                        onChange={(e) =>
                          setDetails((prev) => {
                            return { ...prev, ["org_slug"]: e.target.value };
                          })
                        }
                        value={details.org_slug}
                        className="py-1 px-3 border rounded-md border-[#B9C0CB]"
                      />
                    </div>
                  </div>
                  <div className=" flex justify-between h-[64px] gap-3">
                    <div className="flex flex-col gap-1 text-[#777777] flex-1">
                      <label htmlFor="mail">Organization mail</label>
                      <input
                        type="email"
                        placeholder="Type here"
                        name="mail"
                        required
                        onChange={(e) =>
                          setDetails((prev) => {
                            return { ...prev, ["org_mail"]: e.target.value };
                          })
                        }
                        value={details.org_mail}
                        className="py-1 px-3 border border-[#B9C0CB] rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-[#777777] flex-1">
                      <label htmlFor="contact">Contact</label>
                      <input
                        type="tel"
                        pattern="^[0-9\-]+$"
                        placeholder="Type here"
                        required
                        name="contact"
                        onChange={(e) =>
                          setDetails((prev) => {
                            return { ...prev, ["org_contact"]: e.target.value };
                          })
                        }
                        value={details.org_contact}
                        className="py-1 px-3 border rounded-md  border-[#B9C0CB]"
                      />
                    </div>
                  </div>
                </form>
                <div>
                  {error.length > 0 && (
                    <div className="py-3 text-red-500"> {error}</div>
                  )}
                </div>
              </main>
              <footer>
                <div className="flex justify-end gap-3 py-3 px-4">
                  <button className="py-2.5 px-4 bg-[#F0EBFF] text-[#6834ff] rounded flex justify-center items-center cursor-pointer">
                    Cancel
                  </button>
                  <Button
                    text={isLoading ? <Loading /> : "Add"}
                    type="submit"
                    onClick={() => formRef.current?.requestSubmit()}
                  />
                </div>
              </footer>
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default OrganizationList;
