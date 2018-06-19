import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { searchUsers } from '../actions.js';

class UserSearch extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  };
  static defaultProps = {
    users: [],
    loading: true,
  };

  onChange = evt => {
    const name = evt.target.value;
    this.props.dispatch(searchUsers({ name }));
  };

  render() {
    const { users } = this.props;
    return (
      <div>
        <h4>Users</h4>
        <div className="form-group">
          <label htmlFor="user-query">
            Name:
            <input type="text" onChange={this.onChange} className="form-control" id="user-query" />
          </label>
        </div>
        {this.props.loading && 'loading'}
        <ul style={{ listStyleType: 'none' }}>
          {users.length > 0
            ? users.map(user => (
                <li key={user.uuid}>
                  <img alt={user.name} src={user.avatar} width={24} /> {user.name}
                </li>
              ))
            : 'start to type in text area'}
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    users: state.users.users || [],
    loading: state.ui.loading || false,
  }),
  dispatch => ({
    dispatch,
  }),
)(UserSearch);
