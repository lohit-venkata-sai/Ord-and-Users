import React, { useEffect, useState } from "react";
import Pencil from "../assets/pencil.svg";
import Button from "../components/Button.jsx";

const BasicDetails = ({ orgDetails }) => {
  const [mode, setMode] = useState(true);

  const [options, setOptions] = useState({
    timeZone: [],
    region: [],
    language: [],
    maxCoordinators: [],
    status: [],
  });

  const [details, setDetails] = useState({
    orgName: orgDetails?.org_name || "",
    orgSlug: orgDetails?.org_slug || "",
    primaryAdminName: orgDetails?.primary_admin_name || "",
    primaryAdminMail: orgDetails?.primary_admin_mailid || "",
    supportEmail: orgDetails?.support_email || "",
    phone: orgDetails?.phone_no || "",
    altPhone: orgDetails?.alt_phone_no || "",
    maxCoordinators: orgDetails?.max_active_coordinators_allowed || "",
    timeZone: orgDetails?.timeZone_common_name || "",
    region: orgDetails?.region || "",
    language: orgDetails?.language || "",
    website: orgDetails?.website_url || "",
  });

  const fetchOptions = async () => {
    try {
      const [tzRes, regionRes, langRes, coordRes, statusRes] =
        await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/org/time-zone-enum`),
          fetch(`${import.meta.env.VITE_API_URL}/org/region-enum`),
          fetch(`${import.meta.env.VITE_API_URL}/org/language-enum`),
          fetch(`${import.meta.env.VITE_API_URL}/org/max-active-coordinators-enum`),
          fetch(`${import.meta.env.VITE_API_URL}/org/status-enum`),
        ]);

      const [tzData, regionData, langData, coordData, statusData] =
        await Promise.all([
          tzRes.json(),
          regionRes.json(),
          langRes.json(),
          coordRes.json(),
          statusRes.json(),
        ]);

      setOptions({
        timeZone: tzData.timeZoneEnum || [],
        region: regionData.regionEnum || [],
        language: langData.languageEnum || [],
        maxCoordinators: coordData.maxActiveCoordinatorsEnum || [],
        status: statusData.statusEnum || [],
      });
    } catch (err) {
      console.error("Error fetching dropdown options:", err);
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div>
      <div className="border shadow-md flex flex-col p-5 gap-5 rounded-md">
        {/* Header */}
        <div className="flex gap-3 items-center py-2 justify-between">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[20px]">
            <h3>Profile</h3>
          </div>
          <section className="flex justify-center self-end items-center gap-1">
            <span className="hover:bg-[#e9e3fd] bg-[#f0ebff] rounded cursor-pointer">
              <button
                onClick={() => setMode((prev) => !prev)}
                className="p-4 text-white rounded flex justify-center items-center cursor-pointer"
              >
                <img src={Pencil} alt="" />
              </button>
            </span>
            {!mode && <Button text={"save changes >"} />}
          </section>
        </div>
        <hr />

        {/* Organization Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[18px]">
            <h3>Organization details</h3>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Organization name</label>
              <input
                type="text"
                value={details.orgName}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, orgName: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Organization SLUG</label>
              <input
                type="text"
                value={details.orgSlug}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, orgSlug: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[18px]">
            <h3>Contact details</h3>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Primary Admin name</label>
              <input
                type="text"
                value={details.primaryAdminName}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, primaryAdminName: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Primary Admin Mail-id</label>
              <input
                type="email"
                value={details.primaryAdminMail}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, primaryAdminMail: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Support Email ID</label>
              <input
                type="email"
                value={details.supportEmail}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, supportEmail: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Phone no</label>
              <input
                type="text"
                value={details.phone}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, phone: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Alternative phone no</label>
              <input
                type="text"
                value={details.altPhone}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, altPhone: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Max Coordinators */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[18px]">
            <h3>Maximum Allowed Coordinators</h3>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Max active Coordinators allowed</label>
              <select
                disabled={mode}
                value={details.maxCoordinators}
                onChange={(e) =>
                  setDetails({ ...details, maxCoordinators: e.target.value })
                }
                className="block w-full h-11 rounded-md text-3.5 border border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed py-2 pl-3 pr-10 text-gray-900 sm:text-sm appearance-none cursor-default"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.maxCoordinators.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Timezone & Region */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[18px]">
            <h3>Timezone & Region</h3>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Common name</label>
              <select
                disabled={mode}
                value={details.timeZone}
                onChange={(e) =>
                  setDetails({ ...details, timeZone: e.target.value })
                }
                className="block w-full h-11 rounded-md text-3.5 border border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed py-2 pl-3 pr-10 text-gray-900 sm:text-sm appearance-none cursor-default"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.timeZone.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <label>Region</label>
              <select
                disabled={mode}
                value={details.region}
                onChange={(e) =>
                  setDetails({ ...details, region: e.target.value })
                }
                className="block w-full h-11 rounded-md text-3.5 border border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed py-2 pl-3 pr-10 text-gray-900 sm:text-sm appearance-none cursor-default"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.region.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[18px]">
            <h3>Language</h3>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <select
                disabled={mode}
                value={details.language}
                onChange={(e) =>
                  setDetails({ ...details, language: e.target.value })
                }
                className="block w-full h-11 rounded-md text-3.5 border border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed py-2 pl-3 pr-10 text-gray-900 sm:text-sm appearance-none cursor-default"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.language.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Website */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center font-semibold gap-3 text-[#232323] text-[18px]">
            <h3>Official website URL</h3>
          </div>
          <div className="flex justify-between h-16 gap-3">
            <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
              <input
                type="text"
                value={details.website}
                disabled={mode}
                onChange={(e) =>
                  setDetails({ ...details, website: e.target.value })
                }
                className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB] disabled:bg-[#F5F6F7] disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
