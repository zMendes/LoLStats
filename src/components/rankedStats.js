
import React from 'react'

import './rankedStats.css'

const RankedStats = (props =>{
    return (
    <div className= "stats">
        
        <center><img className="icon"src={`dragontail-9.20.1/9.20.1/img/profileicon/${props.profileIconId}.png`} style={{width: 60, height: 60}}/></center>
        <center>{`  ${props.summoner}`}</center>
        <p><img src={`ranked-emblems/Emblem_${props.dados.tier}.png`}  style={{width: 40, height: 40}}/>{`Rank:  ${props.dados.tier} ${props.dados.rank}`} </p>
        <div className="rest">
        <p>{props.dados.wins + props.dados.losses} games played</p>
        <p>Winratio {Math.round(props.dados.wins/(props.dados.losses + props.dados.wins)*100)}%</p>
        </div>
    </div>
    )
})
    

export default RankedStats