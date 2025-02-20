import React, { use, useEffect, useState } from "react";
import { type Color, type resizeAction, Shape, Size } from "../lib/types.ts";
import Button, { ResizeButton } from "./Button.tsx";
export default function PickColor() {
  //state for picked color
  const [color, setColor] = useState<Color>("white");
  //arrays for the button's options
  let colorOptions: Color[] = ["blue", "green", "red"];
  const actions: resizeAction[] = ["+", "-"];
  //states for the squre's heghit & width
  const [squereHeight, setSquereHeight] = useState<number>(1);
  const [squereWidth, setSquereWidth] = useState<number>(1);
  //state for shape
  const [shape, setShape] = useState<Shape>(Shape.square);
  useEffect(() => {
    console.log(shape);
  }, [shape]);

  const squereStyle = {
    backgroundColor: color,
    height: `${getSizeByNumber(squereHeight)}px`,
    width: `${getSizeByNumber(squereWidth)}px`,
  };
  const circleStyle = {
    backgroundColor: color,
    height: `${getSizeByNumber(squereHeight)}px`,
    width: `${getSizeByNumber(squereWidth)}px`,
    borderRadius: "50%",
  };

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
      <br />
      <label> Shape</label>
      <select
        onChange={(e) => {
          setShapeState(e, setShape);
        }}>
        <option value="circle">Circle</option>
        <option value="squere">Squere</option>
      </select>
      <div
        style={shape === "circle" ? circleStyle : squereStyle}
        onClick={getDivDetails}>
        {/* <p>
          im squere in color {color} heghit {getSizeByNumber(squereHeight)} and
          width {getSizeByNumber(squereWidth)}
        </p> */}
      </div>
    </div>
  );
}

//the function takes a number between 1-4 & returns the Size value
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
//just a generic log function
function genericLog<T>(element: T): void {
  console.log("generic log: ", element);
}
//a functin that passed & gets the event
function getDivDetails(
  event: React.MouseEvent<HTMLDivElement, MouseEvent>
): void {
  genericLog(event.currentTarget.style.backgroundColor);
  genericLog(event.currentTarget.style.height);
  genericLog(event.currentTarget.style.width);
}
function setShapeState(
  event: React.ChangeEvent<HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<Shape>>
): void {
  if (Shape[event.currentTarget.value]) {
    setState(event.currentTarget.value as Shape);
  } else {
    setState(Shape.square);
  }
}
