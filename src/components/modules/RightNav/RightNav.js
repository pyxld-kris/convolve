import React from "react";

//import GlobalModal from "../../components/modules/GlobalModal";

import { openGlobalModal } from "../../../components/modules/GlobalModal/GlobalModal";
import ChatArea from "../ChatArea";

export default function RightNav({
  chats,
  setChats,
  currentChat,
  setCurrentChat,
  textLines,
  setTextLines,
}) {
  return (
    <div
      className="rightNav"
      style={{
        width: "18.5%",
        height: "100%",
        backgroundColor: "#aaaaaa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          color: "black",
          margin: "1rem",
          fontSize: "1rem",
          lineHeight: "1.2rem",
        }}
      >
        Participants in this conversation:
      </div>
      <div
        style={{
          fontSize: ".8rem",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Add Participant:
        <input
          style={{
            width: "90%",
          }}
          onKeyDown={(event) => {
            // Detect enter keypress
            const key = event.key;
            if (key === "Enter") {
              let participantName = event.target.value;
              let tempTextLines = [...textLines];
              tempTextLines.push(participantName + ": Hi!");
              setTextLines(tempTextLines);
              event.target.value = "";

              // Is this a brand new chatter? Their configs need to be added to our chat data structure
              if (!currentChat.bots[participantName]) {
                let tempCurrentChat = { ...currentChat };
                tempCurrentChat.bots[participantName] = {
                  temperature: 0.8,
                  maxTokensPerMessage: 30,
                  listensTo: ["*"],
                  respondsTo: [],
                };
                setCurrentChat(tempCurrentChat);
              }
            }
          }}
        />
      </div>
      {getAllChatParticipants(textLines).map((botName) => {
        return (
          <BotSidebarEntry
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            botName={botName}
            chats={chats}
            setChats={setChats}
          />
        );
      })}
    </div>
  );
}

function BotSidebarEntry({ currentChat, setCurrentChat, botName, chats, setChats }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#dddddd",
        margin: ".5rem",
        padding: ".2rem",
        lineHeight: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#dddddd",
          margin: ".1rem",
        }}
      >
        <div
          title={botName}
          onClick={() => {
            openGlobalModal(
              <div>
		<div style={{width: "100%", color: "red", fontSize: "1rem", textAlign: "center"}}>Have a short chat with this agent to help determine its future behavior. This text is injected into the context of every new message this bot generates.</div>
                <ChatArea
                  chatName={botName + " Private Chat"}
                  currentChat={{
                    name: botName + " Chat",
                    chatHistory: currentChat.bots[botName].initialConversation
                      ? currentChat.bots[botName].initialConversation
                      : [
                          botName + ": Hi!",
                          "me: Please tell me about yourself. This includes your backstory, as well as your motivations and goals",
                        ],
                    bots: currentChat.bots,
                  }}
                  setCurrentChat={(botChat) => {
                    let tempCurrentChat = { ...currentChat };
                    tempCurrentChat.bots[botName].initialConversation =
                      botChat.chatHistory;
                    setCurrentChat(tempCurrentChat);
                  }}
                />
              </div>
            );
          }}
          style={{
            width: "4rem",
            height: "4rem",
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
          {botName.split(" ").reduce((acc, cur) => acc + cur.charAt(0), "")}
        </div>
        <div
          style={{
            width: "60%",
            color: "black",
            fontSize: "1rem",
            lineHeight: "1.3rem",
          }}
        >
          {botName}
        </div>
      </div>
      {isExpanded ? (
        <div>
          <div style={{ fontSize: ".8rem", color: "black" }}>
            🌡️Temperature:
            <input
              style={{
                width: "90%",
              }}
              value={currentChat.bots[botName]?.temperature}
              onChange={(event) => {
                if (currentChat.bots[botName]) {
                  let tempChats = structuredClone(chats);
                  currentChat.bots[botName].temperature = event.target.value;
                  if (parseFloat(event.target.value) > 0)
                    currentChat.bots[botName].temperature = parseFloat(
                      event.target.value
                    );
                  setChats(tempChats);
                }
              }}
            />
          </div>
          <div style={{ fontSize: ".8rem", color: "black" }}>
            🔢Num Characters To Generate:
            <input
              style={{
                width: "90%",
              }}
              value={currentChat.bots[botName]?.maxTokensPerMessage}
              onChange={(event) => {
                if (currentChat.bots[botName]) {
                  let tempChats = structuredClone(chats);
                  currentChat.bots[botName].maxTokensPerMessage = parseInt(
                    event.target.value
                  );
                  setChats(tempChats);
                }
              }}
            />
          </div>
          <div style={{ fontSize: ".8rem", color: "black" }}>
            👂Listens to:
            <input
              style={{
                width: "90%",
              }}
              value={currentChat.bots[botName]?.listensTo}
              onChange={(event) => {
                if (currentChat.bots[botName]) {
                  let tempChats = structuredClone(chats);
                  currentChat.bots[botName].listensTo =
                    event.target.value.split(",");
                  setChats(tempChats);
                }
              }}
            />
          </div>
          <div style={{ fontSize: ".8rem", color: "black" }}>
            👄Responds to:
            <input
              style={{
                width: "90%",
              }}
              value={currentChat.bots[botName]?.respondsTo}
              onChange={(event) => {
                if (currentChat.bots[botName]) {
                  let tempChats = structuredClone(chats);
                  currentChat.bots[botName].respondsTo =
                    event.target.value.split(",");
                  setChats(tempChats);
                }
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              textAlign: "center",
              color: "blue",
              cursor: "pointer",
              fontSize: "1rem",
              marginTop: ".5rem",
              backgroundColor: "#bbbbbb",
            }}
            onClick={() => {
              setIsExpanded(false);
            }}
          >
            ^
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            textAlign: "center",
            color: "blue",
            cursor: "pointer",
            fontSize: "1rem",
            marginTop: ".5rem",
            backgroundColor: "#bbbbbb",
          }}
          onClick={() => {
            setIsExpanded(true);
          }}
        >
          v
        </div>
      )}
    </div>
  );
}

///////////

const getAllChatParticipants = (textLines) => {
  return textLines?.reduce((acc, cur, index) => {
    let messageParts = cur.split(":");
    if (messageParts.length > 1) {
      let chatterName = messageParts[0];
      if (acc.indexOf(chatterName) == -1) {
        acc.push(chatterName);
      }
    }
    return acc;
  }, []);
};
