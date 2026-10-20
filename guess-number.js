"use strict";

const readline = require("node:readline/promises");

// 將輸入轉成整數；空白、小數與超出範圍的數字都不接受。
function parseGuess(input) {
  if (!/^\d+$/.test(input.trim())) return null;
  const number = Number(input.trim());
  return Number.isInteger(number) && number >= 1 && number <= 100
    ? number
    : null;
}

function compareGuess(guess, answer) {
  if (guess < answer) return "太小了，再試一次！";
  if (guess > answer) return "太大了，再試一次！";
  return "答對了！";
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const answer = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  console.log("歡迎來玩猜數字！請猜一個 1～100 的整數。");
  console.log("輸入 q 可離開遊戲。");

  try {
    while (true) {
      const input = (await rl.question("你的答案：")).trim();
      if (input.toLowerCase() === "q") {
        console.log("謝謝遊玩，下次見！");
        break;
      }
      const guess = parseGuess(input);
      if (guess === null) {
        console.log("請輸入 1～100 的整數，或輸入 q 離開。");
        continue;
      }
      attempts += 1;
      console.log(compareGuess(guess, answer));
      if (guess === answer) {
        console.log(`你一共猜了 ${attempts} 次！`);
        break;
      }
    }
  } catch (error) {
    // Ctrl+D / 輸入串流關閉時正常結束。
    if (error.code !== "ERR_USE_AFTER_CLOSE") throw error;
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.error("遊戲發生錯誤：", error.message);
    process.exitCode = 1;
  });
}

module.exports = { parseGuess, compareGuess };
