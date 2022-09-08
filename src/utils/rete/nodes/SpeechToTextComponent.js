import Rete from "rete";
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let recognition;

export default class SpeechToTextComponent extends Rete.Component {
  constructor() {
    super("SpeechToText");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
        out1: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input(
      "in0",
      "signal",
      this.editor.sockets.anyTypeSocket
    );
    var out0 = new Rete.Output(
      "out0",
      "speechText",
      this.editor.sockets.stringSocket
    );
    var out1 = new Rete.Output(
      "out1",
      "speechConfidence",
      this.editor.sockets.numSocket
    );

    return node.addInput(inp0).addOutput(out0).addOutput(out1);
  }

  // TextToSpeech worker {id: 4, data: {…}, inputs: {…}, outputs: {…}, position: Array(2), …}
  // SpeechToTextComponent.js:77 ENDING SPEECH TO TEXT
  // SpeechToTextComponent.js:122 ended speech to text
  // SpeechToTextComponent.js:101 recognition.onspeechend
  // SpeechToTextComponent.js:97 Confidence: 0.856569230556488
  // SpeechToTextComponent.js:77 ENDING SPEECH TO TEXT

  async worker(node, inputs, outputs = {}) {
    console.log("TextToSpeech worker", node);

    var text = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;

    let speechTextResults = [];
    let speechConfidenceResults = [];
    await new Promise((resolve, reject) => {
      recognition = new SpeechRecognition();
      /*
        if (SpeechGrammarList) {
          // SpeechGrammarList is not currently available in Safari, and does not have any effect in any other browser.
          // This code is provided as a demonstration of possible capability. You may choose not to use it.
          var speechRecognitionList = new SpeechGrammarList();
          var grammar =
            "#JSGF V1.0; grammar colors; public <color> = " +
            colors.join(" | ") +
            " ;";
          speechRecognitionList.addFromString(grammar, 1);
          recognition.grammars = speechRecognitionList;
        }
        */
      recognition.continuous = true;
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      let endSpeechTimeout = null;
      const tentativelyEndSpeechRecognition = () => {
        try {
          recognition.start();
        } catch (e) {}
        clearTimeout(endSpeechTimeout);
        endSpeechTimeout = setTimeout(() => {
          console.log("ENDING SPEECH TO TEXT");
          if (recognition) recognition.stop();
          resolve();
        }, 3000);
      };

      recognition.onresult = function (event) {
        // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
        // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
        // It has a getter so it can be accessed like an array
        // The first [0] returns the SpeechRecognitionResult at the last position.
        // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
        // These also have getters so they can be accessed like arrays.
        // The second [0] returns the SpeechRecognitionAlternative at position 0.
        // We then return the transcript property of the SpeechRecognitionAlternative object
        speechTextResults.push(event.results[0][0].transcript);
        speechConfidenceResults.push(
          parseFloat(event.results[0][0].confidence)
        );
        //speechText += " " + event.results[0][0].transcript;
        console.log("Confidence: " + event.results[0][0].confidence);
        tentativelyEndSpeechRecognition();
      };
      recognition.onspeechend = function () {
        console.log("recognition.onspeechend");
        //tentativelyEndSpeechRecognition();
        clearTimeout(endSpeechTimeout);
        resolve();
      };
      recognition.onnomatch = function (event) {
        //diagnostic.textContent = "I didn't recognise that color.";
        tentativelyEndSpeechRecognition();
        console.log("recognition.onnomatch");
      };
      recognition.onerror = function (event) {
        //diagnostic.textContent = "Error occurred in recognition: " + event.error;
        tentativelyEndSpeechRecognition();
        console.log("recognition.onerror");
      };

      setTimeout(() => {
        tentativelyEndSpeechRecognition();
      }, 6000);
    });
    recognition = null;
    console.log("ended speech to text");

    let speechText = "";
    let speechConfidence = 0;
    if (speechTextResults.length) {
      speechText = speechTextResults.join(" ");
      //alert(speechConfidenceResults);
      speechConfidence =
        speechConfidenceResults.reduce((a, b) => a + b) /
        speechTextResults.length;
    }

    //alert(speechConfidence);

    return { out0: speechText, out1: speechConfidence };
  }
}
