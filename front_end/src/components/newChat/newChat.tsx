import React,{useState,useEffect} from "react";
import ContactList from "./contactList";
import SearchComponent from "./seacrhContact";
import { getUsers } from "../../api";



interface NewChatProps{
  viewNewContact: boolean;
  setViewNewContact: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserId:React.Dispatch<React.SetStateAction<string>>;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChat:React.FC<NewChatProps>=({viewNewContact,setViewNewContact,setCurrentUserId,setChat})=>{

  const [keyWord, setKeyword] = useState<string>("");
  const [userList, setUserList] = useState<Array<any>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

          const data = await getUsers(keyWord);
          setUserList([...data]);

      } catch (error) {

        setUserList([])
        console.error("Error fetching users:", error);

      }
    };

    fetchData();
  }, [keyWord]);

  return (
    <div className="h-full bg-[#111b21]">
      <div className="w-full flex items-end h-[15%] bg-[#202c33] py-4 px-2">
        <div className="px-3 flex items-center gap-6 w-full">
          <button
            onClick={() => {
              setViewNewContact(!viewNewContact);
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
            <p className="text-lg text-slate-200 font-semibold">Status</p>
          </div>
        </div>
      </div>
      <div className="overflow-y-scroll h-[85%]">
        <div className="card py-4 h-[100px] gap-[5px] text-white  justify-between items-center w-full bg-[#111b21]">
          <SearchComponent keyWord={keyWord} setKeyword={setKeyword} />
        </div>
        <ContactList userList={userList} setChat={setChat} setViewNewContact={setViewNewContact} setCurrentUserId={setCurrentUserId}  />
      </div>
    </div>
  );
}

export default NewChat;
