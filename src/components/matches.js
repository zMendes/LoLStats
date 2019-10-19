import React from 'react'
import './matches.css'



function getName(id, array){
    for (var champion in array.data){
      if (array.data[champion].key ==   id){
        return array.data[champion].id 
      }
    }
  }

const Matches = (props =>{
    return (
        <div className = "grid-matches">
          <p>Partidas recentes</p>
            {props.matches.map(match => (
                <div className="played">
                    {`${getName(match.champion, props.champions)}`}<img src={`dragontail-9.20.1/9.20.1/img/champion//${getName(match.champion, props.champions)}.png`} style={{width: 40, height: 40}}/>
                    
                </div>
            ))}
        </div>
    )

})


export default Matches