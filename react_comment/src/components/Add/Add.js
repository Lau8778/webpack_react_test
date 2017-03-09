import React,{Component} from 'react'
import {render} from 'react-dom'
import PubSub from 'pubsub-js'

export default class Add extends Component{
    
    sub = () =>{
        const comment = {
            username:this.refs.username.value,
            content:this.refs.content.value,
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

