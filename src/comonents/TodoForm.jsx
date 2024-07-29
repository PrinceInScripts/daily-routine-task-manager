import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoForm() {
  const [task, setTask] = useState("");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("00:00");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!task || !startTime || !endTime) return;

    const convertTo12HourFormat = (time) => {
      const [hours, minutes] = time.split(":");
      const period = +hours < 12 ? "AM" : "PM";
      const formattedHours = +hours % 12 || 12;
      return `${formattedHours}:${minutes} ${period}`;
    };

    addTodo({
      task,
      startTime: convertTo12HourFormat(startTime),
      endTime: convertTo12HourFormat(endTime),
      completed: false,
    });

    setTask("");
    setStartTime("00:00");
    setEndTime("00:00");
  };

  return (
    <form onSubmit={add} className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Write task..."
        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="time"
        placeholder="Start Time"
        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <input
        type="time"
        placeholder="End Time"
        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      <button type="submit" className="rounded-lg px-3 py-1 bg-green-600 text-white">
        Add
      </button>
    </form>
  );
}

export default TodoForm;