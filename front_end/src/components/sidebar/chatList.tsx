import React from "react";
import Card from "./card";

function RenderCards() {
  let dummyUsers = [
    {
      name: "Alice Johnson",
      lastMessage: "Hey, are you coming to the party?",
      Time: "03:15 PM",
    },
    {
      name: "Bob Smith",
      lastMessage: "Don't forget the meeting tomorrow.",
      Time: "02:45 PM",
    },
    {
      name: "Alice Johnson",
      lastMessage: "Hey, are you coming to the party?",
      Time: "03:15 PM",
    },
    {
      name: "Bob Smith",
      lastMessage: "Don't forget the meeting tomorrow.",
      Time: "02:45 PM",
    },
    {
      name: "Charlie Brown",
      lastMessage: "I'll send the report by evening.",
      Time: "01:30 PM",
    },
    {
      name: "David Wilson",
      lastMessage: "Let's catch up over the weekend.",
      Time: "12:00 PM",
    },
    {
      name: "Ella Roberts",
      lastMessage: "Can you review the document?",
      Time: "11:15 AM",
    },
    {
      name: "Alice Johnson",
      lastMessage: "Hey, are you coming to the party?",
      Time: "03:15 PM",
    },
    {
      name: "Bob Smith",
      lastMessage: "Don't forget the meeting tomorrow.",
      Time: "02:45 PM",
    },
    {
      name: "Charlie Brown",
      lastMessage: "I'll send the report by evening.",
      Time: "01:30 PM",
    },
    {
      name: "David Wilson",
      lastMessage: "Let's catch up over the weekend.",
      Time: "12:00 PM",
    },
    {
      name: "David Wilson",
      lastMessage: "Let's catch up over the weekend.",
      Time: "12:00 PM",
    },
    {
      name: "David Wilson",
      lastMessage: "Let's catch up over the weekend.",
      Time: "12:00 PM",
    },
  ];

  return (
    
    <div className="overflow-y-scroll  w-[100%]  h-[77.5%] bg-[#111b21] shadow-lg p-1">
      {dummyUsers.map((user, index) => (
        <Card
          key={index}
          name={user.name}
          lastMessage={user.lastMessage}
          time={user.Time}
        />
      ))}
    </div>
  );
}

export default RenderCards;
