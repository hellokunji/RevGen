import React from 'react';
import {connect} from 'react-redux';
import Fuse from 'fuse.js';
import {Link, withRouter} from 'react-router-dom';
import {facebookLoginStart, logoutStart} from '../../store/actions/auth';
import './sidebar.scss';

class Sidebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: '',
      data: props.revenueData.data,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data === null && nextProps.revenueData.data !== null) {
      return {
        data: nextProps.revenueData.data,
      }
    }
  }

  handleLogout = () => {
    firebase.analytics().logEvent('logout');
    firebase.auth().signOut().then(() => {
      this.props.logoutStart();
    }).catch(function (error) {
      // An error happened.
    });
  };

  onChangeInput = value => {
    const {revenueData} = this.props;
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        'company'
      ]
    };
    let data = revenueData.data;
    if (value !== '') {
      const fuse = new Fuse(revenueData.data, options);
      data = fuse.search(value);
    }
    this.setState({data});
  };

  render() {
    const {profile, match, revenueData} = this.props;
    const {data} = this.state;
    return (
      <div className="sidebar">
        <div className="top">
          <div className="color_bar">
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
          </div>
          <div className="info">
            <div className="profile">
              <img src={profile.picture.data.url} alt="image"/>
              <span>{profile.first_name}</span>
            </div>
            <div className="logout">
              <button onClick={this.handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="companies">
          <div className="search">
            <input placeholder="Search..." onChange={e => this.onChangeInput(e.target.value)}/>
            <img src="/img/magnifier.png" alt="search icon"/>
          </div>
          <div className="list">
            {data !== null && (
              <React.Fragment>
                {data.map(item => {
                  return (
                    <div key={item.slug} className={match.params.company === item.slug ? 'item item_active' : 'item'}>
                      <Link to={`/dashboard/${item.slug}`}>
                        <div className="box">
                          <div className="info">
                            <div className="title">{item.company}</div>
                            <div className="country">{item.country}</div>
                          </div>
                          <div className="logo">
                            <img src="/img/next.png" alt="Success"/>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.auth.profile,
    revenueData: state.revenue.revenueData
  };
};

export default withRouter(connect(mapStateToProps, {facebookLoginStart, logoutStart})(Sidebar));
