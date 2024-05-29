import { useEffect, useState } from 'react';
import Sidebar from './sidebar/sidebar';
import ChatWindow from './chatWindow/chatWindow';
import NewChat from './newChat/newChat';
import LoginPage from './login';

function App() {
    const [viewNewContact, setViewNewContact] = useState(false);
    const [login, setLogin] = useState(true)
    const [currentUserId,setCurrentUserId]=useState("")

    useEffect(()=>{
        console.log(currentUserId)
    },[currentUserId])

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
