import React, { useEffect, useState } from "react";

function index() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput("");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (index) => {
    const newTasks = tasks.filter((item, i) => i != index);
    setTasks(newTasks);
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <>
      <div>
        <h1>To Do App</h1>
        <div>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>

                <button onClick={() => deleteTask(index)}>Delete</button>
                <button onClick={() => toggleTask(index)}>Completed</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default index;
