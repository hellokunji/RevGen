import React from 'react';
import {connect} from 'react-redux';
import {toastUpdate} from '../../../store/actions/layout';
import classNames from 'classnames';
import './toast.scss';
import {isDataValid} from "../../../utils/helpers";

class Toast extends React.Component {

  componentDidMount() {
    const {toast} = this.props;
    const interval = isDataValid(toast.interval) ? toast.interval : 3000;
    setTimeout(()=> {
      this.props.toastUpdate({show: false, type: null, content: {title: null, description: null}})
    }, interval)
  }

  render() {
    const {toast} = this.props;

    let iconName = '';
    if (toast.type === 'success') {
      iconName = 'checkmark-circle';
    } else if (toast.type === 'error') {
      iconName = 'cross-circle';
    } else if (toast.type === 'warning') {
      iconName = 'warning';
    } else {
      iconName = 'notification';
    }

    return (
      <div className='cmn_toast'>
        <div className={classNames('box', {
          '_success': toast.type === 'success',
          '_error': toast.type === 'error',
          '_warning': toast.type === 'warning'
        })}>
          <div className='icon'>
            <span className={`lnr-${iconName}`}/>
          </div>
          <div className='content'>
            <div className='title'>{toast.content.title}</div>
            <div className='desc'>{toast.content.description}</div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    toast: state.layout.toast
  }
};

export default connect(mapStateToProps, {toastUpdate})(Toast);
