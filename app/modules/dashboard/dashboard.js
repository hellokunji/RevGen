import React from 'react';
import {connect} from 'react-redux';
import {facebookLoginStart} from '../../store/actions/auth';
import {getRevenueDataStart} from '../../store/actions/revenue';
import {filterRevenueData} from '../../utils/helpers';
import Sidebar from './sidebar';
import Graph from './graph';
import './dashboard.scss';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {revenueData} = this.props;
    if (revenueData.apiStatus !== 'success' && revenueData.apiStatus !== 'started') {
      this.props.getRevenueDataStart();
    }
  }

  render() {
    const {match, revenueData} = this.props;
    const revenue = filterRevenueData(revenueData.data, match.params.company);
    return (
      <div className="dashboard">
        <div className="left">
          <Sidebar/>
        </div>
        <div className="main">
          <div className="title">
            {revenue === null ? 'TRENDING' : revenue.company}
          </div>
          <div className="body">
            {revenue === null ? (
              <React.Fragment>
                {revenueData.data !== null && (
                  revenueData.data.map(item => {
                    if (item.isTrending) {
                      return (
                        <div key={`trending-${item.company}`} className="trending_item">
                          <div className='title'>{item.company}</div>
                          <Graph data={item.revenue}/>
                        </div>
                      )
                    }
                  })
                )}
              </React.Fragment>
            ) : (
              <Graph data={revenue.revenue}/>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    revenueData: state.revenue.revenueData
  };
};

export default connect(mapStateToProps, {facebookLoginStart, getRevenueDataStart})(Dashboard);
