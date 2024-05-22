import { useState } from 'react'
import RenderCards from "./render_cards"
import SearchComponent from './search'
import ProfileHeadBar from './profile_head_bar'
import ChatHeadBar from "./chat_head_bar"
import CharArea from './chatArea'


function App() {

  return ( 
  <>
   <div className='flex flex-row fixed w-[98vw] justify-center h-[98vh] overflow-hidden' >
     <div className='w-[30%] min-w-[375px] h-[100%]'>
        <ProfileHeadBar  />
        <SearchComponent />
        <RenderCards />  
     </div>
     <div className='w-[70%]  '>
      {/* <div className='h-[100%] w-[100%] bg-[#202c33]'></div> */}
        <ChatHeadBar /> 
        <CharArea />
     </div>
    </div>
   </>
  )
}

export default App
