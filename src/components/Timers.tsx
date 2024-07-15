import { useTimersContext } from "./store/timersContext";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = useTimersContext();
  return (
    <ul>
      {timers.map((el) => (
        <li key={el.name}>
          <Timer {...el} />
        </li>
      ))}
    </ul>
  );
}
