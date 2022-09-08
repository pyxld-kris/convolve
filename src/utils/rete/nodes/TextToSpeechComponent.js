import Rete from "rete";
export default class TextToSpeechComponent extends Rete.Component {
  constructor() {
    super("TextToSpeech");
    this.data.path = "Util";
    this.task = {
      outputs: {
        out0: "outputOption",
      },
    };
  }

  builder(node) {
    var inp0 = new Rete.Input("in0", "text", this.editor.sockets.anyTypeSocket);
    var out = new Rete.Output(
      "out0",
      "originalText",
      this.editor.sockets.anyTypeSocket
    );

    return node.addInput(inp0).addOutput(out);
  }

  async worker(node, inputs, outputs = {}) {
    //console.log("TextToSpeech worker");

    var text = inputs["in0"]?.length ? inputs["in0"][0] : node.data.in0;

    // let result = await axios.get({
    //   url: url,
    //   method: method,
    //   data: data,
    // });

    // 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

    // let result = await axios.post(
    //   "http://localhost:5001",
    //   {
    //     prompt: prompt,
    //   },
    //   {
    //     headers: {
    //       "Target-URL": "https://bf.dallemini.ai/generate",
    //       "Connection-Override": "keep-alive",
    //       "Origin-Override": "https://hf.space",
    //       "Referer-Override": "https://hf.space",
    //     },
    //   }
    // );

    /*
    let result = await axios.post(
      "http://localhost:5001",
      {
        data: [text.substring(0, 100), "en/ljspeech/tacotron2-DDC_ph"],
        cleared: false,
        example_id: null,
        session_hash:
          "q" +
          parseInt(Math.random() * 10) +
          "rq8ar5tk" +
          parseInt(Math.random() * 10),
      },
      {
        headers: {
          "Target-URL": "https://hf.space/embed/coqui/CoquiTTS/api/predict/",
          "Connection-Override": "keep-alive",
          "Origin-Override": "https://hf.space",
          "Referer-Override": "https://hf.space",
        },
      }
    );
    */

    await new Promise(function (resolve, reject) {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length !== 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.addEventListener("voiceschanged", function () {
          voices = window.speechSynthesis.getVoices();
          resolve(voices);
        });
      }
    });

    var msg = new SpeechSynthesisUtterance();
    //console.log(window.speechSynthesis.getVoices());
    //msg.text = text;
    //msg.voice = window.speechSynthesis.getVoices()[5];
    //window.speechSynthesis.speak(msg);
    await readText(text.substring(0, 175));
    let result = text;

    // setTimeout(() => {
    //   if (window.speechSynthesis.paused) window.speechSynthesis.cancel();
    // }, 8000);

    //result = JSON.parse(result);

    //await new Promise((r) => setTimeout(r, 1000));

    //console.log(result);

    //console.log(result.data.data[0]);
    //var sound = new Audio(result.data.data[0]);
    //sound.play();

    //alert(result);

    outputs["out0"] = result;

    return { out0: result };
  }
}

let timer = null;
let reading = false;
let readText = async function (text) {
  return new Promise((resolve, reject) => {
    if (reading) reject("");

    speechSynthesis.cancel();
    if (timer) {
      clearInterval(timer);
    }
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[5];
    msg.voiceURI = "native";
    msg.volume = 1; // 0 to 1
    msg.rate = 1.0; // 0.1 to 10
    msg.pitch = 1; //0 to 2
    msg.text = text;
    msg.lang = "zh-TW";

    msg.onerror = function (e) {
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);

      resolve("");
    };

    msg.onpause = function (e) {
      console.log("onpause in " + e.elapsedTime + " seconds.");

      resolve("");
    };

    msg.onend = function (e) {
      console.log("onend in " + e.elapsedTime + " seconds.");
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);

      resolve("");
    };

    speechSynthesis.onerror = function (e) {
      console.log("speechSynthesis onerror in " + e.elapsedTime + " seconds.");
      speechSynthesis.cancel();
      reading = false;
      clearInterval(timer);

      resolve("");
    };

    speechSynthesis.speak(msg);

    timer = setInterval(function () {
      if (speechSynthesis.paused) {
        console.log("#continue");
        speechSynthesis.resume();
      }
    }, 100);

    reading = true;
  });
};
