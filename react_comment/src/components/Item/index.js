import React,{Component} from 'react'
import PubSub from 'pubsub-js'
import {Icon} from 'antd'

export default class Item extends Component{
    constructor(props){
        super(props)
        this.state = {
            ifLike:false
        }
    }
    delete = () =>{
        const index = this.props.index
        const username = this.props.comment.username
        if(confirm(`确定要删除${username}的评论吗？`)){
            //消息发布
            PubSub.publish('delete', index)
        }
    }
    like = () =>{
        const index = this.props.index
        const {ifLike} = this.state
        if(!ifLike){
            this.setState({ifLike:true})
            //发布消息
            PubSub.publish('addStar', index)
        } else {
            this.setState({ifLike:false})
            //发布消息
            PubSub.publish('cancelStar', index)
        }
    }
    
    render (){
        const {username, content,stars} = this.props.comment
        const likeDis = this.state.ifLike?'block':'none'
        const oLikeDis = this.state.ifLike?'none':'block'
        return (
            <li className="list-group-item" >
                <div className="handle">
                    <a href="javascript:;" onClick={this.delete}>删除</a>
                </div>
                <div className="compliment">
                    <a href="javascript:;" onClick={this.like}>
                        <Icon type="like" style={{display: likeDis}}/>
                        <Icon type="like-o" style={{display: oLikeDis}}/>
                    </a>
                </div>
                <div className="stars">
                    <span>{stars}</span>
                </div>
                <p className="user"><span >{username}</span><span>说:</span></p>
                <p className="centence">{content}</p>
            </li>
        )
    }
}

