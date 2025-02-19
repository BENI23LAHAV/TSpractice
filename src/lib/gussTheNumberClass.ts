import { GameStatus } from "./types.ts";

//
export class GussTheNumberClass {
  private secretNumber: number;
  private guessLeft: number;
  private history: Record<number, GameStatus>;

  constructor() {
    this.secretNumber = Math.floor(Math.random() * 100);
    this.guessLeft = 10;
    this.history = {};
    console.log(this.secretNumber);
  }
  getTheGuessLeft() {
    return this.guessLeft;
  }

  guss(num: number): GameStatus {
    if (this.guessLeft <= 0) {
      return GameStatus.gameOver;
    }

    this.guessLeft--;
    if (num === this.secretNumber) {
      this.history[num] = GameStatus.equalTo;
      this.guessLeft = 0;
      return GameStatus.equalTo;
    }
    if (num > this.secretNumber) {
      this.history[num] = GameStatus.lessThan;
      return GameStatus.lessThan;
    }
    this.history[num] = GameStatus.greaterThan;
    return GameStatus.greaterThan;
  }
  game() {
    while (this.guessLeft > 0) {
      alert(this.guss(Number(prompt("guess a number") || "0")));
    }
    alert(this.getHistory());
  }

  getHistory(): string {
    return JSON.stringify(this.history);
  }
}
