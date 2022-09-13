import React, { useState } from "react";

export default function Header({setData}) {
  const [input, setInput] = useState("");
  let userName = localStorage.getItem("username")|| ""
  if(!userName){
    userName = prompt("Username: ")
    localStorage.setItem("username", userName)
  }
  return (
    <div id="myDIV" class="header">
      <h5>Username: {userName}</h5>
      <h2>My To Do List</h2>
      <input
        type="text"
        id="myInput"
        placeholder="Enter task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <span
        className="addBtn"
        onClick={() => {
          if(input.length < 3){
            alert("Minumim length = 3")
            return
          }
          setInput("")
          fetch(
            `https://63105e48826b98071a3f58a5.mockapi.io/todos/`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                content: input,
                isCompleted: false,
              }),
            }
          )
            .then(() => setData())
            .catch(function (res) {
              console.log(res);
            });
        }}
      >
        Add
      </span>
    </div>
  );
}
