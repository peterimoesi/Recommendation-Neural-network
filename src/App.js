import './App.css'

import React, {Component} from 'react';
import { Router } from 'react-router-dom';
import history from './routes/history.js';
import routes from './routes/routes.js';

const app = props => (
    <Router history={history}>
      {routes}
    </Router>
)

// class App extends Component {
//   render() {
//     return <div className="App">
//       <div className="App-heading App-flex">
//         <h2>Welcome to <span className="App-react">React</span></h2>
//       </div>
//       <div className="App-instructions App-flex">
//         <img className="App-logo" src={require('./react.svg')}/>
//         <p>Edit <code>src/App.js</code> and save to hot reload your changes.</p>
//       </div>
//     </div>
//   }
// }

export default app;

