import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemAction';
import DeleteButton from './DeleteButton';
import UpdateItemModal from './updateItemModal';
import CompleteTask from './CompleteTask';

function TodoList(props) {
  const {
    getItems,
    item: { items },
  } = props;
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ id, name, completed }, index) => {
            return (
              <CSSTransition key={index} timeout={500} classNames="fade">
                <ListGroupItem>
                  <DeleteButton id={id} />
                  <CompleteTask completed={completed} id={id} />
                  <UpdateItemModal id={id} />
                  {name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(TodoList);
