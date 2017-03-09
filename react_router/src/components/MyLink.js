import React from 'react'
import {Link} from 'react-router'

export default function MyLink(props) {
    return <Link {...props} activeClassName="active"/>
}