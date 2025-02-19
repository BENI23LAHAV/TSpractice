import React, { useState } from "react";
import { type Color, type resizeAction } from "../lib/types.ts";

type buttonProps = {
  color: Color;
  setColor: React.Dispatch<React.SetStateAction<Color>>;
};

function Button({ color, setColor }: buttonProps) {
  return (
    <button style={{ backgroundColor: color }} onClick={() => setColor(color)}>
      {color}
    </button>
  );
}

export default Button;

type ResizeButtonProps = {
  action: resizeAction;
  setSize: React.Dispatch<React.SetStateAction<number>>;
  current: number;
  text: string;
};

export function ResizeButton({
  text,
  action,
  setSize,
  current,
}: ResizeButtonProps) {
  let size: number = current;
  if (action == "+") {
    size = (size + 1) % 4;
  } else {
    size = (size - 1) % 4;
  }

  return (
    <>
      <button onClick={() => setSize(size)}>
        {text}
        {action}
      </button>
    </>
  );
}
