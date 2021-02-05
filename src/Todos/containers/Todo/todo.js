import React, { Component } from "react";
import TodoList from "../../components/TodoList/todoList";
import Spinner from "../../components/Spinner/spinner";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import SignOutButton from "../../../Authentication/components/UI/SignOutButton/SignOutButton";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import "./todo.css";

export class Todo extends Component {
  state = {
    inputText: "",
    showWarning: false,
  };

  componentDidMount() {
    if (this.props.token) {
      this.props.onFetchTodo(this.props.token, this.props.userId);
    }
  }

  inputChangedHandler = (event) => {
    event.preventDefault();
    this.setState({ inputText: event.target.value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    console.log("submit handler");
    if (this.state.inputText == "") {
      this.setState({ showWarning: true });
    } else if (
      this.props.token !== null &&
      this.props.userId !== null &&
      !this.props.loading
    ) {
      let newTodo = {
        todo: this.state.inputText,
        completed: false,
        delete: false,
      };
      let updatedTodos = [];

      if (this.props.todos) {
        updatedTodos = [...this.props.todos, newTodo];
      } else {
        updatedTodos.push(newTodo);
      }
      console.log(updatedTodos);

      //if (this.props.token && this.props.userId){
      this.props.onSubmitTodo(
        this.props.userId,
        updatedTodos,
        this.props.token
      );
      this.setState({ inputText: "" });
      // }
    }
  };

  todoDelete = (index) => {
    let endpoint = this.props.endpointsArr[index];
    if (endpoint && this.props.token && this.props.userId) {
      this.props.onDeleteTodo(
        endpoint,
        index,
        this.props.todos,
        this.props.token,
        this.props.userId
      );
    }
  };

  todoCompleted = (index) => {
    let endpoint = this.props.endpointsArr[index];
    if (endpoint && this.props.token && this.props.userId) {
      this.props.onMarkAsCompleted(
        endpoint,
        index,
        this.props.todos[index],
        this.props.token,
        this.props.userId
      );
    }
  };

  closeWarning = () => {
    this.setState({ showWarning: false });
  };

  render() {
    let todoList = null;
    let showWarningProps= this.state.showWarning ? {errorText: "Input field is empty!", errorType: "warning"} : {errorText: "", errorType: "warning"} 

    if (this.props.todos.length > 0 && !this.props.loading) {
      console.log("test");
      todoList = (
        <TodoList
          todos={this.props.todos}
          todoDelete={this.todoDelete}
          todoCompleted={this.todoCompleted}
          inputChangedHandler={this.inputChangedHandler}
        />
      );
    }

    if (this.props.todos.length == 0 && this.props.loading) {
      todoList = <Spinner />;
    }

    return (
      <div class="todoComponent">
        <SignOutButton />
        <form class={!this.props.todos ? "initialForm" : undefined}>
          <input
            type="text"
            value={this.state.inputText}
            class="todo-input"
            onChange={this.inputChangedHandler}
          />
          <button
            class="todo-button"
            type="submit"
            onClick={this.submitHandler}
          >
            <i class="fas fa-plus-square"></i>
          </button>
        </form>
        <ErrorMessage error={{errorText: this.props.fetchTodoError, errorType: "errorFetchingTodos"}} />
        <ErrorMessage error={{errorText: this.props.submitTodoError, errorType:"errorChangingTodos"}} /> 

        {todoList}
         
        <ErrorMessage
          error={showWarningProps}
          closeWarning={this.closeWarning}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos,
    endpointsArr: state.todos.endpointsArr,
    loading: state.todos.loading,
    fetchTodoError: state.todos.fetchTodoError,
    submitTodoError: state.todos.submitCompleteDeleteTodoError,
    submitTodoSuccess: state.todos.submitTodoSuccess,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTodo: (token, userId) => dispatch(actions.fetchTodo(token, userId)),
    onSubmitTodo: (userId, newTodo, token) =>
      dispatch(actions.submitTodo(userId, newTodo, token)),
    onMarkAsCompleted: (endpoint, index, todo, token, userId) =>
      dispatch(actions.markAsCompleted(endpoint, index, todo, token, userId)),
    onDeleteTodo: (endpoint, index, todos, token, userId) =>
      dispatch(actions.deleteTodo(endpoint, index, todos, token, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
