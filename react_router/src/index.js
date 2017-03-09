import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
//引入自定义的组件
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Repos from './components/Repos';
import Repo from './components/Repo';

ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            {/*父组件默认显示的子组件*/}
            <IndexRoute component={Home}/>
            <Route path="about" component={About}/>
            <Route path="repos" component={Repos}>
                <Route path=":username/:repName" component={Repo}/>
            </Route>
        </Route>
    </Router>
    ),document.getElementById('root')
);
