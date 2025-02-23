import { SearchIcon } from "lucide-react";
import React from "react";

function SearchBox() {
  return (
    <>
      <div className="text-center mb-[24px] mt-[48px]">
        <p className="text-2xl font-bold">ค้นหากองทุน</p>
      </div>
      <div className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="ใส่ชื่อกองทุนที่นี่" />
        <SearchIcon color="gray" />
      </div>

      {/* select boxes */}
      <div className="searchBoxes mt-[24px]">
        <div className="searchBoxes inside1 flex gap-5 w-full">
          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">บริษัทหลักทรัพย์จัดการกองทุน</span>
              </div>
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>
          </div>

          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">ประเภทของกองทุนรวม</span>
              </div>
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>
          </div>
        </div>

        <div className="searchBoxes inside2 flex gap-5 w-full">
          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">ระดับความเสี่ยง</span>
              </div>
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>
          </div>

          <div className="flex basis-1/2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">ลงทุนในต่างประเทศ</span>
              </div>
              <select className="select select-bordered">
                <option disabled selected>
                  Pick one
                </option>
                <option>Star Wars</option>
                <option>Harry Potter</option>
                <option>Lord of the Rings</option>
                <option>Planet of the Apes</option>
                <option>Star Trek</option>
              </select>
            </label>
          </div>
        </div>

        <div className="searchBoxes inside3 flex justify-between gap-5 w-full">
          <div className="flex justify-between basis-1/4">
            {/* checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mx-3">จ่ายปันผล</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mx-3">ไม่จ่ายปันผล</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
          </div>

          {/* button */}
          <div className="flex gap-5 my-[24px]">
            <button className="btn rounded-full px-[24px] btn-lg">
              ค่าเริ่มต้น
            </button>
            <button className="btn btn-active btn-primary rounded-full px-[54px] btn-lg">
              ค้นหา
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBox;
