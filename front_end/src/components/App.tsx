import { useState } from 'react'
import RenderCards from "./sidebar/chatList"
import SearchComponent from './sidebar/searchBar'
import ProfileHeadBar from './sidebar/userProfile'
import ChatWindow from './chatWindow/chatWindow'
import Status from "./status/status"
import NewChat from "./newChat/newChat"


function App() {
   let [viewStatus,setViewStatus]=useState(false)
   let [viewNewContact,setViewNewContact]=useState(false)

  return ( 
  <>
   <div className='flex flex-row fixed w-[98vw] justify-center h-[98vh] overflow-hidden' >
     <div className='w-[30%] min-w-[375px] h-[100%] relative '>
      {viewStatus
      ?<Status   viewStatus={viewStatus} setViewStatus={setViewStatus}/>
      :viewNewContact
      ?<NewChat viewNewContact={viewNewContact} setViewNewContact={setViewNewContact}/>
      :<>         
         <ProfileHeadBar viewStatus={viewStatus} setViewStatus={setViewStatus} viewNewContact={viewNewContact} setViewNewContact={setViewNewContact}/>
         <SearchComponent />
         <RenderCards /> 
         </>
     }
     </div>
     <div className='w-[70%]'>
        <ChatWindow />
     </div>
    </div>
   </>
  )
}

export default App
