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

  let a = null  
  data.participantIdentities.map(participant =>{

    if (participant.player.summonerId==id){
      a = participant.participantId
    }
  })

  return a
}

const Matches = (props =>{
  
  console.log(props.info[0])  
  //console.log("Return do getPartId", getPartId(props.id, props.info))
  
  return (
        <div className = "grid-matches">
            {props.info.map(match=>(
              
              <div>
                {console.log(getPartId(props.id, match))}
                <img src={`dragontail-9.20.1/9.20.1/img/champion//${getName(match.participants[getPartId(props.id, match)-1].championId, props.champions)}.png`} style={{width: 40, height: 40}}/> {getName(match.participants[getPartId(props.id, match)-1].championId, props.champions)}
                <p>{match.participants[getPartId(props.id, match)-1].stats.kills}/{match.participants[getPartId(props.id, match)-1].stats.deaths}/{match.participants[getPartId(props.id, match)-1].stats.assists}</p>
                <p>{match.participants[getPartId(props.id, match)-1].stats.win ? "Win": "Loss"}</p>
                <p>CS {(match.participants[getPartId(props.id, match)-1].stats.totalMinionsKilled * 100/match.gameDuration).toFixed(2)}/min</p>  
              </div>
            ))}
        </div>
    )
})


export default Matches