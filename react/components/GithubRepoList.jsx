import React from 'react';
import { connect } from 'react-redux';
import Button from './Button.jsx';
import { fetchData, fetchGithubRepo } from '../actions.js';

export class GithubRepoList extends React.Component {
  onChange(evt) {
    const query = evt.target.value;
    if (query.length < 3) {
      return;
    }
    const { lang, per_page } = this.props;
    // this.props.fetch(query);
    this.props.dispatch(
      fetchGithubRepo({
        query,
        lang: lang || 'js',
        per_page: per_page || 3
      })
    );
  }
  render() {
    const items = this.props.githubRepoData;
    return (
      <div>
        <h4>react repos</h4>
        <div className="form-group">
          <label htmlFor="repoQuery">Name:</label>
          <input type="text" onChange={this.onChange.bind(this)} className="form-control" id="repoQuery" />
        </div>
        {this.props.loading && 'loading'}
        <ul>
          {items.length > 0
            ? items.map((item, index) => (
                <li key={item.full_name}>
                  <img src={item.owner.avatar_url} width={24} /> <a href={item.url}> {item.full_name} </a>
                </li>
              ))
            : 'start to type in text area'}
        </ul>
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => ({
    githubRepoData: state.githubRepoData.items || [],
    loading: state.ui.loading || false
  }),
  (dispatch, ownProps) => ({
    dispatch
  })
)(GithubRepoList);
