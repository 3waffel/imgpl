import * as cocoSsd from "./cocossd";
import * as mobilenet from "./mobilenet";

function register() {
  document.getElementById("img").addEventListener("load", main);
}

async function main() {
  await cocoSsd.run();
  await mobilenet.run();
}

document.addEventListener("DOMContentLoaded", register);
