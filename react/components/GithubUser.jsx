import React from 'react';
import { connect } from 'react-redux';
import Button from './Button.jsx';

export class GithubUser extends React.Component {
  onClick(evt) {
    const { username, dispatch } = this.props;
    dispatch({ type: 'USER_FETCH_REQUESTED', payload: { username } });
  }
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>{this.props.username}</h1>
        <Button onClick={this.onClick.bind(this)}>Fetch userinfo</Button>
        <hr />
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
  (state, ownProps) => ({
    user: state.githubUser,
  }),
  dispatch => ({
    dispatch: dispatch,
  }),
)(GithubUser);
