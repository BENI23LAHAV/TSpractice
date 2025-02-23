import React, { useEffect, useState } from "react";
import { Currency, coins } from "../lib/types";
function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(0);
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    Currency.NIS
  );
  const [preferredCurrency, setPreferredCurrency] = useState<Currency>(
    Currency.NIS
  );
  const [resulst, setResults] = useState<number>(0);

  useEffect(() => {
    const currentAmount: number = coins[currentCurrency] * amount; //המטבע הנבחר כפול הכמות
    console.log("currentAmount: ", currentAmount);

    const prefered: number = coins[preferredCurrency]; //המטבע הרצוי להמרה אליו
    console.log("prefered: ", preferredCurrency);

    setResults(currentAmount / prefered); //חלוקה של המטבע הנבחר על המטבע הרצויA
  }, [amount, preferredCurrency, currentCurrency]);

  function getAndSetAmount(event: React.ChangeEvent<HTMLInputElement>): void {
    const amount: number = Number(event.currentTarget.value);
    amount && setAmount(amount);
  }

  function setCurrentCurrencyOnChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    setState: React.Dispatch<React.SetStateAction<Currency>>
  ): void {
    const currency = event.currentTarget.value as Currency;

    if (coins[currency]) {
      setState(currency);
    }
  }

  return (
    <>
      <div className="currency">
        <h1>Currency Converter</h1>
        <input
          type="number"
          min={0}
          placeholder="הכנס כמות רצויה"
          onChange={(e) => {
            getAndSetAmount(e);
          }}
        />
        <br />
        <label>בחר מטבע נוכחי:</label>
        <select
          onChange={(e) => {
            setCurrentCurrencyOnChange(e, setCurrentCurrency);
          }}>
          <option value="NIS">שקל</option>
          <option value="USD">דולר</option>
          <option value="EUR">אירו</option>
        </select>
        <br />
        <label>בחר מטבע רצוי:</label>
        <select
          onChange={(e) => setCurrentCurrencyOnChange(e, setPreferredCurrency)}>
          <option value="NIS">שקל</option>
          <option value="USD">דולר</option>
          <option value="EUR">אירו</option>
        </select>
        <p>{resulst}</p>
      </div>
    </>
  );
}

export default CurrencyConverter;
