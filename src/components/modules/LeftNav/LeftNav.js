import React from "react";

//import GlobalModal from "../../components/modules/GlobalModal";

export default function LeftNav({
  chats,
  setChats,
  currentChat,
  setCurrentChat,
  textLines,
  setTextLines,
}) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { moduleName } = useParams();
  //const [moduleData, setModuleData] = React.useState({});

  return (
    <div
      className="LeftNav"
      style={{
        width: "7.5%",
        height: "100%",
        backgroundColor: "#aaaaaa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
	alignItems: "center",
        overflowX: "hidden",
        overflowY: "scroll",
        fontSize: "1.2rem",
      }}
    >
      {Object.keys(chats)?.map((chatName) => {
        return (
          <div
            title={chatName}
            onClick={() => {
              // setActiveBot(
              //   new ChatConfig(
              //     chatName,
              //     chats[chatName].chatHistory,
              //     [], //chats[chatName].listensTo,
              //     [] //chats[chatName].respondsTo
              //   )
              // );
              setCurrentChat(chats[chatName]);
              setTextLines(chats[chatName].chatHistory);
            }}
            style={{
              width: "3.5rem",
              height: "3.5rem",
              paddingTop: "1rem",
              paddingBottom: "1rem",
              backgroundColor: "#444444",
              margin: ".5rem",
              textAlign: "center",
              borderRadius: "100000px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {chatName.split(" ").reduce((acc, cur) => acc + cur.charAt(0), "")}
          </div>
        );
      })}
      <div
        style={{
          width: "5rem",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{ borderRadius: "500px" }}
          onClick={() => {
            let chatName = prompt("What would you like to name your chat?");
            let tempChats = { ...chats };
            tempChats[chatName] = {
              chatHistory: [
                "People Finder Bot: I am here to find the correct people you need to help you solve your problem. Please state your problem.",
              ],
              bots: {
                "People Finder Bot": {
                  temperature: 0.8,
                  maxTokensPerMessage: 50,
                  listensTo: ["me"],
                  respondsTo: ["me"],
                  initialConversation: [
                    "People Finder Bot: I am here to find the correct people you need to help you solve your problem. Please state your problem.",
                    "me: I need help planning for a restaurant opening. It is upscale with a celebrity clientele ",
                    "People Finder Bot: To tackle that problem you will need the following roles - Chef, Business Manager, Interior Designer, Food Supplier, Staff Manager, Restaurant Guru",
                    "me: I'd like to know how to grow pumpkins",
                    "People Finder Bot: To tackle that problem you will need the following roles -  Vegetable  Gardener, Hydroponic Technologist, Price Estimator",
                    "me: What's wrong with my eye? It hurts",
                    "People Finder Bot:  To tackle that problem you will need the following roles -  Ophthalmologist, Vision Specialist, Eye Specialist, Eye Doctor",
                    "me: Hey there. I'd like to begin writing a fantasy novel and I need some ideas",
                    "People Finder Bot: To tackle that problem you will need the following roles - Creative Writer, Fantasy Writer, Novelist, Writer",
                    "me: Hey there. I'm looking to create a Discord to help singles find love",
                    "People Finder Bot: To tackle that problem you will need the following roles - Psychologist, Relationship Coach, Matchmaker, Love Psychic, Community Manager",
                  ],
                },
              },
            };
            setChats(tempChats);
            setCurrentChat(tempChats[chatName]);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
