import React from 'react';
import {Grid, Table} from 'react-bootstrap';

export default class AppView extends React.Component {
  static propTypes = {
    counter:React.PropTypes.shape({
      manufacturersByCountry: React.PropTypes.object,
      manufacturersByGender:React.PropTypes.object,
      Month: React.PropTypes.object,
      monthsByCountry:React.PropTypes.object,
      sizesByCountry:React.PropTypes.object,
      Manufacturer:React.PropTypes.object,
      Size:React.PropTypes.object,
      DeliveryCountry:React.PropTypes.object,
    }),
    ui: React.PropTypes.object,
  };
  shouldComponentUpdate(nextProps){
    return nextProps.ui.loadDone || false;
  }

  render() {
    const list = (main,sort)=>{
      const mains = this.props.counter[main];
      const mainsSorted = Object.keys(mains).sort((a,b)=>mains[b]-mains[a]);
      return mainsSorted.map((manu, index)=>
        {
        if (index<10){
          return(
          <tr key={index}>
          <td className="first-cell">{index+1}</td>
          <td className="main-cell">{manu}</td>
          <td>
          <table><tbody>
          {sort && this.props.counter[sort][manu] && Object.keys(this.props.counter[sort][manu]).map((second, ind)=>{
            if (ind<10){
              return(
              <tr key={ind}><td>
              {second}: {this.props.counter[sort][manu][second]}
              </td></tr>);
            } else {
              return <div/>;
            }
          }
          )}
          {!sort &&
            <tr><td>{this.props.counter[main][manu]}</td></tr>
          }
          </tbody></table></td></tr>);
        } else {
          return <div/>;
        }
      }
      );
    };
    const listManusCountry = list('DeliveryCountry', 'manufacturersByCountry');
    const listManusGender = list('Gender', 'manufacturersByGender');
    const listSizesCountry = list('DeliveryCountry', 'sizesByCountry');
    const listMonths = list('Month');
    const listMonthsByCountry = list('DeliveryCountry', 'monthsByCountry');
    return (
      <Grid>
      {!this.props.ui.loadDone && <div>Please wait while we load the data...</div>}
      {this.props.ui.loading && <div>Loading...</div>}
      {this.props.ui.loadDone && <div>
        <Table striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Top Manufacturers By Country</th>
            </tr>
          </thead>
          <tbody>
          {listManusCountry}
          </tbody>
        </Table>

        <Table  striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Top Manufacturers By Gender</th>
            </tr>
          </thead>
          <tbody>
          {listManusGender}
          </tbody>
        </Table>

        <Table  striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Top Sizes By Country</th>
            </tr>
          </thead>
          <tbody>
          {listSizesCountry}
          </tbody>
        </Table>

        <Table  striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Top Months</th>
            </tr>
          </thead>
          <tbody>
          {listMonths}
          </tbody>
        </Table>

        <Table  striped hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Top Months By Country</th>
            </tr>
          </thead>
          <tbody>
          {listMonthsByCountry}
          </tbody>
        </Table>
        </div>
    }
    </Grid>
    );
  }
}
