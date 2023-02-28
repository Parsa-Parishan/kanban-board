import React, { useState } from "react";

export default function Form({ addNewTask }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: `${e.target[0].value} ${Math.random() * 5}`,
      title: e.target[0].value,
    };
    setText("");
    addNewTask(newTask);
  };
  return (
    <div className="add-task">
      <h3>Create a New Task</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          id="title"
          required="required"
          dir="ltr"
          onChange={handleChange}
          value={text}
          // onKeyPress={validate}
        />
        <input type="submit" className="submit" />
      </form>
    </div>
  );
}
