import React, { useState } from "react";
import PickColor from "./PickColor.tsx";
import CurrencyConverter from "./CurrencyConverter.tsx";
import GussTheNumber from "./GussTheNumber.tsx";
import RatesProvider from "./RatesProvider.tsx";
function Home() {
  return (
    <div>
      {/* <PickColor /> */}
      {/* <CurrencyConverter /> */}
      {/* <GussTheNumber /> */}
      <RatesProvider />
    </div>
  );
}

export default Home;
