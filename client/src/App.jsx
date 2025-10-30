import React, { useState } from "react";
import Loading from "./components/Loading";
import Headers from "./components/Header.jsx";
import Button from "./components/Button.jsx";
import ManageB2BOrg from "./components/ManageB2BOrg.jsx";
const App = () => {
  const [tab, setTab] = useState(1);
  return (
    <div className="h-screen w-screen text-white flex flex-col gap-2 overflow-x-hidden">
      <header>
        <Headers />
      </header>
      <main>
        <div className=" h-[52px] px-[70px]  py-0.5 text-[#777777] font-semibold shadow-sm flex items-center gap-[32px]">
          <div
            className={`${
              tab === 0 && "border-b-2 border-blue-500 text-[#6834FF] "
            } cursor-pointer py-3.5`}
            onClick={() => setTab(0)}
          >
            Dashboard
          </div>
          <div
            className={`${
              tab === 1 && "border-b-2 border-blue-500 text-[#6834FF]"
            } cursor-pointer py-3.5`}
            onClick={() => setTab(1)}
          >
            Manage B2B organizations
          </div>
        </div>
      </main>
      <div className="h-full ">
        {tab === 0 ? <Loading /> : <ManageB2BOrg />}
      </div>
    </div>
  );
};

export default App;
