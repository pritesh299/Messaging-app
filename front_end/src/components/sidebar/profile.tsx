import React from "react";
import { getGlobal } from "../../api";

interface profileProps{
    setViewProfile: React.Dispatch<React.SetStateAction<boolean>>
}

const Profile:React.FC<profileProps>=({setViewProfile})=> {
   
    return (
        <div className="min-w-[300px] w-[60%]  min-h-[400px]  mx-auto  shadow-md  border border-slate-500 text-white">
            <div className="height-[40px] w-full bg-[#202c33] p-4 ">
                <div className="px-3 flex items-center gap-6 w-full">
              <button
            onClick={() => {
                setViewProfile(false)
            }}
          >
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              enableBackground="new 0 0 24 24"
            >
              <title>back</title>
              <path
                fill="#94a3b8"
                d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
              ></path>
            </svg>
                </button>
               <div>
                 <p className="text-lg text-slate-200 font-semibold">Profile</p>
              </div>
             </div> 
            </div>
            <div className="min-h-[360px] w-full   flex flex-col items-center p-4 bg-[#111b21]">

                       <div className="w-full flex-col gap-20 ">
                           <div className=" flex justify-center p-2"> <img src={ getGlobal("")} alt="User Photo" className="w-32 h-32 rounded-full mb-4" ></img></div>
                        <div className="w-full my-2">
                            <p className="text-lg  font-semibold px-2">Name:</p>
                            <span className="bg-[#202c33] block w-full rounded-lg p-2 px-4  font-semibold ">user.name</span>
                        </div>
                        <div className="w-full  my-1 ">
                            <p className="text-lg  font-semibold px-2">Email:</p>
                            <span className="bg-[#202c33] block w-full rounded-lg p-2 px-4 font-semibold ">user.name</span>
                        </div>
                       </div>

                {/* <img src={photo} alt="User Photo" className="w-32 h-32 rounded-full mb-4" />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="mb-4"
                />
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter your name"
                /> */}
            </div>
        </div>
    );
}

export default Profile;
