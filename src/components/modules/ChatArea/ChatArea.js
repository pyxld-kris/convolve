import React from "react";

import GPTUtil from "../../../utils/GPTUtil";

export default function ChatArea({
  chatName,
  currentChat,
  setCurrentChat,
  textLines,
  setTextLines,
}) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { moduleName } = useParams();
  //const [moduleData, setModuleData] = React.useState({});

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

  [textLines, setTextLines] = textLines
    ? [textLines, setTextLines]
    : React.useState(structuredClone(currentChat.chatHistory));
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

  const [chatboxContent, setChatboxContent] = React.useState("");

  const createEmptyNewLine = () => {
    let tempTextLines = [...textLines];
    tempTextLines.push("me: ");
    setTextLines(tempTextLines);
  };
  const updateLineText = (lineNumber, text) => {
    let tempTextLines = [...textLines];
    let lineIndex = lineNumber - 1;

    // Handle any newlines here
    let parts = text.split("<br>");
    for (let i = parts.length - 1; i > 0; i--) {
      let line = parts[i];
      tempTextLines.splice(lineIndex + 1, 0, line);
    }
    tempTextLines[lineIndex] = parts[0];

    console.log(tempTextLines);

    setTextLines(tempTextLines);
  };
  const removeLine = (lineNumber) => {
    let tempTextLines = [...textLines];
    tempTextLines.splice(lineNumber - 1, 1);
    console.log(tempTextLines);
    setTextLines(tempTextLines);
  };

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
      let chatterHistory = currentChat.bots[chatterName]?.initialConversation;
      // ? currentChat.bots[chatterName].initialConversation
      // : bots[chatterName]?.initialConversation;
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
/*
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
*/
    ]);

    let tempPossibleTextLines = [...possibleTextLines];
    tempPossibleTextLines.push(
      ...results.map((result) => chatterName + ": " + result.split("\n")[0])
    );
    setPossibleTextLines(tempPossibleTextLines);
  };

  const doChat = async () => {
    let tempTextLines = [...textLines];
    tempTextLines.push("me: " + chatboxContent);
    setChatboxContent("");
    setTextLines(tempTextLines);
    await generatePossibleChatMessages(
      tempTextLines,
      textLines[0].split(":")[0]
    );
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
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#e0e0e0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "3rem",
        fontSize: "1.25rem",
        overflow: "scroll",
      }}
    >
      <div style={{ width: "85%", color: "black", textAlign: "left" }}>
        {chatName}
      </div>
      {textLines.map((textLine, index) => {
        return (
          <div style={{ width: "98%", display: "flex" }} key={Math.random()}>
            <div style={{ width: "2%", color: "#555555", userSelect: "none" }}>
              {index + 1}
            </div>
            <div
              style={{
                width: "7%",
                userSelect: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  background: "#000000",
                  color: "#ffffff",
                  userSelect: "none",
                  borderRadius: "500px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".8rem",
                }}
              >
                {textLine
                  .split(": ")[0]
                  .split(" ")
                  .reduce((acc, cur) => acc + cur.charAt(0), "")}
              </div>
            </div>
            <div style={{ width: "80%", color: "black" }}>
              <EditableDiv
                text={textLine}
                lineNumber={index + 1}
                totalNumberOfLines={textLines.length}
                createEmptyNewLine={createEmptyNewLine}
                updateLineText={updateLineText}
                removeLine={removeLine}
              />
            </div>
            <button
              title="Request this chatter to speak again"
              style={{ width: "5%", color: "red", userSelect: "none" }}
              onClick={async () => {
                let chatterName = textLines[index].split(":")[0];
                await generatePossibleChatMessages(textLines, chatterName);
              }}
            >
              💬
            </button>
            <button
              title="Generate more text at the end of this message"
              style={{ width: "5%", color: "red", userSelect: "none" }}
              onClick={async () => {
                let userName = textLines[index].split(":")[0];
                addActiveTyper(userName);

                let tempTextLines = [...textLines];
                tempTextLines[index] +=
                  '<span style="color:green">[GENERATING ADDITIONAL TEXT]</span>';
                setTextLines(tempTextLines);

                let result = await GPTUtil.bloomQuery({
                  text: textLines
                    .slice(0, index + 1)
                    .join("\n")
                    .substring(
                      textLines.slice(0, index + 1).join("\n").length - 3700
                    ),
                  length: 60,
                  temperature: 0.3 * 1,
                  batchSize: 1,
                });

                let resultLines = result.split("\n");
                tempTextLines = [...textLines];
                tempTextLines[index] += resultLines[0];
                setTextLines(tempTextLines);
                removeActiveTyper(userName);
              }}
            >
              ➕
            </button>
            <button
              title="Replace this message with a new one"
              style={{ width: "5%", color: "red", userSelect: "none" }}
              onClick={async () => {
                let userName = textLines[index].split(":")[0];
                addActiveTyper(userName);

                let tempTextLines = [...textLines];
                tempTextLines[index] =
                  '<span style="color:red">[GENERATING REPLACEMENT]</span>';
                setTextLines(tempTextLines);

                let infillPrompt = `{
  "Text 1": 1 2 3 
  "Text 3": 8 9 10
  "Text 2": 4 5 6 7 
},
{
  "Text 1": a b c d e f
  "Text 3": l m n o
  "Text 2":  g h i j k  
},
{
  "Text 1": Paul: Hey Sarah!
  "Text 3": Sarah: It was good. How about you?
  "Text 2": Paul: How was your day?
},
{
  "Text 1": ${textLines.slice(0, index).join("\n").substring(-1000)}
  "Text 3": ${textLines
    .slice(index + 1, textLines.length)
    .join("\n")
    .substring(0, 1000)}
  "Text 2": `;
                let result = await GPTUtil.bloomQuery({
                  text:
                    textLines.slice(0, index).join("\n").substring(-3000) +
                    "\n",
                  length: 60,
                  temperature: 0.3 * 1,
                  batchSize: 1,
                });

                let resultLines = result.split("\n");
                for (let i = 0; i < 1; i++) {
                  tempTextLines[index] = resultLines[i];
                }
                setTextLines(tempTextLines);
                removeActiveTyper(userName);
              }}
            >
              🔃
            </button>
            <button
              title="Delete this message"
              style={{ width: "5%", color: "red", userSelect: "none" }}
              onClick={() => {
                removeLine(index + 1);
              }}
            >
              ❌
            </button>
          </div>
        );
      })}

      <div
        style={{
          width: "80%",
          color: "#555555",
          marginTop: "1rem",
        }}
      >
        <span style={{ fontSize: "1rem" }}>
          {possibleTextLines.length ? "Which response do you like best?" : ""}
        </span>
        {possibleTextLines.map((possibleTextLine) => {
          return (
            <div
              style={{
                cursor: "pointer",
                backgroundColor: "#eeeedd",
                margin: ".4rem",
                padding: ".4rem",
              }}
              onClick={() => {
                let tempTextLines = [...textLines];
                tempTextLines.push(possibleTextLine);
                setTextLines(tempTextLines);

                setPossibleTextLines(() => []);

                // Check if any other bot is set to respond to this bot
                let tempQueuedChatters = [];
                let speakerName = possibleTextLine.split(":")[0];
                let chatParticipants = getAllChatParticipants(textLines);
                chatParticipants.forEach((chatParticipantName) => {
                  let chatParticipant = currentChat.bots[chatParticipantName];
                  if (
                    chatParticipant &&
                    chatParticipant?.respondsTo.indexOf(speakerName) != -1
                  ) {
                    tempQueuedChatters.push(chatParticipantName);
                  }
                });
                setQueuedChatters(tempQueuedChatters);
              }}
              dangerouslySetInnerHTML={{ __html: possibleTextLine }}
            ></div>
          );
        })}
        {possibleTextLines.length ? (
          <button
            onClick={() => {
              setPossibleTextLines([]);
            }}
          >
            Discard
          </button>
        ) : (
          ""
        )}
      </div>

      <div
        style={{
          width: "80%",
          textAlign: "left",
          fontSize: "1rem",
          color: "#aaaaaa",
        }}
      >
        {activelyTypingUsers.length
          ? activelyTypingUsers.join(", ") + " typing..."
          : ""}
      </div>

      <div
        style={{
          width: "85%",
          height: "3rem",
          bottom: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "1rem",
          marginBottom: "2rem",
        }}
      >
        <textarea
          style={{ width: "80%" }}
          onKeyUp={(e) => {
            e.target.style.height = "inherit";
            e.target.style.height = `${
              e.target.scrollHeight > 40 ? e.target.scrollHeight : 35
            }px`;
          }}
          onKeyDown={(event) => {
            // Detect enter keypress
            const key = event.key;
            if (key === "Enter") {
              event.preventDefault();
              doChat();
            }
          }}
          onChange={(event) => {
            setChatboxContent(event.target.value);
          }}
          value={chatboxContent}
        />
        <button
          style={{ height: "100%" }}
          onClick={async () => {
            doChat();
          }}
        >
          Chat!
        </button>
        <button
          style={{ height: "100%" }}
          onClick={async () => {
            createEmptyNewLine();
          }}
        >
          New Line
        </button>
      </div>
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
const removeChatterUnderlineHTML = (messageText) => {
  let messageParts = messageText.split("</u>:");
  if (messageParts.length > 1) {
    messageText =
      messageParts[0].substring(3) +
      ":" +
      messageParts.slice(1, messageParts.length).join(":");
  }
  return messageText;
};

const addAllChatterUnderlineHTML = (messages) => {
  return messages.map((message) => addChatterUnderlineHTML(message));
};
const removeAllChatterUnderlineHTML = (messages) => {
  return messages.map((message) => removeChatterUnderlineHTML(message));
};
