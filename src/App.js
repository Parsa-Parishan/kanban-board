import { useState } from "react";
import data from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState(data);

  const handleDrag = (e) => {
    console.log(e);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDrag}>
        <main>
          {tasks.map((task) => {
            return (
              <Droppable key={task.id} droppableId={task.id}>
                {(provided) => {
                  return (
                    <div
                      className="tasks"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <h2>{task.title}</h2>
                      {task.tasks.map((section, index) => {
                        return (
                          <Draggable
                            key={section.id}
                            index={index}
                            draggableId={section.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className="task"
                                  key={section.id}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  style={{
                                    ...provided.draggableProps.style,
                                    opacity: snapshot.isDragging ? "0.5" : "1",
                                  }}
                                >
                                  <h5>{section.title}</h5>

                                  {provided.placeholder}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
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
