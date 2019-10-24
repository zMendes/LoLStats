
import React from 'react'

import './rankedStats.css'

const RankedStats = (props =>{
    if (props.dados != undefined){
    return (
        <div>
    <div className= "stats" style={{backgroundColor: props.dark ? "#121212" : "white", color:props.dark ?  "white":"black"}}>
        
        <center><img className="icon"src={`dragontail-9.20.1/9.20.1/img/profileicon/${props.profileIconId}.png`} style={{width: 80, height: 80}}/></center>
        <center>{`  ${props.summoner}`}</center>
        <div className="text2">
        <img src={`ranked-emblems/Emblem_${props.dados.tier}.png`}  style={{width: 45, height: 45}}/>{`${props.dados.tier} ${props.dados.rank}`} 
        <div className="rest">
        {props.dados.wins}W/{props.dados.losses}L  {Math.round(props.dados.wins/(props.dados.losses + props.dados.wins)*100)}%
        </div>
        </div>
    </div>
    </div>
    )}
    else {return("Algo deu errado! Username invalido")}
})
    

export default RankedStats