import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export async function run() {
  const imgElement = document.getElementById("img");
  const model = await cocoSsd.load();
  const result = await model.detect(img);

  const canvas = document.getElementById("canvas");
  canvas.height = imgElement.height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(
    imgElement,
    0,
    0,
    224,
    224 * (imgElement.height / imgElement.width)
  );
  context.font = "10px Fira Code";

  console.log("number of detections:\n", result.length);
  result.forEach((element) => {
    context.beginPath();
    context.rect(...element.bbox);
    context.lineWidth = 1;
    context.strokeStyle = "green";
    context.fillStyle = "green";
    context.stroke();
    context.fillText(
      element.score.toFixed(3) + " " + element.class,
      element.bbox[0],
      element.bbox[1] > 10 ? element.bbox[1] - 5 : 10
    );
  });
}
