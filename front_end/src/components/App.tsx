import { useState, useEffect } from 'react';
import Sidebar from './sidebar/sidebar';
import ChatWindow from './chatWindow/chatWindow';
import Status from './status/status';
import NewChat from './newChat/newChat';
import LoginPage from './login';
import axios from 'axios';
import test from '../api';

function App() {
    let [viewStatus, setViewStatus] = useState(false);
    let [viewNewContact, setViewNewContact] = useState(false);
    let [login, setLogin] = useState(true);

    const [data, setData] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://localhost:3000/');
                setData(response.data.message);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    test()
      
    return (
        <>
            {login ? (
                <div className='flex flex-row fixed w-[98vw] justify-center h-[98vh] overflow-hidden'>
                    <div className='w-[30%] min-w-[375px] h-[100%] relative'>
                        {viewStatus ? (
                            <Status viewStatus={viewStatus} setViewStatus={setViewStatus} />
                        ) : viewNewContact ? (
                            <NewChat viewNewContact={viewNewContact} setViewNewContact={setViewNewContact} />
                        ) : (
                            <>
                                <Sidebar
                                    viewStatus={viewStatus}
                                    setViewStatus={setViewStatus}
                                    viewNewContact={viewNewContact}
                                    setViewNewContact={setViewNewContact}
                                />
                            </>
                        )}
                    </div>
                    <div className='w-[70%]'>
                        <ChatWindow />
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
