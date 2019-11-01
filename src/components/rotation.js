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
  if (props.rotation != undefined){
    return (
      <div>
        <div className="rotation" style={{backgroundColor: props.dark ? "#121212" : "white"}}>
            {props.rotation.map(champion =>(
                <div className="block">
                     <img  src={`dragontail-9.3.1/9.3.1/img/champion/${getName(champion, props.champions)}.png`} style={{width: 40, height: 40}}/>
                </div>
                
    ))}
        </div>
        </div>
    )}else {return("Algo deu errado! Username invalido")}
})

export default Rotation