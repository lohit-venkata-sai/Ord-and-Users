import React from 'react'
import { Logo,Bell,HeadSet,Avatar} from "../../public/svgs.jsx"
const Header = () => {
  return (
    <div className="h-18 border px-8 py-4 bg-white flex items-center justify-between shadow-md">
      <span>
        <img src={Logo} alt="Logo" />
      </span>
      <span className="flex items-center gap-[20px]">
        <button>
          <img src={Bell} alt="Notifications" />
        </button>
        <button>
          <img src={HeadSet} alt="Support" />
        </button>
        <button>
          <img src={Avatar} alt="User Avatar" />
        </button>
      </span>
    </div>
  );
}

export default Header
