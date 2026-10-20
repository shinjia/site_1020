"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const { parseGuess, compareGuess } = require("./guess-number");

test("接受範圍內整數及前後空白", () => {
  assert.equal(parseGuess("1"), 1);
  assert.equal(parseGuess("100"), 100);
  assert.equal(parseGuess(" 42 "), 42);
});

test("拒絕空白、文字、小數及超出範圍的輸入", () => {
  for (const input of ["", " ", "abc", "1.5", "0", "101", "-1", "1e2"]) {
    assert.equal(parseGuess(input), null, input);
  }
});

test("提供正確的大小提示及勝利訊息", () => {
  assert.equal(compareGuess(20, 50), "太小了，再試一次！");
  assert.equal(compareGuess(80, 50), "太大了，再試一次！");
  assert.equal(compareGuess(50, 50), "答對了！");
});
