import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button.jsx';

class GithubUser extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      avatar_url: PropTypes.string,
      name: PropTypes.string,
      bio: PropTypes.string,
    }).isRequired,
    username: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  onClick = () => {
    const { username, dispatch } = this.props;
    dispatch({ type: 'USER_FETCH_REQUESTED', payload: { username } });
  };
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>{this.props.username}</h1>
        <Button onClick={this.onClick}>Fetch userinfo</Button>
        {user.avatar_url ? (
          <div>
            <img width="64" src={user.avatar_url} alt={user.name} />
            <a href={user.url}>{user.name}</a>
            {user.bio && <p>{user.bio}</p>}
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.githubUser,
  }),
  dispatch => ({
    dispatch,
  }),
)(GithubUser);
