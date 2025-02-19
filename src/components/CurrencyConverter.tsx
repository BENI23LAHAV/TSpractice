import React, { useEffect, useState } from "react";

function CurrencyConverter() {
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

  const [amount, setAmount] = useState<number>(0);
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    Currency.NIS
  );
  const [preferredCurrency, setPreferredCurrency] = useState<Currency>(
    Currency.NIS
  );
  const [resulst, setResults] = useState<number>(0);

  useEffect(() => {
    const currentAmount: number = coins[currentCurrency] * amount;
    console.log("currentAmount: ", currentAmount);

    const prefered: number = coins[preferredCurrency];
    console.log("prefered: ", preferredCurrency);

    setResults(currentAmount / prefered);
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
