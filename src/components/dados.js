
import React from 'react'
import './dados.css'

function getName(id, array){
    for (var champion in array.data){
      if (array.data[champion].key ==   id){
        return array.data[champion].id 
      }
    }
  }
const Dados = (props => {
  if (props!= undefined){
  return (
    <div>
    <div className = "grid-mastery">
      {props.dados.map((dado) => (
            <div className="grid-itemMastery">
              <img className="champ-icons" src={`dragontail-9.20.1/9.20.1/img/champion//${getName(dado.championId, props.champions)}.png`} style={{width: 40, height: 40}}/>
            <br></br>
            <div className="name">
            {`${getName(dado.championId, props.champions)}`}
            </div>
            <ul>
              <center>
              <li>
                Level: {dado.championLevel}
              </li>
              </center>
              <center>
              <li>
                Points: {dado.championPoints}
              </li>
              </center>
            </ul>
            </div>
      ))}
    </div>
    </div>
  )}
  else{return ("Algo deu errado! Username invalido")}
})
export default Dados