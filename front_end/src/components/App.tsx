import { useState } from 'react'
import RenderCards from "./sidebar/chatList"
import SearchComponent from './sidebar/searchBar'
import ProfileHeadBar from './sidebar/userProfile'
import ChatWindow from './chatWindow/chatWindow'


function App() {

  return ( 
  <>
   <div className='flex flex-row fixed w-[98vw] justify-center h-[98vh] overflow-hidden' >
     <div className='w-[30%] min-w-[375px] h-[100%]'>
        <ProfileHeadBar  />
        <SearchComponent />
        <RenderCards />  
     </div>
     <div className='w-[70%]'>
        <ChatWindow />
     </div>
    </div>
   </>
  )
}

export default App
