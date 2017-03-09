import React,{Component} from 'react'
import Pubsub from 'pubsub-js'
import axiox from 'axios'

export default class UserList extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstView:true,
            loading:false,
            users:[],
            error:false
        }
    }
    componentWillMount(){
        Pubsub.subscribe('doSearch',(message,searchName) =>{
            this.setState({
                firstView:false,
                loading:true
            })
            
            const url = `https://api.github.com/search/users?q=${searchName}`
            axiox.get(url)
                .then( response =>{
                    const items = response.data.items
                    const users = items.map(item =>{
                        return {
                            html_url:item.html_url,
                            avatar_url: item.avatar_url,
                            login:item.login
                        }
                    })
                    this.setState({
                        loading:false,
                        users
                    })
                })
                .catch(errorMsg => {
                    this.setState({
                        error:errorMsg.toString()
                    })
                })
        })
    }
    render (){
        const {firstView,loading,users,error} = this.state
        if(firstView){
            return <h2>Welcome!!!</h2>
        }else if(loading){
            return <h2>Loading...</h2>
        }else if(error){
            return <h2>{error}</h2>
        }else{
            const userList = users.map((user,index) =>{
                return (
                    <div key={index} className="card">
                        <a href={user.html_url} target="_blank">
                            <img src={user.avatar_url} style={{width: '100px'}}/>
                        </a>
                        <p className="card-text">{user.login}</p>
                    </div>
                )
            })
            return (
                <div>{userList}</div>
            )
        }
    }
}