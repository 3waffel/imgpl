import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-wasm";
import * as mobilenet from "@tensorflow-models/mobilenet";

function status(text) {
  document.getElementById("status").textContent = text;
}

function result(predictions) {
  let resultElement = document.getElementById("result");
  resultElement.innerHTML = "";
  predictions.forEach((element) => {
    let class_name = element.className;
    let probability = element.probability;
    let text = class_name + probability + `\n`;
    resultElement.innerHTML +=
      "<li>" + class_name + "\t" + probability + "</li>";
  });
}

async function main() {
  await tf.setBackend("wasm");
  const model = await mobilenet.load();

  const startTime1 = performance.now();
  const imgElement = document.getElementById("img");
  status("Model loaded!");

  let img = tf.browser
    .fromPixels(imgElement)
    .resizeBilinear([224, 224])
    .expandDims(0)
    .toFloat();

  let startTime2 = performance.now();
  const predictions = await model.classify(img);

  const totalTime1 = performance.now() - startTime1;
  const totalTime2 = performance.now() - startTime2;
  status(
    `Done in ${Math.floor(totalTime1)} ms ` +
      `(not including preprocessing: ${Math.floor(totalTime2)} ms)`
  );
  result(predictions);
}

document.addEventListener("DOMContentLoaded", main);
document.getElementById("img-input").addEventListener("change", main);