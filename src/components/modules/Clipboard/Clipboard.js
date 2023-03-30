import React from "react";
import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import {
  closeGlobalModal,
  openGlobalModal,
} from "../../../components/modules/GlobalModal/GlobalModal";

let clips = [
  "This is your 'quick clip' board, where you can easily store your most commonly used pieces of text! (It's an extreme WIP)",
];

export default function Clipboard(props) {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  //let { moduleName } = useParams();
  //const [moduleData, setModuleData] = React.useState({});

  return (
    <div
      className="clipboardIcon"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "7vw",
        width: "3rem",
        height: "3rem",
        // backgroundColor: "#aaaaaa",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        fontSize: "3rem",
        cursor: "pointer",
      }}
      onClick={() => {
        openGlobalModal(<ClipboardEditorArea />);
      }}
    >
      📋
    </div>
  );
}

function ClipboardEditorArea(props) {
  const [zoomScale, setZoomScale] = React.useState(1);
  const [isMoveable, setIsMoveable] = React.useState(false);

  const onDrag = () => {
    setIsMoveable(true);
    //etc
  };
  const onStop = () => {
    setIsMoveable(false);
    //etc
  };

  return (
    <div
      style={
        {
          //   display: "flex",
          //   flexDirection: "row",
          //   flexWrap: "wrap",
          //   justifyContent: "space-around",
          //   alignItems: "space-around",
        }
      }
    >
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          let newClip = prompt("Add a clip!");
          clips.unshift(newClip);
          closeGlobalModal();
        }}
      >
        ➕
      </div>
      <TransformWrapper
        disabled={isMoveable}
        minScale={0.01}
        limitToBounds={false}
        centerOnInit={true}
        minPositionX={-20000}
        minPositionY={-20000}
        maxPositionX={20000}
        maxPositionY={20000}
        centerZoomedOut={false}
        doubleClick={{ disabled: true }}
        //   onPanning={updateXarrow}
        //   onZoom={updateXarrow}
        pinch={{ step: 5 }}
        onZoomStop={(event) => {
          setZoomScale(event.state.scale);
          //console.log(event);
        }}
      >
        <TransformComponent>
          <div
            style={{
              // display: "grid",
              // gridTemplateColumns: "1fr 1fr", // creates two responsive columns
              // gridGap: "10px", // puts 10px between each node in the grid

              display: "flex",
              maxWidth: "100rem",
              height: "50rem",
              flexDirection: "column",
              flexWrap: "wrap",
              justifyContent: "space-around",
              alignItems: "space-around",
            }}
          >
            {clips.map((entry) => {
              return (
                <Draggable onDrag={onDrag} onStop={onStop} scale={zoomScale}>
                  <div
                    style={{
                      width: "42%",
                      padding: "1rem",
                      margin: "1rem",
                      backgroundColor: "lightgray",
                    }}
                  >
                    {entry}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(entry);
                        alert("Copied!");
                      }}
                    >
                      COPY
                    </button>
                  </div>
                </Draggable>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}
