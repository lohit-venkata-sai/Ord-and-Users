import { CiMail } from "react-icons/ci";
import Envelope from "../assets/envelope.svg"
import Phone from "../assets/phone.svg"
import World from "../assets/world.svg"
export default function OrganizationCard({
        orgName,
            imgUrl = "https://upload.wikimedia.org/wikipedia/en/4/44/MIT_Seal.svg",
          mail,
          contact,
          url,status}) {
  return (
    <div className="flex rounded-md justify-between p-5 bg-white shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <img
          src={imgUrl}
          alt="Logo"
          className="w-32 h-32 rounded-md object-cover border"
        />

        {/* Info */}
        <div>
          <h2 className="text-lg text-[#232323] font-semibold">{orgName}</h2>

          <div className="mt-1 flex flex-col gap-1 text-sm text-[#777777]">
            <div className="flex items-center gap-2">
              <img src={Envelope} alt="Envelope" />
              <span>{mail}</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={Phone} alt="" />
              <span>{contact}</span>
            </div>
            <div className="flex items-center gap-2">
              <img src={World} alt="" />
              <span>{url}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className=" ">
        <div className="flex items-center  justify-center gap-2">
          <div className="flex items-center gap-2.5 px-2 py-1 rounded-full cursor-pointer">
            {/* <span className="w-2 h-2 bg-[#12BB23] rounded-full"></span>
            <span className="text-xs text-[#12BB23] font-medium">Active</span> */}

            {status === "active" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F8E9] px-3 py-1 text-sm font-medium text-[#12BB23]">
                <span className="h-2 w-2 rounded-full bg-[#12BB23]"></span>
                Active
              </span>
            )}
            {status === "inactive" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F6F7] px-3 py-1 text-sm font-medium text-[#777777]">
                <span className="h-2 w-2 rounded-full bg-[#97A1B2]"></span>
                Inactive
              </span>
            )}
            {status === "blocked" && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDEAEA] px-3 py-1 text-sm font-medium text-[#E92B2B]">
                <span className="h-2 w-2 rounded-full bg-[#E92B2B]"></span>
                Blocked
              </span>
            )}
          </div>
          <button className="mt-2 text-xs text-[#6834FF] cursor-pointer">
            Change status
          </button>
        </div>
      </div>
    </div>
  );
}
