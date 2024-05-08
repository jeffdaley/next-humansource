"use client";

import { useState } from "react";

export default function Home() {
  const [isShown, setIsShown] = useState(true);

  function toggleShown() {
    setIsShown(!isShown);
  }

  return (
    <>
      <button onClick={toggleShown}>Toggle</button>

      {isShown ? <h1>Shown</h1> : <h5>Hidden</h5>}
    </>
  );
}
