import React, { Component } from 'react';
//import Context from "./Context";



class ErrorBoundary extends Component {
  //static contextType = Context;


  constructor(props) {
  super(props);
  this.state = {
    hasError: false
  };
}

static getDerivedStateFromError(error) {
//console.log(this.context.hasError);
return { hasError: true };
}
  render() {
//console.log(this.context);
    if (this.state.hasError) {
     return (
       <h2>Something went wrong!!</h2>
     );
   }
   return this.props.children;
  }
}

export default ErrorBoundary;
