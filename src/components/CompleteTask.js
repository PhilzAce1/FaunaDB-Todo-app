import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { markAsCompleted } from '../actions/itemAction';
import { API, graphqlOperation } from 'aws-amplify';
const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      completed
      createdAt
      updatedAt
    }
  }
`;
function CompleteTask({ completed, id, markAsCompleted }) {
  async function taskCompleted(taskId) {
    console.log(completed, taskId);
    try {
      const data = await API.graphql(
        graphqlOperation(updateTodo, {
          input: { id: taskId, completed: !!!completed },
        })
      );
      console.log(data);
      const {
        data: { updateTodo: updatedTask },
      } = data;
      markAsCompleted(updatedTask);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Button
      className="remove-btn"
      color="primary "
      onClick={() => taskCompleted(id)}
    >
      {completed === true ? '✔' : '⚪'}
    </Button>
  );
}
const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { markAsCompleted })(CompleteTask);
