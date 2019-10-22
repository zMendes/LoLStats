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
    key : 'RGAPI-0226107a-306f-4f72-8b90-df1306f3200d',
    status: "",
    server_status: false,
    rotation : [],
    matches: [],
    gameMode: "",
    isPlaying: false,
    matchesInfo: [],
    match: []
      }
    }




  handleChange = (event)=>{
    let name = event.target.name
    this.setState({[name]  : event.target.value })
  }
  


  handleSubmit = (event)=>{
    event.preventDefault(); 
    
    this.setState({submitted: false})
  
    
    this.getRankedStats()
  }
      

  async getId(){

    
    let URL =`https://${this.state.server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${this.state.summoner}?api_key=${this.state.key}`
    let response = await fetch(URL)
    let result = await response.json();
  
    return [result.id, result.profileIconId, result.accountId]

  }

  isPlaying = async () =>{
    let URL = `https://${this.state.server}.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${this.state.id}?api_key=${this.state.key}`
    await fetch(URL)
    .then(res => res.json())
    .then(data =>{
      this.setState({
        gameMode: data.gameType
      })

    })

    if (this.state.gameMode === "MATCHED_GAME"){
      this.setState({isPlaying : true})
    }
    else{this.setState({isPlaying: false})}
  }

  getMatchesPlayed = async ()=>{
    console.log("pegando matches de:", this.state.accountId)
    let URL = `https://${this.state.server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${this.state.accountId}/?api_key=${this.state.key}`
    await fetch(URL)
    .then(res =>res.json())
    .then(data =>{
      console.log(data.matches.slice(0,9), "PEGANDO PARTIDAS DE:", this.state.summoner, this.state.accountId)
      this.setState({ 
        matches: data.matches.slice(0,9)
      })
    })

  }
  
  getMatchHist = async (gameId) =>{
    let URL = `https://${this.state.server}.api.riotgames.com/lol/match/v4/matches/${gameId}?api_key=${this.state.key}`
    await fetch(URL)
    .then(res => res.json())
    .then(data =>{
      this.setState({
        match: data
      })
        })
  }
  getMasteries = async  ()=> {
    
    let  a = await this.getId()
    console.log(this.state.accountId, "AAAAAAAAAANTES DO SET")
    this.setState({
      id: a[0],
      profileIconId: a[1],
      accountId: a[2]
      
    })
    console.log(this.state.accountId, 'DPSSSSSSSSSSSSSS DO SET')
    await this.getMatchesPlayed()
    this.setState({matchesInfo:[]})
    this.state.matches.map(async match=>{
      //lista.push(match.gameId)
      await this.getMatchHist(match.gameId)
      this.state.matchesInfo.push(this.state.match)
    })
    

    console.log("Atualizei o matchesInfo")
    //this.setState({matchesInfo:lista})
    


    await this.isPlaying()
    //https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/1HcKHDjWIyH9DL_WIRs0jpoeszZk2XGkdSP3YNnLY728-A?api_key=RGAPI-79c9aba9-baf0-4611-a9ca-ea4b57b532ed
    let URL = `https://${this.state.server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${this.state.id}?api_key=${this.state.key}`
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
    let URL = `https://${this.state.server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${this.state.id}/?api_key=${this.state.key}`
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
    
    let URL = `https://${this.state.server}.api.riotgames.com/lol/status/v3/shard-data/?api_key=${this.state.key}`
    fetch(URL)  
    .then(res => res.json())
    .then(data =>{
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
          {this.state.submitted  ? <Matches   info={this.state.matchesInfo} id={this.state.id} champions={champion}/> : null}
          <Dados dados={this.state.dados} champions={champion} />  
          </div>
          </div>
          <h1></h1>
        
        </div>
        </div>
      )}
    }
  

export default App;