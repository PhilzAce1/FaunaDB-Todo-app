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
import { addItem } from '../actions/itemAction';
import { API, graphqlOperation } from 'aws-amplify';

const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      completed
    }
  }
`;
function ItemModal(props) {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const newItem = {
        name: name,
      };

      const data = await API.graphql(
        graphqlOperation(createTodo, { input: newItem })
      );
      console.log(data);
      const {
        data: { createTodo: createTodoData },
      } = data;

      addItem(createTodoData);

      // Add item via addItem action
      props.addItem(newItem);

      // Close modal
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
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
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
