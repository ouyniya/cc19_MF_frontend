import React, { useState } from "react";
import { Pencil, Mail, UserPen, KeyRound, User2 } from "lucide-react";
import useUserStore from "../../stores/useUserStore";
import { createAlert } from "../../utils/createAlert";

function EditPersonal() {
  const currentUser = useUserStore((state) => state.currentUser);
  const token = useUserStore((state) => state.token);
  const updateUser = useUserStore((state) => state.updateUser);
  const getCurrentUser = useUserStore((state) => state.getCurrentUser);

  const { user } = currentUser || {};
  const [email, setEmail] = useState(user?.email || "");
  const [username, setUsername] = useState(user?.username || "");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(user.profileImage);

  const hdlUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      let body = new FormData();
      if (email) body.append("email", email);
      if (username) body.append("username", username);
      if (file) body.append("profile", file);
      console.log(email, username, file);

      // validate >> if no change
      if (email === user?.email && username === user?.username && !file) {
        createAlert("info", "ไม่มีการเปลี่ยนแปลง");
      } else {
        // update into db
        await updateUser(token, body);
        await getCurrentUser(token);
        createAlert("success", "บันทึกข้อมูลเรียบร้อยแล้ว");
      }
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      console.log(error);
      createAlert("info", errMsg);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFilePreview(URL.createObjectURL(file)); // สร้าง URL พรีวิว
    }
  };

  return (
    <>
      <div className="lg:flex w-full pr-[0px] py-[0px] min-w-[450px] gap-5">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange} // เวลาเพิ่มรูปจะแสดงตัวอย่างทันทีเลย
          className="hidden"
          id="fileInput"
        />
        {/*  edit avatar */}
        <div className="relative flex basis-1/4 justify-center items-start">
          <div className="avatar">
            {/* htmlFor="fileInput" >> label ของ input ข้างบน */}
            <label htmlFor="fileInput" className="cursor-pointer">
              <div className="absolute z-10 bottom-1 right-2 rounded-full bg-secondary px-[8px] py-[2px] flex justify-center items-center hover:ring-2">
                <div className="tooltip" data-tip="แก้ไขรูป Profile">
                  <Pencil className="w-[12px] stroke-white" />
                </div>
              </div>
            </label>
            <div className="w-[150px] rounded-full">
              {filePreview ? (
                <img
                  src={filePreview}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User2 className="mt-[32px] ml-[12px] w-full h-[100px] text-gray-500" />
              )}
            </div>
          </div>
        </div>
        {/*  edit profile */}
        <form className="w-full m-auto" onSubmit={hdlUpdateProfile}>
          <div className="flex flex-col justify-center w-full m-auto mt-[48px]">
            <div className="flex flex-col gap-5">
              <div className="lg:flex justify-around m-auto px-[20px] gap-5 w-full">
                <div className="input input-bordered flex items-center basis-1/2 mb-[18px] lg:mb-[0px]">
                  <Mail />
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="grow ml-3"
                    placeholder={user.email}
                  />
                </div>
                <div className="input input-bordered flex items-center basis-1/2 ">
                  <UserPen />
                  <input
                    type="text"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    className="grow ml-3"
                    placeholder={user.username}
                  />
                </div>
              </div>

              {/* <div className="lg:flex justify-around m-auto px-[20px] gap-5 w-full">
                <div className="input input-bordered flex items-center basis-1/2 mb-[18px] lg:mb-[0px]">
                  <KeyRound />
                  <input
                    type="password"
                    name="password"
                    onChange={hdlChangeProfile}
                    value={input.password}
                    placeholder="Password"
                    className="grow ml-3"
                  />
                </div>
                <div className="input input-bordered flex items-center basis-1/2 ">
                  <KeyRound />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="grow ml-3"
                  />
                </div>
              </div> */}
            </div>

            {/* save button */}
            <div className="flex justify-end mx-[24px] mt-[24px]">
              <button className="btn text-white bg-[var(--blue)] hover:btn-secondary">
                บันทึก
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditPersonal;
