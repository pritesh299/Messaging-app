import React from "react";

interface profileProps {
  setViewProfileImages: React.Dispatch<React.SetStateAction<boolean>>;
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

const ChangeProfileImage: React.FC<profileProps> = ({
  setViewProfileImages,
  imgSrc,
  setImgSrc,
}) => {
    let imagesURLs = [
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=John&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Jane&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Alice&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Bob&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Charlie&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=David&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Eve&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Frank&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Grace&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Hank&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Ivy&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Jack&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Kathy&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Leo&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Mia&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Noah&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Olivia&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Paul&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Quinn&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Rita&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Sam&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Tom&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Uma&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Vera&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Will&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Xena&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Yara&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Zane&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Alex&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Jamie&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Jordan&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Casey&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Taylor&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Robin&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Skyler&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Alexis&radius=50&backgroundColor=b6e3f4,c0aede,ffd5dc,ffdfbf,d1d4f9",
];


  return (
    <div className="w-full max-w-md p-4 space-y-6 bg-[#202c33] rounded-lg shadow-lg">
      <div className="flex gap-4 p-4 bg-[#202c33]">
        <button
          onClick={() => setViewProfileImages(false)}
          className="text-gray-300 hover:text-white transition duration-200"
          title="Go Back"
        >
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            className="fill-current"
          >
            <path
              fill="#94a3b8"
              d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
            ></path>
          </svg>
        </button>
        <h2 className="text-lg text-slate-200 font-semibold">
          Select Profile Image
        </h2>
      </div>

      {/* Profile image preview */}
      <div className="flex justify-center p-4">
        <div className="w-36 h-36 flex justify-center items-center bg-[#111b21] rounded-full border-4 border-blue-500 shadow-lg">
          <img
            src={imgSrc}
            alt="profile image"
            className="rounded-full object-cover object-center w-full h-full"
          />
        </div>
      </div>

      {/* Image selection grid */}
      <div className="grid grid-cols-3 gap-4 mt-4 overflow-y-auto max-h-[35vh] w-full bg-[#111b21] p-4 rounded-lg">
        {imagesURLs.map((url, index) => (
          <div
            key={index}
            className="w-[12vh] h-[12vh] flex justify-center items-center relative"
            onClick={() => setImgSrc(url)}
          >
            <img
              src={url}
              alt={`Profile ${index + 1}`}
              className="w-full h-full rounded-full object-cover transition-all duration-200 hover:scale-105 cursor-pointer"
            />
            {/* Highlight selected image */}
            {url === imgSrc && (
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full"></div>
            )}
          </div>
        ))}
      </div>

      {/* Done Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setViewProfileImages(false)} // Close the modal when done
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default ChangeProfileImage;
