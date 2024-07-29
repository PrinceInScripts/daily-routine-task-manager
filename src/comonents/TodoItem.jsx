


import React, { useEffect, useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [task, setTask] = useState(todo.task);
  const [startTime, setStartTime] = useState(todo.startTime);
  const [endTime, setEndTime] = useState(todo.endTime);

  useEffect(()=>{
      console.log(task)
      console.log(startTime)
      console.log(endTime)
  },[todo])

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, task, startTime, endTime });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-y-2 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
      <div className="flex items-center gap-x-3">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>
      <div className="flex ">
        <input
          type="text"
          className={`border outline-none bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          readOnly={!isTodoEditable}
        />
        
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"} ${todo.completed ? "line-through" : ""}`}
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          readOnly={!isTodoEditable}
        />
      </div>
      <div className="flex gap-x-3 mt-2">
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? "📁" : "✏️"}
        </button>
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌
        </button>
      </div>
    </div>
  );
}

export default TodoItem;