import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter';
import summary from '../summary.csv';
import * as UiActions from '../actions/ui';

// import io from 'socket.io-client';
// const socket = io('http://localhost:8081/summary');

function mapStateToProps(state) {
  return state;
}
function mergeProps(stateProps, dispachProps, ownProps) {
  const result = Object.assign({}, ownProps, stateProps, dispachProps);
  result.counter = {
    ...stateProps.counter,
    ...dispachProps.counter,
  };
  return result;
}
function mapDispatchToProps(dispatch) {
  return {
    counterActions: {...bindActionCreators(CounterActions, dispatch)},
    uiActions: {...bindActionCreators(UiActions, dispatch)},
  };
}
class App extends React.Component {
  static propTypes = {
    children: React.PropTypes.object,
    counterActions: React.PropTypes.shape({
      getLine:React.PropTypes.func.isRequired,
    }),
    uiActions:React.PropTypes.shape({
      updateUi:React.PropTypes.func.isRequired,
      loading:React.PropTypes.bool.isRequired,
    }),
    ui: React.PropTypes.object,
  };

  componentDidMount() {
    setTimeout(()=>{
      // let counter =0;
      const summaryAr=summary.split(/\n/);
      summaryAr.map((line)=>{
        // counter++;
        // console.log(counter + ' of ' + summaryAr.length);
        setTimeout(()=>{
          this.props.uiActions.loading(true);
          this.props.counterActions.getLine(line);
        });
      });
      this.props.uiActions.updateUi({'loadDone':true});
    });
    // let counter =0;
    // socket.on('msg', (data)=>{
    //   counter++;
    //   setTimeout(()=>{
    //     this.props.counterActions.getLine(data.line);
    //   });
    //   console.log(counter);
    // });
    // socket.on('endMsgs', ()=>{
    //   console.log('end lines');
    //   this.props.uiActions.updateUi({'loadDone':true});
    //   counter = 0;
    // });
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children,
    (child) => React.cloneElement(child, {...this.props}));

    return (
      <div className="app-wrapper">
        <section className="workspace">
          {childrenWithProps}
        </section>
      </div>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App);
