import React from 'react'
import './rotation.css'


function getName(id, array){
    for (var champion in array.data){
      if (array.data[champion].key ==   id){
        return array.data[champion].id 
      }
    }
  }


const Rotation = (props =>{
    return (
        <div className="rotation">
                <center>Free Week</center> 
            {props.rotation.map(champion =>(
                <div className="block">
                     <img  src={`dragontail-9.20.1/9.20.1/img/champion//${getName(champion, props.champions)}.png`} style={{width: 40, height: 40}}/>
                </div>
                
    ))}
        </div>
    )
})

export default Rotation