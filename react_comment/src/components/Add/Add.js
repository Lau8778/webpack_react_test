import React,{Component} from 'react'
import {render} from 'react-dom'
import PubSub from 'pubsub-js'

Date.prototype.format = function (str) {
    const year = this.getFullYear();
    const month = this.getMonth() + 1;
    const day = this.getDate();
    let hour = this.getHours();
    if(hour < 10){
        hour = '0' + hour
    }
    let min = this.getMinutes();
    if(min < 10){
        min = '0' + min
    }
    let sec = this.getSeconds();
    if(sec < 10){
        sec = '0' + sec
    }
    let result = null
    switch (str){
        case 'yyyy-MM-DD':
            result =  year + '/' + month + '/' + day
            break
        case 'HH:mm:ss':
            result =  hour + ':' + min + ':' + sec
            break
        default:
            result =  year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec
    }
    return result
}

export default class Add extends Component{
    
    sub = () =>{
        const subTime = new Date().format()
        const comment = {
            username:this.refs.username.value,
            content:this.refs.content.value,
            subTime:subTime,
            stars:0
        }
        //消息发布
        PubSub.publish('add',comment)
        //清空输入框
        this.refs.username.value = ''
        this.refs.content.value = ''
    }
    
    render () {
        return (
            <div className="col-md-4">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label>用户名</label>
                        <input type="text" className="form-control" placeholder="用户名" ref="username"/>
                    </div>
                    <div className="form-group">
                        <label>评论内容</label>
                        <textarea className="form-control" rows="6" placeholder="评论内容" ref="content"></textarea>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default pull-right" onClick={this.sub}>提交</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

