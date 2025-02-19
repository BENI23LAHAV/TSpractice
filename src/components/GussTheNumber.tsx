import React from "react";

import { GussTheNumberClass } from "../lib/gussTheNumberClass.ts";
function GussTheNumber() {
  const gussTheNumber: GussTheNumberClass = new GussTheNumberClass();
  gussTheNumber.game();
  return (
    <div>
      <h1>GussTheNumber</h1>
    </div>
  );
}

export default GussTheNumber;
