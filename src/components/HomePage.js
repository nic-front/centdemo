import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/homeActions';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {}
  }

  setField = (field) => {
    return (e) => {

      this.setState({
        [field]: e && e.target ? e.target.value : e
      });
    }
  };

  calculate = () => {
    const { dispatch } = this.props;
    dispatch(actions.calculate(this.state.a, this.state.b));
  };

  render() {
    return <div>
        <h1>Cent Demo</h1>

        <h2>Sum of 2 integers</h2>
        <table>
          <tbody>
            <tr>
              <td><label htmlFor="newMpg">A</label></td>
              <td><input  name="inputA" onChange={this.setField('a')}  value={this.state.a} />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="tradeMpg">B</label></td>
              <td><input  name="inputB" onChange={this.setField('b')} value={this.state.b} />
              </td>
            </tr>
            <tr>
              <td><input type="submit" value="Sum" onClick={this.calculate} /></td>
              <td><label htmlFor="milesDriven">{this.props.home.sum}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(HomePage);

