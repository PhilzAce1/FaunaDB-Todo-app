import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, deleteTodo, updateTodo, listTodos } from './actions';
export async function CreateTodo(name) {
  try {
    const {
      data: { createTodo: createTodoData },
    } = await API.graphql(
      graphqlOperation(createTodo, {
        input: { name },
      })
    );
    return createTodoData;
  } catch (error) {
    console.error(error);
  }
}

export async function UpdateTodo(id, name) {
  const {
    data: { updateTodo: updatedTodo },
  } = await API.graphql(
    graphqlOperation(updateTodo, {
      input: { id, name },
    })
  );
  return updatedTodo;
}

export async function GetAllTodo() {
  const {
    data: {
      listTodos: { items },
    },
  } = await API.graphql(graphqlOperation(listTodos));
  return items;
}

export async function DeleteTodo(id) {
  const {
    data: {
      deleteTodo: { id: deletedDataId },
    },
  } = await API.graphql(graphqlOperation(deleteTodo, { input: { id } }));
  return deletedDataId;
}
