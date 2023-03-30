import React from "react";

import GPTUtil from "../../utils/GPTUtil";

import ChatArea from "../../components/modules/ChatArea";
import Clipboard from "../../components/modules/Clipboard";
import LeftNav from "../../components/modules/LeftNav";
import RightNav from "../../components/modules/RightNav";

import { botConfigs, chatConfigs } from "../../content/configs";

//import GlobalModal from "../../components/modules/GlobalModal";

export default function PromptEditingPage(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { moduleName } = useParams();
  //const [moduleData, setModuleData] = React.useState({});

  const INITIAL_CHAT = "Training Chat 1";
  const [chats, setChats] = React.useState(chatConfigs);
  const [currentChat, setCurrentChat] = React.useState(chats[INITIAL_CHAT]);


  const [queuedChatters, setQueuedChatters] = React.useState([]);
  React.useEffect(() => {
    if (!queuedChatters.length) return;
    queuedChatters.forEach((queuedName) => {
      generatePossibleChatMessages(textLines, queuedName);
    });
    setQueuedChatters([]);
  }, [queuedChatters]);
  const addChatterToQueue = (chatterName) => {
    setQueuedChatters([chatterName]);
  };

  const [textLines, setTextLines] = React.useState(
    structuredClone(chats[INITIAL_CHAT].chatHistory)
  );
  const [activelyTypingUsers, setActivelyTypingUsers] = React.useState([]);
  const addActiveTyper = (name) => {
    let tempTypers = structuredClone(activelyTypingUsers);
    if (tempTypers.indexOf(name) == -1) {
      tempTypers.push(name);
      setActivelyTypingUsers(tempTypers);
    }
  };
  const removeActiveTyper = (name) => {
    let tempTypers = structuredClone(activelyTypingUsers);
    let index = tempTypers.indexOf(name);
    if (index != -1) {
      tempTypers.splice(index, 1);
      setActivelyTypingUsers(tempTypers);
    }
  };

  const [possibleTextLines, setPossibleTextLines] = React.useState([]);

  const generatePossibleChatMessages = async (conversation, chatterName) => {
    let chatter = currentChat.bots[chatterName];
    let listenedToMessages = conversation;
    if (chatter) {
      listenedToMessages = conversation.reduce(
        (accumulatedMessages, currentMessage, index) => {
          let checkingChatter = currentMessage.split(":")[0];
          if (
            chatter.listensTo.indexOf("*") != -1 ||
            chatter.listensTo.indexOf(checkingChatter) != -1 ||
            checkingChatter == chatterName
          ) {
            accumulatedMessages.push(currentMessage);
            return accumulatedMessages;
          }
          return accumulatedMessages;
        },
        []
      );
      let chatterHistory = currentChat.bots[chatterName]?.initialConversation
        ? currentChat.bots[chatterName].initialConversation
        : [];
      if (!chatterHistory) chatterHistory = [];

      let chatterHistoryStringLength = chatterHistory.join("\n").length;
      listenedToMessages = listenedToMessages
        .join("\n")
        .substring(
          listenedToMessages.join("\n").length -
            (3600 - chatterHistoryStringLength),
          listenedToMessages.join("\n").length
        )
        .split("\n");

      listenedToMessages = [
        ...chatterHistory,
        ...["\n", "\n", "---", "\n", "\n"],
        ...listenedToMessages,
      ];
    }
    console.log(listenedToMessages);

    addActiveTyper(chatterName);
    let fullText = [...listenedToMessages, chatterName + ": "].join("\n");
    let results = await Promise.all([
      GPTUtil.bloomQuery({
        text: fullText.substring(fullText.length - 3700, fullText.length),
        length: chatter ? chatter.maxTokensPerMessage : 30,
        topP: chatter ? chatter.temperature : 0.3 * 1,
        batchSize: 1,
      }),
      GPTUtil.bloomQuery({
        text: fullText.substring(fullText.length - 3700, fullText.length),
        length: chatter ? chatter.maxTokensPerMessage : 30,
        topP: chatter ? chatter.temperature : 0.3 * 1,
        batchSize: 1,
      }),
      GPTUtil.bloomQuery({
        text: fullText.substring(fullText.length - 3700, fullText.length),
        length: chatter ? chatter.maxTokensPerMessage : 30,
        topP: chatter ? chatter.temperature : 0.3 * 1,
        batchSize: 1,
      }),
    ]);

    let tempPossibleTextLines = [...possibleTextLines];
    tempPossibleTextLines.push(
      ...results.map((result) => chatterName + ": " + result.split("\n")[0])
    );
    setPossibleTextLines(tempPossibleTextLines);
  };

  // When a new textLine is added, remove the chatter from the currently active list of typers
  React.useEffect(() => {
    if (possibleTextLines.length) {
      let chatterName = possibleTextLines[0].split(":")[0];
      removeActiveTyper(chatterName);

      // Also output it to the console for easy saving, for now
      console.log(JSON.stringify(textLines));
    }
  }, [possibleTextLines]);

  React.useEffect(() => {
    // output it to the console for easy saving, for now
    let tempCurrentChat = { ...currentChat };
    tempCurrentChat.chatHistory = textLines;
    setCurrentChat(tempCurrentChat);
  }, [textLines]);

  React.useEffect(() => {
    // output it to the console for easy saving, for now
    console.log(JSON.stringify(currentChat));
  }, [currentChat]);

  return (
    <div
      className="Page"
      style={{
        width: "100%",
        height: "92vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "space-around",
      }}
    >
      <Clipboard />

      <LeftNav
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        textLines={textLines}
        setTextLines={setTextLines}
      />

      <ChatArea
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        textLines={textLines}
        setTextLines={setTextLines}
      />

      <RightNav
        chats={chats}
        setChats={setChats}
        currentChat={currentChat}
        setCurrentChat={setCurrentChat}
        textLines={textLines}
        setTextLines={setTextLines}
      />
    </div>
  );
}

