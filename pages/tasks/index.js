import React, { useEffect, useState } from "react";

function index() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const fetchTasks = async () => {
    const response = await fetch("/api/tasks", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    // localStorage.setItem("tasks", JSON.stringify(tasks));
    fetchTasks();
  }, []);

  const addTask = async () => {
    //setTasks([...tasks, { text: taskInput, completed: false }]);
    const enteredTask = { text: taskInput, completed: false };
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(enteredTask),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    fetchTasks();
    //console.log(data);
    setTaskInput("");
  };

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
      <div style={styles.container}>
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
          <ul style={styles.taskList}>
            {tasks.map((task, index) => (
              <li key={index} style={styles.taskItem}>
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

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  },
  taskList: {
    listStyleType: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
  },
};

export default index;
