    // src/App.js

import React, {Component} from 'react'
import Dados from './components/dados'
import RankedStats from './components/rankedStats'
import champion from './champion.js'
import Rotation from './components/rotation'
import Matches from './components/matches'
import './App.css'


class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
    summoner: "",
    submitted: false,
    dados:[],
    id: "",
    accountId: "",
    ranked_stats: [],
    server: "br1",
    profileIconId: 0,
    key : 'RGAPI-c88f45c0-637e-422d-bf03-8d8969cc912e',
    status: "",
    server_status: false,
    rotation : [],
    matches: [],
    gameMode: "",
    isPlaying: false
      }
    }




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
    console.log(URL)
    let response = await fetch(URL)
    let result = await response.json();
  
    return [result.id, result.profileIconId, result.accountId]

  }

  isPlaying = async () =>{
    URL = `https://${this.state.server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${this.state.id}?api_key=${this.state.key}`
    await fetch(URL)
    .then(res => res.json())
    .then(data =>{
      console.log(data, "DATA DENTRO DO ISPLAYYUNG")
      this.setState({
        gameMode: data.gameType
      })

    })

    console.log("game modeeeeee", this.state.gameMode)
    if (this.state.gameMode === "MATCHED_GAME"){
      this.setState({isPlaying : true})
    }
    else{this.setState({isPlaying: false})}
  }

  getMatchesPlayed = async ()=>{
    URL = `https://${this.state.server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}/?api_key=${this.state.key}`
    console.log(URL, "get ammdmtshcees played")

    await fetch(URL)
    .then(res =>res.json())
    .then(data =>{
      this.setState({
        matches: data.matches.slice(0,9)
      })
    })

  }
  
  getMasteries = async  ()=> {
    let  a = await this.getId()
    console.log("AAAAAAAAAAAAAA", a)
    console.log("print no MASTERIES ESSE 'O RETURN DO GET ID", a)
    this.setState({
      id: a[0],
      profileIconId: a[1],
      accountId: a[2]
      
    })

    await this.getMatchesPlayed()
    await this.isPlaying()
    //https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/1HcKHDjWIyH9DL_WIRs0jpoeszZk2XGkdSP3YNnLY728-A?api_key=RGAPI-79c9aba9-baf0-4611-a9ca-ea4b57b532ed
    URL = `https://${this.state.server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.state.id}?api_key=${this.state.key}`
    console.log(URL)
    fetch(URL)
    .then(res => res.json())
    .then((data) => {
      this.setState({ 
        dados: data.slice(0,18),
      })
  })
    .catch(console.log)
  }


  getRankedStats = async () =>{
    await this.getMasteries()
    URL = `https://${this.state.server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.state.id}/?api_key=${this.state.key}`
    console.log(URL)
    fetch(URL)  
    .then(res => res.json())
    .then(data =>{
      this.setState({
        ranked_stats : data[0],
        submitted : true 
      })
    })
  } 

  componentDidMount = () =>{
    
    URL = `https://${this.state.server}.api.riotgames.com/lol/status/v3/shard-data/?api_key=${this.state.key}`
    console.log(URL)
    fetch(URL)  
    .then(res => res.json())
    .then(data =>{
      console.log(data)
      this.setState({
        status : data.services[0].status
      })
    })
    URL = `https://${this.state.server}.api.riotgames.com/lol/platform/v3/champion-rotations/?api_key=${this.state.key}`
    fetch(URL)
    .then(res => res.json())
    .then(data =>{
      this.setState({rotation: data.freeChampionIds})
    })


    
    if (this.state.status == "online"){
      this.setState({server_status: true})
    }
  }



  render () {
  
  

      return (
        <div>
          <div>
            <div className="header">
          <h1>LoL Stats</h1>
          </div>
          Server:{this.state.status ? <img src="online.png" style={{width: 12, height: 15}}/>: <img src="offline.png" style={{width: 15, height: 15}}/>}

          <Rotation rotation={this.state.rotation} champions={champion}/>


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
          
          {this.state.isPlaying ? <p>Em jogo</p> : null}
          <div className="grid">

          
          {this.state.submitted ? <RankedStats dados={this.state.ranked_stats} summoner={this.state.summoner} profileIconId={this.state.profileIconId} /> : null}
          {this.state.submitted  ? <Matches matches={this.state.matches} champions={champion}/> : null}
          <Dados dados={this.state.dados} champions={champion} />  
          </div>
          </div>
          <h1></h1>
        
        </div>
        </div>
      )}
    }
  

export default App;