function EditableDiv(props) {
  const [text, setText] = React.useState(props.text);
  const [beingEdited, setBeingEdited] = React.useState(false);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "2.2rem",
        margin: ".1rem",
        backgroundColor: text?.indexOf("me: ") === 0 ? "#f1f1f1" : "#ffffff",
      }}
    >
      {!beingEdited ? (
        <div
          onClick={() => {
            console.log(text);
            setBeingEdited(true);
            let tempText = text.replaceAll("<br>", "\n");
            setText(tempText);
          }}
          style={{ width: "100%", padding: ".3rem" }}
          dangerouslySetInnerHTML={{ __html: addChatterUnderlineHTML(text) }}
        ></div>
      ) : (
        <EditableDivTextarea
          {...props}
          text={text}
          setText={setText}
          setBeingEdited={setBeingEdited}
        />
      )}
    </div>
  );
}

function EditableDivTextarea(props) {
  const textareaRef = React.useRef();

  React.useEffect(() => {
    let element = textareaRef.current;
    element.style.height = "inherit";
    element.style.height = `${
      element.scrollHeight > 40 ? element.scrollHeight : 35
    }px`;
    element.focus();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      style={{
        width: "100%",
        height: "2rem",
        minHeight: "1rem",
        lineHeight: "2rem",
      }}
      value={props.text}
      onChange={(event) => {
        props.setText(event.target.value);
      }}
      onKeyUp={(e) => {
        e.target.style.height = "inherit";
        e.target.style.height = `${
          e.target.scrollHeight > 40 ? e.target.scrollHeight : 35
        }px`;
      }}
      onBlur={(event) => {
        console.log(event);
        let text = props.text;
        text = text.replaceAll("\n", "<br>");
        props.setText(text);
        props.updateLineText(props.lineNumber, text);
        props.setBeingEdited(false);
      }}
    ></textarea>
  );
}

//////////

const addChatterUnderlineHTML = (messageText) => {
  if (messageText.substring(0, 2) == "<u>") return messageText;
  let messageParts = messageText.split(":");
  if (messageParts.length > 1) {
    messageText =
      "<u>" +
      messageParts[0] +
      "</u>:" +
      messageParts.slice(1, messageParts.length).join(":");
  }
  return messageText;
};
