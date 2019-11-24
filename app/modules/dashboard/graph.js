import React from 'react';
import {addCommasToNumber} from '../../utils/helpers';
import './graph.scss';

const colors = ['#00FF57', '#00A3FF', '#FF0000', '#0500FF', '#00FFF0', '#FF00F5', '#AD00FF', '#FF0F00', '#FF00E5', '#FF000F', '#FFC700', '#00D1FF'];

class Graph extends React.Component {
  render() {
    const data = this.props.data;
    let numValue = [];
    for (let iter = 0; iter < data.length; iter++) {
      numValue.push(data[iter].value);
    }
    const maxValue = Math.max(...numValue);
    const minValue = Math.min(...numValue);
    const verticalInterval = Math.ceil(maxValue/5);

    return (
      <div className="graph">
        <div className="bars">
          {data.map((item, index) => {
            return (
              <div key={`bar-${item.value}`} className="item">
                <div className="fill" style={{
                  backgroundColor: colors[index],
                  height: `${((item.value/maxValue)*100)}%`,
                }}>
                  <div className="percent">{addCommasToNumber(item.value)}</div>
                </div>
                <div className="label">{item.month}</div>
              </div>
            )
          })}
        </div>
        <div className="hor_lines">
          <div className="item">
            <div className="line"/>
            <div className="label">{addCommasToNumber(verticalInterval*5)}</div>
          </div>
          <div className="item">
            <div className="line"/>
            <div className="label">{addCommasToNumber(verticalInterval*4)}</div>
          </div>
          <div className="item">
            <div className="line"/>
            <div className="label">{addCommasToNumber(verticalInterval*3)}</div>
          </div>
          <div className="item">
            <div className="line"/>
            <div className="label">{addCommasToNumber(verticalInterval*2)}</div>
          </div>
          <div className="item">
            <div className="line"/>
            <div className="label">{addCommasToNumber(verticalInterval)}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Graph;
