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
        let {username, content,subTime,stars} = this.props.comment
        const likeDis = this.state.ifLike?'block':'none'
        const oLikeDis = this.state.ifLike?'none':'block'
        console.log(subTime);
        //获取当前的时间
        const nowYear = new Date().getFullYear()
        const nowMonth = new Date().getMonth() + 1
        const nowDate = new Date().getDate()
        const nowHour = new Date().getHours()
        const nowMin = new Date().getMinutes()
        const nowSec = new Date().getSeconds()
        // console.log(nowYear, typeof nowYear);
        //将提交时间进行拆分
        let hour = +subTime.split(' ')[1].split(':')[0]
        let min = +subTime.split(' ')[1].split(':')[1]
        let sec = +subTime.split(' ')[1].split(':')[2]
        let year = +subTime.split(' ')[0].split('/')[0]
        let month = +subTime.split(' ')[0].split('/')[1]
        let day = +subTime.split(' ')[0].split('/')[2]
        //如果提交的时间距离当前时间是一个小时之内的则显示 'x分钟之前'
        if(year === nowYear){
            if(month === nowMonth && day === nowDate){
                if(nowHour === hour && nowMin === min && nowSec === sec){
                    subTime = '刚刚'
                }else if(nowHour === hour && nowMin === min){
                    subTime = (nowSec - sec) + '秒钟之前'
                }else if(nowHour === hour){
                    subTime = (nowMin - min) + '分钟之前'
                }else if((nowHour-hour)===1 && (nowMin-min)<0){
                    subTime = (60 - (min - nowMin)) + '分钟之前'
                }
            }else {
                subTime = month + '月' + day + '日'
            }
        }else{
            subTime = subTime.split(' ')[0]
        }
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
                <div className="subTime">
                    <span>{subTime}</span>
                </div>
                <p className="user"><span >{username}</span><span>说:</span></p>
                <p className="centence">{content}</p>
            </li>
        )
    }
}

