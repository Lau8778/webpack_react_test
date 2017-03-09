import React, { Component } from 'react';
import MyLink from './MyLink'  //引入自定义的link样式

class Repos extends Component {
    constructor(props){
        super(props)
        this.state = {
            repos:[
                {username:'baidu',repName:'bmap'},
                {username:'alibaba',repName:'ant'},
                {username:'tencent',repName:'wechat'}
            ]
        }
    }
    
    render () {
        const list = this.state.repos.map((repo, index) => {
            const path = `/repos/${repo.username}/${repo.repName}`
            return(
                <li key={index}>
                    <MyLink to={path}>{repo.repName}</MyLink>
                </li>
            )
            
        })
        return (
            <div>
                <h2>React Repository</h2>
                <ul>
                    {list}
                </ul>
                {this.props.children}
            </div>
        )
    }
}

export default Repos;
