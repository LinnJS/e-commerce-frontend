import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items'

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // get cache
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log({data})
    // filter out deleted item
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // put items back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  render() {
    return (
      <div>
        <Mutation
          mutation={DELETE_ITEM_MUTATION}
          variables={{ id: this.props.id }}
          update={this.update}
        >
          {(deleteItem, { error }) => (
            <button
              onClick={() => {
                if (confirm('Are you sure?')) deleteItem();
              }}
            >
              {this.props.children}
            </button>
          )}
        </Mutation>
      </div>
    );
  }
}

export default DeleteItem;
