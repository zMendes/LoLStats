    // src/App.js

import React, {Component} from 'react'
import Dados from './components/dados'
import RankedStats from './components/rankedStats'
import champion from './champion.js'



import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
    summoner: "",
    submitted: false,
    dados:[],
    id: "",
    ranked_stats: [],
    server: "br1",
    profileIconId: 0,
    key : 'RGAPI-b3ec3043-bb11-463c-9488-000eafa91696'
  }}




  handleChange = (event)=>{
    let name = event.target.name
    this.setState({[name]  : event.target.value })
  }
  


  handleSubmit = (event)=>{
    event.preventDefault(); 
    
  
  
    
    this.getRankedStats()
  }
      

  async getId(){


    let URL =`https://${this.state.server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.summoner}?api_key=${this.state.key}`
  
    let response = await fetch(URL)
    let result = await response.json();
  
    return [result.id, result.profileIconId]

  }

  
  getMasteries = async  ()=> {
    let  a = await this.getId()
    console.log("print no MASTERIES ESSE 'O RETURN DO GET ID", a)
    this.setState({
      id: a[0],
      profileIconId: a[1]
      
    })
    //https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/1HcKHDjWIyH9DL_WIRs0jpoeszZk2XGkdSP3YNnLY728-A?api_key=RGAPI-79c9aba9-baf0-4611-a9ca-ea4b57b532ed
    URL = `https://${this.state.server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.state.id}?api_key=${this.state.key}`

    fetch(URL)
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        dados: data,
      })

  })
    .catch(console.log)
  }

  getRankedStats = async () =>{
    await this.getMasteries()
    URL = `https://${this.state.server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.state.id}/?api_key=${this.state.key}`
    fetch(URL)
    .then(res => res.json())
    .then(data =>{
      this.setState({
        ranked_stats : data[0],
        submitted : true 
      })
    })
  } 

  render () {

      return (
        <div>
          <div>
            <div className="header">
          <h1>LoL Stats</h1>
          </div>
          <div className="input">
        
          <form onSubmit={this.handleSubmit}>
            <p><input type="text" name="summoner"  value={this.state.summoner} onChange={this.handleChange}/>
            <select name="server" onChange={this.handleChange  }>
            <option  selected  value="br1">BR</option>
            <option  value="euw1">EUW</option>
            <option  value="eun1">EUNE</option>
            <option  value="jp1">JP</option>
            <option  value="kr">KR</option>
            <option  value="la1">LAN</option>
            <option  value="la2">LAS</option>
            <option  value="na1">NA</option>
            <option  value="oce1">OCE</option>
            <option  value="ru">RU</option>
            <option  value="tr1">TR</option>
            
            
            </select>
            <input className="enter" type="submit" value="Enter"></input>
            </p> 
            
            
            
            
            
          
          </form>
          </div>
          <div className="data">
            <div className="grid">
          {this.state.submitted ? <RankedStats dados={this.state.ranked_stats} summoner={this.state.summoner} profileIconId={this.state.profileIconId} /> : null}
          
          <Dados dados={this.state.dados} champions={champion} />  
          </div>
          </div>
          <h1></h1>
        
        </div>
        </div>
      )}
    }
  

export default App;