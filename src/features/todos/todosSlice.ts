import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// Import the `RootState` type:
import { RootState } from "../../app/store";

type TodoId = string;

type Todo = {
  id: TodoId;
  title: string;
  completed: boolean;
};

type TodosState = {
  list: Todo[];
};

const initialState: TodosState = {
    list: [],
  };

export const todosSlice = createSlice({
    // A name, used in action types:
    name: "todos",
    
    // The initial state:
    initialState,
    
    // An object of "case reducers". 
    // Key names will be used to generate actions:
    reducers: {
      addTodo(
        // Arguments of actions are basically the same.
        // The first one is the state,
        // the second one is an action.
        state: TodosState, 
         
        // `PayloadAction` is a generic-type
        // that allows you to specify an action
        // with a typped payload.
        // In our case, this payload is of `Todo` type:
        action: PayloadAction<Todo>
      ) {
        // RTK allows us to write 
        // “mutating” logic in reducers. 
        // It doesn't actually mutate the state 
        // because it uses the Immer library,
        // which detects changes to a "draft state" 
        // and produces a brand new
        // immutable state based off those changes:
        state.list.push(action.payload);
      },
      toggleTodo(
        // You can skip typing the state,
        // it will be inferred from the `initialState`.
        // I prefer to explicitly type everything I can
        // but this is not obligatory.
        // For example, this will work as well:
        state, 
        action: PayloadAction<TodoId>
      ) {
        const index = state.list.findIndex(
          ({ id }) => id === action.payload);
        
        if (index) {
          state.list[index].completed = !state.list[index].completed;
        }
      },
    },
  });

// Export all of the actions:
export const { addTodo, toggleTodo } = todosSlice.actions;

// It is a convention to export reducer as a default export:
export default todosSlice.reducer;
// Create and export the selector:
export const selectTodos = (state: any) => state.todos.list;