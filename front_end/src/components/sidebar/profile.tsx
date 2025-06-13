import React, { useState } from "react";
import { getGlobal, setGlobal, updateUser, } from "../../api";

interface ProfileProps {
  setViewProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultAvatars = [
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Alex",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Max",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Zoe",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Riley",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Sam",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Casey",
  "https://api.dicebear.com/8.x/adventurer/svg?seed=Jamie",
];

const Profile: React.FC<ProfileProps> = ({ setViewProfile }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0]);
  const [name, setName] = useState(getGlobal("username") || "");

  const handleSave = async () => {

    let formData = {
      id: getGlobal("id"),
      avatar: selectedAvatar,
      username: name || getGlobal("username") 
    };
    let response = await updateUser(formData);
    if (response.code === 0) {
      setGlobal({
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
        avatar: response.user.avatar,
      });
    } else {
      console.error("Error updating profile:", response.message);
    }
    console.log(response);
    setViewProfile(false);
  };

  return (
    <div className="min-w-[300px] w-[60%] min-h-[400px] mx-auto shadow-md border border-slate-500 text-white">
      <div className="w-full bg-[#202c33] p-4">
        <div className="px-3 flex items-center gap-6 w-full">
          <button onClick={() => setViewProfile(false)}>
            <svg
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
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

      <div className="min-h-[360px] w-full flex flex-col items-center p-4 bg-[#111b21]">
        <div className="w-full flex-col gap-20">

          <div className="w-full my-2">
            <p className="text-lg font-semibold px-2">Name:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#202c33] text-white block w-full rounded-lg p-2 px-4 font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-center p-2">
            <img
              src={selectedAvatar}
              alt="User Avatar"
              className="w-32 h-32 rounded-full mb-4 border-4 border-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-3 justify-center mb-6 py-2">
            {defaultAvatars.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Avatar ${idx + 1}`}
                onClick={() => setSelectedAvatar(url)}
                className={`w-14 h-14 rounded-full cursor-pointer border-2 transition-all ${
                  selectedAvatar === url
                    ? "border-blue-500 scale-110"
                    : "border-transparent"
                }`}
              />
            ))}
          </div>

          <div className="w-full flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
