import * as actionTypes from "./actionTypes";
import {
  actionStart,
  actionFail,
  fetchTodoSuccess,
  submitTodoSuccess,
  markAsCompletedSuccess,
  deleteTodoSuccess,
  resetError,
  logoutUserData,
} from "./fetchTodo.js";



test("actionStart runs without error", () => {
  const actionType = actionTypes.FETCH_TODO_START;

  expect(actionStart(actionType)).toEqual({
    type: actionType,
  });
});

test("actionFail runs without error", () => {
  const actionType = actionTypes.FETCH_TODO_FAIL;
  const inputError = "Request failed with status code 401";

  expect(actionFail(inputError, actionType)).toEqual({
    type: actionType,
    error: inputError,
  });
});

test("fetchTodoSuccess runs without error", () => {
  const todo = [
    {
      "-MVSiQiKk_syfF9JsBkx": { completed: false, delete: false, todo: "1" },
    },
    {
      "-MVSiR0oDck8IDv3HtqJ": { completed: false, delete: false, todo: "2" },
    },
    { "-MVSiRNuIGz7PHDbPhQo": { completed: true, delete: false, todo: "3" } },
    {
      "-MVSiSdowPA5Cc1WlcnR": { completed: false, delete: false, todo: "4" },
    },
    {
      "-MVacg3vLa0YlgUnvBxW": { completed: false, delete: false, todo: "5" },
    },
  ];

  const actionType = actionTypes.FETCH_TODO_SUCCESS;

  expect(fetchTodoSuccess(todo)).toEqual({
    type: actionType,
    todos: todo,
  });
});

test("submitTodoSuccess runs without error", () => {
  const newTodo = { completed: false, delete: false, todo: "6" };
  const newEndpoint = "-MVacg3vLa0YlgUnvBxW";
  const actionType = actionTypes.SUBMIT_TODO_SUCCESS;

  expect(submitTodoSuccess(newTodo, newEndpoint)).toEqual({
    type: actionType,
    newTodo: newTodo,
    newEndpoint: newEndpoint,
  });
});

test("markAsCompletedSuccess runs without error", () => {
  const randomIndex = 1;
  const actionType = actionTypes.MARK_AS_COMPLETED_SUCCESS;

  expect(markAsCompletedSuccess(randomIndex)).toEqual({
    type: actionType,
    index: randomIndex,
  });
});

test("deleteTodoSuccess runs without error", () => {
  const randomIndex = 3;
  const actionType = actionTypes.DELETE_TODO_SUCCESS;
  const oldTodosInput = [
    {
      "-MVSiQiKk_syfF9JsBkx": { completed: false, delete: false, todo: "1" },
    },
    {
      "-MVSiR0oDck8IDv3HtqJ": { completed: false, delete: false, todo: "2" },
    },
    { "-MVSiRNuIGz7PHDbPhQo": { completed: true, delete: false, todo: "3" } },
    {
      "-MVacg3vLa0YlgUnvBxW": { completed: false, delete: false, todo: "5" },
    },
  ];

  expect(deleteTodoSuccess(oldTodosInput, randomIndex)).toEqual({
    type: actionType,
    index: randomIndex,
    oldTodos: oldTodosInput,
  });
});

test("resetError runs without error", () => {
  const actionType = actionTypes.RESET_ERROR;
  const errorTypeInput = "tooManyTodos";

  expect(resetError(errorTypeInput)).toEqual({
    type: actionType,
    errorType: errorTypeInput,
  });
});

test("logoutUserData runs without error", () => {
  const actionType = actionTypes.LOGOUT_USER_DATA;

  expect(logoutUserData()).toEqual({
    type: actionType,
  });
});
