import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button.jsx";
import { Bin, PencilEdit } from "../../public/svgs.jsx";
import Drawer from "@mui/material/Drawer";
import { IoClose } from "react-icons/io5";

const Users = ({ orgDetails }) => {
  const { org_id } = orgDetails;
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [newUser, setNewUser] = useState({ user_name: "", role: "" });

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/${org_id}`);
      const data = await res.json();
      setUsers(data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users.");
    }
  };
  const handleDeleteUser = async (user_id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${org_id}/${user_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.user_id !== user_id));
        setError("");
      } else {
        setError(data.message || "Failed to delete user.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    if (org_id) fetchUsers();
  }, [org_id]);

  const handleAddUser = async () => {
    if (!newUser.user_name || !newUser.role) {
      setError("All fields are required.");
      return;
    }
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${org_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, data[0]]);
        setNewUser({ user_name: "", role: "" });
        setIsOpen(false);
        setError("");
      } else {
        setError(data.message || "Failed to add user.");
      }
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="text-black border mb-10 border-gray-400 rounded-sm">
      <div className="flex justify-between items-center h-14 px-3 py-5">
        <span className="text-[#232323] font-semibold">
          <h4>Users</h4>
        </span>
        <Button text={"+ Add user"} onClick={() => setIsOpen(true)} />
      </div>

      <div className="w-full bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className="h-11">
                <th className="text-center text-sm font-medium text-gray-600">
                  Sr. No
                </th>
                <th className="pl-5 text-left text-sm font-medium text-gray-600">
                  User name
                </th>
                <th className="text-left text-sm font-medium text-gray-600">
                  Role
                </th>
                <th className="pl-3 text-left text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.length > 0 &&
                users.map((user, idx) => (
                  <tr key={user.user_id} className="text-sm">
                    <td className="whitespace-nowrap text-sm text-center">
                      {idx + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="font-medium">{user.user_name}</span>
                    </td>
                    <td className="py-4 whitespace-nowrap text-gray-700">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                        <span className="h-2 w-2 rounded-full bg-green-600"></span>
                        {user.role}
                      </span>
                    </td>
                    <td className="pl-3 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div className="flex gap-4 text-gray-500">
                        <img src={PencilEdit} alt="edit" />
                        <img
                          src={Bin}
                          alt="delete"
                          onClick={() => handleDeleteUser(user.user_id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Drawer */}
        <Drawer open={isOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <div className="w-[600px] h-full flex flex-col gap-3">
            <header className="h-18 flex items-center font-semibold justify-between py-5 px-4 shadow-sm">
              <span>Add User</span>
              <IoClose
                className="h-5 w-5 text-[#97A1B2] cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </header>

            <main className="px-6 border-b border-gray-500 h-full">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
                  <label>Name of the user</label>
                  <input
                    type="text"
                    value={newUser.user_name}
                    onChange={(e) =>
                      setNewUser({ ...newUser, user_name: e.target.value })
                    }
                    placeholder="Text"
                    className="py-1 px-3 border h-11 text-[14px] rounded-md border-[#B9C0CB]"
                  />
                </div>
                <div className="flex flex-col gap-1 text-[#777777] flex-1 text-[12px]">
                  <label>Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value })
                    }
                    className="block w-full h-11 rounded-md border border-[#B9C0CB] py-2 pl-3 pr-10 text-gray-900 sm:text-sm appearance-none cursor-default"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    <option value="admin">Admin</option>
                    <option value="co-ordinator">Co-ordinator</option>
                  </select>
                </div>
                {error && <div className="py-3 text-red-500">{error}</div>}
              </div>
            </main>

            <footer>
              <div className="flex justify-end gap-3 py-3 px-4">
                <button
                  className="py-2.5 px-4 bg-[#F0EBFF] text-[#6834ff] rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <Button text={"Add"} onClick={handleAddUser} />
              </div>
            </footer>
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Users;
