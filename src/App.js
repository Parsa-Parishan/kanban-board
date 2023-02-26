import { useState } from "react";
import data from "./data";

function App() {
  const [tasks, setTasks] = useState(data);

  return (
    <div className="App">
      {tasks.map((task) => {
        return (
          <div className="tasks">
            <h3>{task.title}</h3>
            {task.tasks.map((section) => {
              return (
                <div className="taks">
                  <h5>{section.title}</h5>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default App;
