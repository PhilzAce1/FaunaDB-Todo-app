import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/itemAction';
const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
    }
  }
`;

function DeleteButton({ id, deleteItem }) {
  async function onDeleteClick(id) {
    try {
      const data = await API.graphql(
        graphqlOperation(deleteTodo, { input: { id } })
      );
      console.log(data);
      const {
        data: {
          deleteTodo: { id: deletedDataId },
        },
      } = data;

      deleteItem(deletedDataId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Button
      className="remove-btn"
      color="danger"
      size="sm"
      onClick={() => onDeleteClick(id)}
    >
      &times;
    </Button>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { deleteItem })(DeleteButton);
