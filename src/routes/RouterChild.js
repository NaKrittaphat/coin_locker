import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Home from '../component/Homepage/Home'
import Socket from '../component/Socket/Socket'

export default class RouterChild extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Home} />
                <Route path="/Socket" component={Socket} />
            </div>
        )
    }
}
