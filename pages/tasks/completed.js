import React, { useEffect, useState } from "react";

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  //   if (savedTasks) {
  //     setTasks(savedTasks.filter((task) => task.completed));
  //   }
  // }, []);

  const fetchTasks = async () => {
    const response = await fetch("/api/completed_task", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <div style={styles.container}>
        <h1>Completed Tasks</h1>
        <ul style={styles.taskList}>
          {tasks.length === 0 ? (
            <li>No Completed Tasks</li>
          ) : (
            tasks.map((task) => (
              <li key={task._id} style={styles.taskItem}>
                {task.text}
              </li>
            ))
          )}
        </ul>
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

export default CompletedTasks;
