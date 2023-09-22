import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const user = "sebatian-lopez";
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  async function enterInfo(evento) {
    if (evento.key === "Enter" && inputValue) {
      setTasks([...tasks, { done: false, label: inputValue }]);
      setInputValue("");
    }
  }

  const deleteItem = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  useEffect(() => {
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
      method: "PUT",
      body: JSON.stringify(tasks),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [tasks]);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await fetch(
          `https://playground.4geeks.com/apis/fake/todos/user/${user}`
        );

        if (!response.ok) {
          alert(
            `Error status is: ${response.status} ${
              response.status === 404
                ? `: The user "${user}" doesn't exist`
                : ""
            }`
          );
        } else {
          const responseJson = await response.json();
          setTasks(responseJson);
        }
      } catch (error) {
        console.error(error);
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
          method: "POST",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    };

    fetchTaskList();
  }, [user]);

  return (
    <>
      <div>
        <h1 className="text-center">Que tengo que hacer?</h1>
        <ul>
          <li>
            <input
              type="text"
              onChange={(event) => setInputValue(event.target.value)}
              onKeyUp={enterInfo}
              value={inputValue}
              placeholder="Write new task here"
            />
          </li>
          {tasks.map((item, index) => (
            <li
              className="d-flex justify-content-between"
              key={`tasks${index}`}
            >
              <div>{item.label}</div>
              <div className="borrar-icono">
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ color: "#ff0000" }}
                  onClick={() => deleteItem(index)}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-between">
		<div>{tasks.length} tasks</div>
          <button className="eliminar-todo" onClick={deleteAllTasks}>Eliminar todo</button>
        </div>
      </div>
    </>
  );
};

export default Home;
