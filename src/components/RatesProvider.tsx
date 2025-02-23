import React, { useEffect, useState } from "react";
import { CurrencyData, ExchangeRatesResponse } from "../lib/types.ts";

//direct URL to get all supported symbols.
const currency_symbols =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
//URL to do a query based on symbol (Add inside the function).
const query =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

function RatesProvider() {
  //state to store the currencies that supported.
  const [currencies, setCurrencies] = useState<CurrencyData | undefined>(
    undefined
  );
  //state to store the amount to convert.
  const [amount, setAmount] = useState<number>(0);
  //state to store the current currency.
  const [currentCurrency, setCurrentCurrency] = useState<string>("");
  //state to store the preferred currency.
  const [preferredCurrency, setPreferredCurrency] = useState<string>("");
  //state to store the result after calculate.
  const [result, setResult] = useState<number>(0);
  //state to store the updated date
  const [updated, setUpdated] = useState<string | undefined>("");
  // load the list of supported currencys
  useEffect(() => {
    getSupportedCurrencies().then((data) => {
      //if it isn't undefind...
      if (data) {
        setCurrencies(data);
      }
    });
  }, []);

  // if one of the parameters chenged.
  useEffect(() => {
    //checks if all aren't undefind.
    if (currentCurrency && preferredCurrency && amount) {
      //get the current reates.
      getRates(currentCurrency).then((data) => {
        //if it isn't undefind...
        if (data) {
          //takes the specific rate.
          const rate = data[currentCurrency][preferredCurrency] || 0;
          setResult(rate * amount);
          setUpdated(data.date);
        }
      });
    }
  }, [amount, currentCurrency, preferredCurrency]);

  return (
    <div>
      <h1>RatesProvider</h1>
      <label>בחר מטבע רצוי</label>
      <br />
      <select
        defaultValue=""
        onChange={(e) => setCurrentCurrency(e.currentTarget.value)}>
        <option value="" disabled>
          בחר מטבע
        </option>
        {currencies &&
          Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code.toUpperCase()} - {name}
            </option>
          ))}
      </select>
      <br />
      <label>בחר מטבע להמרה</label>
      <br />
      <select
        defaultValue=""
        onChange={(e) => setPreferredCurrency(e.currentTarget.value)}>
        <option value="" disabled>
          בחר מטבע
        </option>
        {currencies &&
          Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code.toUpperCase()} - {name}
            </option>
          ))}
      </select>
      <br />
      <input
        type="number"
        min={1}
        placeholder="הזן סכום"
        onChange={(e) => setAmount(Number(e.currentTarget.value))}
      />
      <p>תוצאה: {result}</p>
      <p>נכון ל : {updated}</p>
    </div>
  );
}

export default RatesProvider;

async function getSupportedCurrencies(): Promise<CurrencyData | undefined> {
  try {
    const response: Response = await fetch(currency_symbols);
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return undefined;
    }
    const data: CurrencyData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return undefined;
  }
}

async function getRates(
  rate: string
): Promise<ExchangeRatesResponse | undefined> {
  if (!rate) {
    return undefined;
  }
  const fullURL = query + rate + ".json";
  try {
    const response: Response = await fetch(fullURL);
    console.log(response);

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return undefined;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching rates:", error);
    return undefined;
  }
}
