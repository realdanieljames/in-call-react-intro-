import React from "react";
import { arrayOf, shape, number, string } from "prop-types";

import "./TodoView.css";

const TodoView = ({
  todoList,
  appHandleDeleteTodo,
  appHandleEditTodo,
  appHandleOnChange,
  editValue,
  disableEditButton,
  appHandleUpdateSubmit,
}) => {
  //console.log(todoList);

  const todoViewHandleDeleteButton = (id) => {
    //console.log("ID: ", id);
    appHandleDeleteTodo(id);
  };

  // const todoViewHandleEditToButton = (id) => {
  //   appHandleEditTodo(id);
  // };

  return (
    <ul style={{ listStyle: "none" }}>
      {todoList.map(({ id, todo, editToggle }) => {
        return (
          <li key={id} style={{ margin: 20 }}>
            {
              //if editToggle is true show input otherwise show todo
              editToggle ? (
                <input
                  type="text"
                  value={editValue}
                  name="editValue"
                  onChange={(event) => appHandleOnChange(event)}
                  //onChange={appHandleOnChange()}
                />
              ) : (
                <span> {todo}</span>
              )
            }

            {editToggle ? (
              <span
                className="todo-button-shared-style edit-button"
                onClick={() => appHandleUpdateSubmit(id)}
              >
                Update
              </span>
            ) : (
              <span
                onClick={() => appHandleEditTodo(id)}
                className={`todo-button-shared-style edit-button ${
                  disableEditButton ? "disabled" : ""
                }`}
              >
                Edit
              </span>
            )}
            <span
              onClick={() => todoViewHandleDeleteButton(id)}
              className={`todo-button-shared-style delete-button ${
                disableEditButton ? "disabled" : ""
              }`}
            >
              Delete
            </span>
          </li>
        );
      })}
    </ul>
  );
};

// TodoView.propTypes = {
//   nameString: PropTypes.string.isRequired,
// };

TodoView.propTypes = {
  todoList: arrayOf(
    shape({
      id: string.isRequired,
      todo: string.isRequired,
    })
  ),
};

export default TodoView;
