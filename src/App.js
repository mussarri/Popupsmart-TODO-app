import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskList from "./TaskList";
import Header from "./Header";
import { useEffect, useState } from "react";
import { useTheme } from "./context/Context";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const setData = () => {
    setIsLoading(true);
    const url = "https://63105e48826b98071a3f58a5.mockapi.io/todos";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .finally(() => setIsLoading(false));
  };
  const handleClickTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark")
  }
  useEffect(() => setData(), []);
  return (
    <div className="App" data-theme={theme}>
      <button className="theme" onClick={() => handleClickTheme()}>{theme.toUpperCase()}</button>
      <Header setData={setData} />
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <TaskList setData={setData} setTasks={setTasks} tasks={tasks}/>
      )}
    </div>
  );
}

export default App;
