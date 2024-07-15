import { useContext } from "react";
import {  } from "./store/timersContext";
import Button from "./UI/Button";
import { useTimersContext } from "./store/timersContext";

export default function Header() {
  const TimersCtx = useTimersContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={TimersCtx.isRunning? TimersCtx.stopTimers: TimersCtx.startTimers}>{TimersCtx.isRunning? "Stop timers" : "Start timers"}</Button>
    </header>
  );
}
