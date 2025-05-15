import EditPersonal from "./EditPersonal";
import Logout from "../auth/Logout";
import ShowProfile from "./ShowProfile";

function EditProfile() {
  return (
    <>
      <div className="flex flex-col transition-all duration-300 w-screen max-w-5xl">
        <div className="container h-screen p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile</h1>
            <Logout />
          </div>

          <div className="xl:flex block">
            <div role="tablist" className="tabs tabs-bordered tabs-md w-full">
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab !min-w-[150px]"
                aria-label="ข้อมูลส่วนตัว"
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-10 w-full">
                <ShowProfile />
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab !min-w-[150px]"
                aria-label="แก้ไขข้อมูลส่วนตัว"
              />
              <div role="tabpanel" className="tab-content p-10">
                <EditPersonal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
