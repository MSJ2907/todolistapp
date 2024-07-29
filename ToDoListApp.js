import React, { useState } from 'react';

function ToDoListApp() {
  const [taskList, setTaskList] = useState([]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [taskEditIndex, setTaskEditIndex] = useState(-1);
  const [editedTaskText, setEditedTaskText] = useState('');

  const addNewTask = () => {
    if (newTaskInput) {
      setTaskList([...taskList, newTaskInput]);
      setNewTaskInput('');
    }
  };

  const removeTask = (taskIndex) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(taskIndex, 1);
    setTaskList(updatedTaskList);
  };

  const initiateTaskEdit = (taskIndex) => {
    setTaskEditIndex(taskIndex);
    setEditedTaskText(taskList[taskIndex]);
  };

  const saveEditedTask = () => {
    if (editedTaskText) {
      const updatedTaskList = [...taskList];
      updatedTaskList[taskEditIndex] = editedTaskText;
      setTaskList(updatedTaskList);
      cancelTaskEditing();
    }
  };

  const cancelTaskEditing = () => {
    setTaskEditIndex(-1);
    setEditedTaskText('');
  };

  return (
    <div className="task-management-app">
      <h2>Task Management</h2>
      <input
        type="text"
        placeholder="Enter a new task"
        value={newTaskInput}
        onChange={(e) => setNewTaskInput(e.target.value)}
      />
      <button onClick={addNewTask}>Add Task</button>
      <ul>
        {taskList.map((task, index) => (
          <li key={index}>
            {taskEditIndex === index ? (
              <input
                type="text"
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
              />
            ) : (
              task
            )}
            <button onClick={() => initiateTaskEdit(index)}>Edit</button>
            <button onClick={() => removeTask(index)}>Delete</button>
            {taskEditIndex === index && (
              <button onClick={saveEditedTask}>Save</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoListApp;