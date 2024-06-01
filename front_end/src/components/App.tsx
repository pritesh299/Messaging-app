import { useEffect, useState } from 'react';
import Sidebar from './sidebar/sidebar';
import ChatWindow from './chatWindow/chatWindow';
import NewChat from './newChat/newChat';
import LoginPage from './login';

let _obj:any={}


export const setGlobal = (obj:any) => {
    Object.assign(_obj, obj)
}

export const getGlobal = (varName:any) => {
    if(_obj[varName] !== undefined){
       return _obj[varName]
    }
    else {
       return null
    }
 }

 setGlobal( {
    id:"6656cc14ce2308b03287ca0b",
    username: 'Alberta_Sipes',
    email: 'Arno29@yahoo.com',
    password: 'XGPB9_39vx0LbZn',
    avatar: 'https://avatars.githubusercontent.com/u/30393004' 
  })

function App() {
    const [viewNewContact, setViewNewContact] = useState(false);
    const [login, setLogin] = useState(true)
    const [currentUserId,setCurrentUserId]=useState("6656cc1ece2308b03287ca1f")



    return (
        <>
            {login ? (
                <div className='flex flex-row fixed w-[98vw] justify-center h-[98vh] overflow-hidden'>
                    <div className='w-[30%] min-w-[375px] h-[100%] relative'>
                        {viewNewContact ? (
                            <NewChat viewNewContact={viewNewContact} setViewNewContact={setViewNewContact}  setCurrentUserId={setCurrentUserId} />
                        ) : (
                            <>
                                <Sidebar
                                    viewNewContact={viewNewContact}
                                    setViewNewContact={setViewNewContact}
                                    setCurrentUserId={setCurrentUserId}
                                />
                            </>
                        )}
                    </div>
                    <div className='w-[70%]'>

                        <ChatWindow currentUserId={currentUserId} />
                    </div>
                </div>
            ) : (
                <>
                    <LoginPage />
                </>
            )}
        </>
    );
}

export default App;
