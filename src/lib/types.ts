/**----------------PeekColor---------------- */
type Color = "red" | "green" | "blue" | "white";
type resizeAction = "+" | "-";

enum Size {
  small = 100,
  medium = 200,
  large = 300,
  xlarge = 400,
}

enum GameStatus {
  lessThan = "less Than",
  equalTo = "You Won",
  greaterThan = "greater Than",
  gameOver = "game Over",
}
enum Currency {
  USD = "USD",
  EUR = "EUR",
  NIS = "NIS",
}
const coins: Record<string, number> = {
  [Currency.USD]: 3.5,
  [Currency.NIS]: 1,
  [Currency.EUR]: 4.5,
};

export { Color, resizeAction, Size, GameStatus, Currency, coins };
