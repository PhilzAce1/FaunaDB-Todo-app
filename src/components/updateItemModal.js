import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { updateItem } from '../actions/itemAction';
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
    }
  }
`;
function UpdateItemModal(props) {
  const [name, setName] = useState('');
  const [modal, setModal] = useState(false);
  async function onSubmit(e) {
    e.preventDefault();

    try {
      const data = await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            name,
          },
        })
      );
      const {
        data: { updateTodo: updatedTodo },
      } = data;
      props.updateItem(updatedTodo);
      setModal(!modal);
    } catch (error) {
      console.log(error);
    }
  }
  function onChange(e) {
    setName(e.target.value);
  }
  return (
    <>
      <Button
        onClick={() => setModal(!modal)}
        size="sm"
        className="edit-button"
      >
        🖊
      </Button>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Update Todo List
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                🖊
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { updateItem })(UpdateItemModal);
