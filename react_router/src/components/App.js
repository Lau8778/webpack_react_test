import React, { Component } from 'react';
import MyLink from './MyLink'  //引入自定义的link样式

class App extends Component {
  render() {
    return (
        <div>
            <h1>React Router</h1>
            <ul>
                <li><MyLink to="/about">About</MyLink></li>
                <li><MyLink to="/repos">Repos</MyLink></li>
            </ul>
            {/*让App的子组件可以显示*/}
            {this.props.children}
        </div>
    );
  }
}

export default App;
