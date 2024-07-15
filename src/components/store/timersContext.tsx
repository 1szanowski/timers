import { createContext, ReactNode, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  timers: Timer[];
  isRunning: boolean;
};

const initialState: TimersState = {
  timers: [],
  isRunning: true,
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

type TimerContextProviderProps = { children: ReactNode };

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const TimersCtx = useContext(TimersContext);
  if (TimersCtx === null) {
    throw new Error("empty conext!");
  }
  return TimersCtx;
}

type StartTimerAction = {
  type: "START_TIMERS";
};

type StopTimerAction = {
  type: "STOP_TIMERS";
};

type AddTimersAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimerAction | StopTimerAction | AddTimersAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  switch (action.type) {
    case "START_TIMERS":
      return {
        ...state,
        isRunning: true,
      };
    case "STOP_TIMERS":
      return {
        ...state,
        isRunning: false,
      };
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          { name: action.payload.name, duration: action.payload.duration },
        ],
      };
    default:
      return state;
  }
}

export default function TimerContextProvider({
  children,
}: TimerContextProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
