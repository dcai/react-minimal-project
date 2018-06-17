import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Button from './Button.jsx';
import { fetchData, fetchGithubRepo } from '../actions.js';

class GithubRepoList extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    githubRepoData: PropTypes.arrayOf(PropTypes.object),
    lang: PropTypes.string,
    loading: PropTypes.bool,
    perPage: PropTypes.number,
  };
  static defaultProps = {
    githubRepoData: [],
    lang: 'js',
    loading: true,
    perPage: 3,
  };

  onChange = evt => {
    const query = evt.target.value;
    if (query.length < 3) {
      return;
    }
    const { lang, perPage } = this.props;
    // this.props.fetch(query);
    this.props.dispatch(
      fetchGithubRepo({
        query,
        lang,
        perPage,
      }),
    );
  };

  render() {
    const items = this.props.githubRepoData;
    return (
      <div>
        <h4>react repos</h4>
        <div className="form-group">
          <label htmlFor="repoQuery">
            Name:
            <input type="text" onChange={this.onChange} className="form-control" id="repoQuery" />
          </label>
        </div>
        {this.props.loading && 'loading'}
        <ul>
          {items.length > 0
            ? items.map(item => (
                <li key={item.full_name}>
                  <img alt="" src={item.owner.avatar_url} width={24} />{' '}
                  <a href={item.url}> {item.full_name} </a>
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
    githubRepoData: state.githubRepoData.items || [],
    loading: state.ui.loading || false,
  }),
  dispatch => ({
    dispatch,
  }),
)(GithubRepoList);
