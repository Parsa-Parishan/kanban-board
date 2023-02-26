import { useState } from "react";
import data from "./data";

function App() {
  const [tasks, setTasks] = useState(data);

  return (
    <div className="App">
      <main>
        {tasks.map((task) => {
          return (
            <div className="tasks">
              <h2>{task.title}</h2>
              {task.tasks.map((section) => {
                return (
                  <div className="task">
                    <h5>{section.title}</h5>
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </div>
  );
}

export default App;
