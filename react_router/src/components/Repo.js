import React from 'react'

export default function Repo({params}) {
    const {username, repName} = params
    return <h2>用户名：{username}，仓库名:{repName}</h2>
}