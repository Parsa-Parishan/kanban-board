import { useState } from "react";
import data from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState(data);

  return (
    <div className="App">
      <DragDropContext>
        <main>
          {tasks.map((task) => {
            return (
              <Droppable key={task.id} droppableId={task.id}>
                {(provided) => {
                  <div
                    className="tasks"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2>{task.title}</h2>
                    {task.tasks.map((section) => {
                      return (
                        <div className="task">
                          <h5>{section.title}</h5>
                        </div>
                      );
                    })}
                  </div>;
                }}
              </Droppable>
            );
          })}
        </main>
      </DragDropContext>
    </div>
  );
}

export default App;
