import React, { useEffect } from "react";
import Logout from "../auth/Logout";
import useAdminStore from "../../stores/useAdminStore";
import useUserStore from "../../stores/useUserStore";
import { Edit3Icon, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

function UserManage() {
  const allUsers = useAdminStore((state) => state.allUsers.message);
  const getAllUsers = useAdminStore((state) => state.getAllUsers);
  const updateUser = useAdminStore((state) => state.updateUser);
  const deleteUser = useAdminStore((state) => state.deleteUser);
  const token = useUserStore((state) => state.token);

  useEffect(() => {
    getAllUserFunc();
  }, []);

  const getAllUserFunc = async () => {
    await getAllUsers(token);
  };

  const hdlDelete = async (userId) => {
    try {
      Swal.fire({
        title: "ยืนยันลบผู้ใช้งานใช่ไหม?",
        text: "เมื่อลบแล้วจะไม่สามารถนำกลับมาได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ลบเลย!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteUser(userId, token);
          await getAllUsers(token);
          Swal.fire({
            title: "ลบเรียบร้อยแล้ว!",
            text: "ลบผู้ใช้งานเรียบร้อยแล้ว",
            icon: "success",
          });
        }
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  const hdlUpdateRole = async (userId, username, role) => {
    try {
      Swal.fire({
        title: "ยืนยันเปลี่ยนสิทธิ์ผู้ใช้งาน?",
        text: `แก้ไขสิทธิ์ผู้ใช้ ${username} เป็น ${role === "ADMIN" ? "USER" : "ADMIN"}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
      }).then(async (result) => {
        if (result.isConfirmed) {
            const body = {
                userId,
                role: role === "ADMIN" ? "USER" : "ADMIN"
            }
          await updateUser(token, body);
          await getAllUsers(token);
          Swal.fire({
            title: "เรียบร้อยแล้ว!",
            text: "อัพเดตผู้ใช้งานเรียบร้อยแล้ว",
            icon: "success",
          });
        }
      });
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      createAlert("info", errMsg);
    }
  };

  //   console.log(allUsers);

  return (
    <>
      <div className="flex flex-col p-6 transition-all duration-300 w-[calc(100vw-350px)]">
        <div className="container h-screen">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Logout />
          </div>
          <div className="overflow-x-auto shadow-md sm:rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="border-b-2">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Created At</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((user) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                  >
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="flex gap-2 px-6 py-4">
                      {user.role}
                      <Edit3Icon size="16px" className="opacity-70"
                      onClick={() => hdlUpdateRole(user.id, user.username, user.role)}/>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="flex gap-3 px-6 py-4">
                      <Trash2
                        size="18px"
                        stroke="red"
                        onClick={() => hdlDelete(user.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManage;
