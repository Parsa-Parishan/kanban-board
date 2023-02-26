import { useState } from "react";
import data from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [tasks, setTasks] = useState(data);

  const handleDrag = (element) => {
    if (!element.destination) return;
    const { source, destination } = element;
    const newData = tasks;
    if (source.droppableId != destination.droppableId) {
      const sourceSecIndex = newData.findIndex(
        (e) => e.id == source.droppableId
      );
      const destinationSecIndex = newData.findIndex(
        (e) => e.id == destination.droppableId
      );

      const sourceSection = newData[sourceSecIndex];
      const destinationSection = newData[destinationSecIndex];
      console.log(sourceSection, destinationSection);

      const sourceTask = [...sourceSection.tasks];
      const destinationTask = [...destinationSection.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      newData[sourceSecIndex].tasks = sourceTask;
      newData[destinationSecIndex].tasks = destinationTask;

      setTasks(newData);
    }
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
                      className={`tasks ${task.id}`}
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
