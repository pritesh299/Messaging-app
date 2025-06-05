// App.js
import React from 'react';
import EmojiPicker from 'emoji-picker-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface emojiTrayProps{
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    setShowEmoji:React.Dispatch<React.SetStateAction<boolean>>
}

const EmojiTray:React.FC<emojiTrayProps> = ({message,setMessage,setShowEmoji}) => {
   


    const emojiPickerFunction = (emojiObject:{emoji:any}) => {
       
        const emoji = emojiObject.emoji
              setMessage(message+emoji)
              setShowEmoji(false)
    };

    return (
        <div className="emoji-app flex flex-col items-center mt-12 z-2 absolute">
           
            <div className="emoji-picker bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg mt-5 p-5">
                <EmojiPicker onEmojiClick={emojiPickerFunction} />
            </div>
            <ToastContainer />
        </div>
    );
};

export default EmojiTray;
