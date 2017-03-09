import React,{Component} from 'react'
import PubSub from 'pubsub-js'

import Add from '../Add/Add'
import List from '../List'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            comments:[]
        }
    }
    
    componentWillMount(){
        //模拟获得数据
        const comments = [
            {username:"lio",content:"So easy",subTime:'2017/03/08 17:03:08',stars:23},
            {username:"leon",content:"WTF!!!",subTime:'2016/06/06 16:06:06',stars:65}
        ]
        //更新数据
        this.setState({comments})
        //消息订阅,参数一为消息名称，参数二为回调函数
        //回调函数的参数一为消息名称，二为消息的内容
        PubSub.subscribe ('add', (message, comment) =>{
            this.addComment(comment)
        })
        PubSub.subscribe ('delete', (message, index) =>{
            this.deleteComment(index)
        })
        PubSub.subscribe ('addStar', (message, index) =>{
            this.addStar(index)
        })
        PubSub.subscribe ('cancelStar', (message, index) =>{
            this.cancelStar(index)
        })
    }
    //添加用户评论
    addComment = (comment) =>{
        const comments = this.state.comments
        comments.unshift(comment)
        this.setState({comments})
    }
    
    //删除用户评论
    deleteComment = (index) =>{
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({comments})
    }
    //点赞
    addStar = (index) =>{
        const comments = this.state.comments
        comments[index].stars++
        this.setState({comments})
    }
    //取消点赞
    cancelStar = (index) =>{
        const comments = this.state.comments
        comments[index].stars--
        this.setState({comments})
    }
    
    render() {
        return (
          <div className="App">
            <div className="App-header">
                <header className="site-header jumbotron">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12">
                                <h1>请发表对React的评论</h1>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
            <div>
              <div className="container">
                  <Add />
                  <List comments={this.state.comments}/>
              </div>
            </div>
          </div>
        );
    }
}

export default App;
