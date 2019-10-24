import React from 'react'
import './matches.css'



function getName(id, array){
    for (var champion in array.data){
      if (array.data[champion].key ==   id){
        return array.data[champion].id 
      }
    }
  }

function getPartId(id, data){
  let a = undefined
  if (data.participantIdentities != undefined){
    
  data.participantIdentities.map(participant =>{

    if (participant.player.summonerId==id){
      a = participant.participantId
    }
  })}

  return a
}

const Matches = (props =>{
  
  if (getPartId(props.id, props.info[0])  != undefined && props.info[0].participantIdentities!= undefined){
  return (
  <div>
        <div className = "grid-matches" style={{backgroundColor: props.dark ? "#121212" : "white"}}>
            {props.info.map(match=>(
              
              <div className="match" style={{'background-color' : match.participants[getPartId(props.id, match)-1].stats.win ? 'lightgreen':'lightcoral' }}>
                <img src={`dragontail-9.20.1/9.20.1/img/champion//${getName(match.participants[getPartId(props.id, match)-1].championId, props.champions)}.png`} style={{width: 40, height: 40}}/> 
                <p>{getName(match.participants[getPartId(props.id, match)-1].championId, props.champions)}</p>
                <div className="text">
                {match.participants[getPartId(props.id, match)-1].stats.kills}/{match.participants[getPartId(props.id, match)-1].stats.deaths}/{match.participants[getPartId(props.id, match)-1].stats.assists} <br/>
                CS {((match.participants[getPartId(props.id, match)-1].stats.totalMinionsKilled /match.gameDuration)*60).toFixed(1)}/min <br/>
                {match.participants[getPartId(props.id, match)-1].stats.win ? "Win": "Loss"} <br/>
                {(match.gameDuration/60).toFixed(0)} min
                </div>
              </div>
            ))}
        </div>
        </div>
    )}
    else {return "Algo deu errado! Username invalido"}
})


export default Matches