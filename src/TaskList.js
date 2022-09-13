import React from "react";

export default function TaskList({setData, tasks, setTasks}) {
  const deleteData = (task) => {
    fetch("https://63105e48826b98071a3f58a5.mockapi.io/todos/" + task.id, {
      method: "DELETE",
    }).then((res) => res.json());
    setTasks((prevState) => prevState.filter((item) => item.id !== task.id));
  };

  const putData = (task) => {
    const fetchOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        content: task.name,
        isCompleted: !task.isCompleted,
        id: task.id,
      }),
    };
    fetch(
      `https://63105e48826b98071a3f58a5.mockapi.io/todos/${task.id}`,
      fetchOptions
    )
      .then((res) => console.log(res))
      .catch(function (res) {
        console.log(res);
      });
  };

  const editData = (task, newContent) => {
    const fetchOptions = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        content: newContent,
        isCompleted: task.isCompleted,
        id: task.id,
      }),
    };
    fetch(
      `https://63105e48826b98071a3f58a5.mockapi.io/todos/${task.id}`,
      fetchOptions
    )
      .then((res) => console.log(res))
      .then(() => setData());
  };

  return (
    <ul id="myUL">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={task.isCompleted ? "checked" : ""}
          onClick={(e) => {
            if (e.target.localName !== "li") return;
            putData(task);
            e.target.className =
              e.target.className === "checked" ? "" : "checked";
          }}
        >
          {task.content + " "}

          {/* delete button */}
          <span
            className="delete"
            onClick={() => {
              if(!window.confirm("Are you sure")) return
              deleteData(task);
            }}
          >
            <i class="fa fa-trash"></i>
          </span>

          {/* edit button */}
          <span
            className="edit"
            onClick={() => {
              const newContent = prompt("Edit task: ");
              if(newContent.length < 3 || !newContent) alert("Minimum 3 character")
              else editData(task, newContent);
            }}
          >
            <i class="fa fa-pencil" aria-hidden="true"></i>
          </span>
        </li>
      ))}
    </ul>
  );
}
