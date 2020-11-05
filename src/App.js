import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoView from "./components/TodoView";
export default class App extends Component {
  state = {
    todoList: [
      {
        id: uuidv4(),
        todo: "Walk the dog",
        editToggle: false,
      },
      {
        id: uuidv4(),
        todo: "Buy Milk",
        editToggle: false,
      },
      {
        id: uuidv4(),
        todo: "Clean shorts",
        editToggle: false,
      },
    ],
    todoValue: "",
    editValue: "",
    showErrorMessage: false,
    showNoTodosMessage: false,
    disableEditButton: false,
    appHandelUpdateSubmit: true
  };
  handleInputChange = (event) => {
    //console.log(event.target.name, event.target.value);
    if (this.state.showErrorMessage) {
      this.setState({
        showErrorMessage: false,
      });
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.todoValue.length === 0) {
      this.setState({
        showErrorMessage: true,
      });
      return;
    }
    let newTodoObj = {
      id: uuidv4(),
      todo: this.state.todoValue,
    };
    let newArray = [...this.state.todoList, newTodoObj];
    // let newArray = [...this.state.todoList];
    // newArray.push(newTodoObj);
    this.setState(
      {
        todoList: newArray,
        todoValue: "",
      },
      () => {
        if (this.state.todoList.length > 0) {
          this.setState({
            showNoTodosMessage: false,
          });
        }
      }
    );
  };
  // showTodoList = () => {
  //   return this.state.todoList.map(({ id, todo }) => {
  //     return <li key={id}>{todo}</li>;
  //   });
  // };
  addFunc = () => {
    console.log("Add Func");
  };
  appHandleDeleteTodo = (targetID) => {
    //console.log("ID: ", id);
    let copiedArray = [...this.state.todoList];
    let filteredArray = copiedArray.filter(({ id }) => {
      return id !== targetID;
    });
    this.setState(
      {
        todoList: filteredArray,
      },
      () => {
        // console.log("-----" + "inside setState");
        if (this.state.todoList.length === 0) {
          this.setState({
            showNoTodosMessage: true,
          });
        }
      }
    );
    // console.log("outside setSTate");
    // if (this.state.todoList.length === 0) {
    //   this.setState({
    //     showNoTodosMessage: true,
    //   });
    // }
  };
  appHandleEditTodo = (targetID) => {
    let copiedArray = [...this.state.todoList];
    //loop through the array
    //get the targetID and flip false to true
    let editTodoValue;

    let updatedTodoArray = copiedArray.map((item) => {
      if (item.id === targetID) {
        item.editToggle = true;
        editTodoValue = item.todo;
      }
      return item;
    });
    this.setState({
      todoList: updatedTodoArray,
      editValue: editTodoValue,
      disableEditButton: true,
    });
  };

  appHandleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  appHandleUpdateSubmit = (targetID) =>{
    let copiedArray =[...this.state.todoList];

    let updatedToDoArray = copiedArray.map((item)=>{
      if(item.id === targetID) {
        item.editToggle = false;
        item.todo = this.state.editValue
      }
      return item;
    });

    this.setState({
      todoList: updatedToDoArray,
      disableEditButton: false
    })
  }




  render() {
    const {
      todoList,
      showErrorMessage,
      showNoTodosMessage,
      editValue,
      disableEditButton,
      
    } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {showErrorMessage ? (
          <div style={{ color: "red", marginTop: 10 }}>
            Please, enter something todo!
          </div>
        ) : null}
        <input
          onChange={this.handleInputChange}
          style={{ marginTop: 20 }}
          type="text"
          name="todoValue"
          value={this.state.todoValue}
        />{" "}
        <button onClick={this.handleSubmit}>Add</button>
        {/* <ul>{this.showTodoList()}</ul> */}
        {/* <ul style={{ listStyle: "none" }}>
          {this.state.todoList.map(({ id, todo }) => {
            return <li key={id}>{todo}</li>;
          })}
        </ul> */}
        {showNoTodosMessage ? (
          <div style={{ marginTop: 10, color: "blue" }}>
            Please add something to do!
          </div>
        ) : (
          <TodoView
            todoList={todoList}
            appHandleDeleteTodo={this.appHandleDeleteTodo}
            appHandleEditTodo={this.appHandleEditTodo}
            appHandleOnChange={this.appHandleOnChange}
            editValue={editValue}
            disableEditButton={disableEditButton}
            appHandleUpdateSubmit={this.appHandleUpdateSubmit}
            // nameString={"Hamster"}
            // age={123}
            // arrayObject={[1, 2, 3]}
            // trueOrFalse={false}
            // addFunc={this.addFunc}
            // obj={{ 1: 1, 2: 2, 3: 3 }}
          />
        )}
      </div>
    );
  }
}