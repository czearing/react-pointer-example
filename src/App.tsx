import React from "react";
import { on } from "@fluentui/utilities";

export default function App() {
  const [cordinates, setCordinates] = React.useState({ left: 0, top: 0 });
  const disposables = React.useRef<(() => void)[]>([]);
  const elementSize = 80;

  const onPointerMove = (ev) => {
    setCordinates({
      left: ev.pageX - elementSize / 2,
      top: ev.pageY - elementSize / 2
    });
  };

  const onPointerUp = () => {
    disposables.current.forEach((dispose) => dispose());
    disposables.current = [];
  };

  const onPointerDown = (ev) => {
    ev.target.setPointerCapture(ev.pointerId);

    disposables.current.push(
      on(window, "pointermove", onPointerMove, true),
      on(window, "pointerup", onPointerUp, true)
    );
  };

  const circleStyle = {
    position: "absolute",
    width: elementSize,
    height: elementSize,
    transform: `translate(${cordinates.left}px, ${cordinates.top}px)`,
    backgroundColor: "red",
    touchAction: "none"
  };

  return (
    <div className="App">
      <div
        className="Square"
        onPointerDown={onPointerDown}
        style={circleStyle}
      />
    </div>
  );
}
