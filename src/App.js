import { useEffect, useState } from "react";
import data from "./data";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Form from "./components/Form";
import { FaCheckCircle } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState(data);
  const [show, setShow] = useState(false);

  const handleDrag = (element) => {
    if (!element.destination) return;
    const { source, destination } = element;
    console.log(element);
    const newData = tasks;
    const sourceSecIndex = newData.findIndex((e) => e.id == source.droppableId);

    const sourceSection = newData[sourceSecIndex];
    const destinationSecIndex = newData.findIndex(
      (e) => e.id == destination.droppableId
    );

    const destinationSection = newData[destinationSecIndex];
    const sourceTask = [...sourceSection.tasks];
    const destinationTask = [...destinationSection.tasks];
    const [removed] = sourceTask.splice(source.index, 1);
    console.log(removed);

    if (source.droppableId != destination.droppableId) {
      destinationTask.splice(destination.index, 0, removed);
      newData[sourceSecIndex].tasks = sourceTask;
      newData[destinationSecIndex].tasks = destinationTask;
      setTasks(newData);
    } else {
      newData[sourceSecIndex].tasks = sourceTask;
      newData[sourceSecIndex].tasks.splice(destination.index, 0, removed);
      setTasks(newData);
    }
  };

  const addNewTask = (e) => {
    const newData = tasks;
    newData[0].tasks.splice(0, 0, e);
    setTasks([...newData]);
  };

  const handleModal = (e) => {
    if (document.querySelector(`.${e}`).className == `modal ${e}`) {
      document.querySelector(`.${e}`).className = `modal ${e} show`;
      setShow(true);
    } else {
      document.querySelector(`.${e}`).className = `modal ${e}`;
      setShow(false);
    }
  };

  {
    show
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }

  return (
    <div className="App">
      <Form addNewTask={addNewTask} />
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
                                  onClick={() => handleModal(section.id)}
                                >
                                  <h5>
                                    <span
                                      className={`${
                                        task.id == "Completed" ? "sho" : "icon"
                                      }`}
                                    >
                                      <FaCheckCircle />
                                    </span>
                                    {section.title}
                                  </h5>

                                  {provided.placeholder}
                                  <div className={`modal ${section.id}`}>
                                    <h2>{section.title}</h2>
                                  </div>
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
