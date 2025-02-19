import React, { useState } from "react";
import { type Color, type resizeAction, Size } from "../lib/types.ts";
import Button, { ResizeButton } from "./Button.tsx";
export default function PeekColor() {
  const [color, setColor] = useState<Color>("white");
  let colorOptions: Color[] = ["blue", "green", "red"];

  const [squereHeight, setSquereHeight] = useState<number>(1);
  const [squereWidth, setSquereWidth] = useState<number>(1);

  function getSizeByNumber(num: number): Size {
    switch (num) {
      case 1:
        return Size.small;
      case 2:
        return Size.medium;
      case 3:
        return Size.large;
      case 4:
        return Size.xlarge;
      default:
        return Size.small;
    }
  }

  function getDivDetails(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    genericLog(event.currentTarget.style.backgroundColor);
    genericLog(event.currentTarget.style.height);
    genericLog(event.currentTarget.style.width);
  }

  function genericLog<T>(element: T): void {
    console.log("generic log: ", element);
  }
  const actions: resizeAction[] = ["+", "-"];
  // const side : string[]  = ["height","width"];
  return (
    <div className="PeekColor">
      <h1>PeekColor</h1>
      {colorOptions.map((item, index) => (
        <Button color={item} setColor={setColor} key={index} />
      ))}
      <br />
      {actions.map((item, index) => (
        <ResizeButton
          action={item}
          current={squereHeight}
          setSize={setSquereHeight}
          text="height"
          key={index}
        />
      ))}
      <br />
      {actions.map((item, index) => (
        <ResizeButton
          action={item}
          current={squereWidth}
          setSize={setSquereWidth}
          text="width"
          key={index}
        />
      ))}

      <div
        style={{
          backgroundColor: color,
          height: `${getSizeByNumber(squereHeight)}px`,
          width: `${getSizeByNumber(squereWidth)}px`,
        }}
        onClick={getDivDetails}>
        <p>
          im squere in color {color} heghit {getSizeByNumber(squereHeight)} and
          width {getSizeByNumber(squereWidth)}
        </p>
      </div>
    </div>
  );
}
