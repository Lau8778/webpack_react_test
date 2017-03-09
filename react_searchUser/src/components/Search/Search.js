import React,{Component} from 'react'
import Pubsub from 'pubsub-js'

export default class Search extends Component{
    search = () => {
        const searchName = this.refs.searchName.value
        Pubsub.publish('doSearch',searchName)
        this.refs.searchName.value = ''
    }
    render (){
        return (
            <section className="jumbotron">
                <div className="container">
                    <h3 className="jumbotron-heading">Search Github Users</h3>
                    <div>
                        <input type="text" placeholder="enter the name you search" ref="searchName"/>
                        <button onClick={this.search}>Search</button>
                    </div>
                </div>
            </section>
        )
    }
}


    