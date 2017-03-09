import React,{Component} from 'react'
import {render} from 'react-dom'
import Item from '../Item'

export default class List extends Component{
    
    render (){
        const display = this.props.comments.length === 0 ? 'block' : 'none'
        const list = this.props.comments.map((comment, index) => {
            return (
                <Item key={index} comment={comment} index={index}/>
            )
        })
        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                <h2 style={{display: display}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {list}
                </ul>
            </div>
        )
    }
}

