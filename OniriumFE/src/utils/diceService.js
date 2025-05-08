// src/utils/diceService.js
import DiceBox from "@3d-dice/dice-box";

let diceInstance = null;
let initPromise = null;

function waitForDiceBoxInDOM() {
  return new Promise((resolve) => {
    const check = () => {
      const box = document.querySelector("#dice-box");
      if (box) return resolve();
      requestAnimationFrame(check);
    };
    check();
  });
}

export async function getDiceInstance() {
  if (!diceInstance) {
    await waitForDiceBoxInDOM();

    diceInstance = new DiceBox({
      selector: "#dice-box",
      container: "#dice-box",
      id: "dice-canvas",
      assetPath: "/assets/dice-box/",
      theme: "default",
      themeColor: '#C8A45F',
      scale: 6,
      lightIntensity: 1,
    });

    initPromise = diceInstance.init().then(() => {
      document.addEventListener("mousedown", () => {
        diceInstance.hide();
        diceInstance.clear();
      });

      return diceInstance;
    });
  }

  return initPromise || Promise.resolve(diceInstance);
}
