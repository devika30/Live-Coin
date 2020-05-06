import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {
  state={
    currency:[]
  }
handleClick=()=>{
  axios.get('https://api.coinlore.net/api/tickers/')
  .then(res=>{
  this.setState({
    currency:res.data.data
    })
  })
}
componentDidMount=()=>{
  this.handleClick();
};
convertNum = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + 'B'
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + 'M'
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(labelValue));
};

  render() {
    console.log(this.state.currency)
    return (
     <div>
        <header className='text-center header bg-dark'>
          <h4 className="header">Live-Coin</h4>
          <button className='btn btn-dark mb-2 success' onClick={this.handleClick()}><i class="fas fa-sync-alt"></i>
            Refresh
          </button>
        </header>
      <table class="table table-dark">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Name</th>
          <th scope="col">Symbol</th>
          <th scope="col">Price $</th>
          <th scope="col">Market Cap</th>
          <th scope="col">Volume</th>
          <th scope="col">Change 1H</th>
          <th scope="col">Change 24H</th>
          <th scope="col">Change 7D</th>
          
        </tr>
      </thead>
      <tbody>
        {
          this.state.currency.map((data,key)=>{
            return(
              <tr key={key}>
                  <td>{data.rank}</td>
                  <td>{data.name}</td>
                  <td>{data.symbol}</td>
                  <td>{data.price_usd}</td>
                  <td>{this.convertNum(data.market_cap_usd)}</td>
                  <td>{this.convertNum(data.volume24)}</td>
                  {
                    data.percent_change_1h>0 ?(
                      <td style={{color:"#10b921"}}>
                        <td>{data.percent_change_1h}</td>
                      </td>
                    ):(
                      <td style={{color:"#f06967"}}>
                        {data.percent_change_1h}
                        </td>
                    )
                    
                  }
                  {
                     data.percent_change_7d>0 ?(
                      <td style={{color:"#10b921"}}>
                        <td>{data.percent_change_7d}</td>
                      </td>
                    ):(
                      <td style={{color:"#f06967"}}>
                        {data.percent_change_7d}
                        </td>
                    )
                  }

                  {
                    data.percent_change_24h>0 ?(
                      <td style={{color:"#10b921"}}>
                        <td>{data.percent_change_24h}</td>
                      </td>
                    ):(
                      <td style={{color:"#f06967"}}>
                        {data.percent_change_24h}
                        </td>
                    )
                  } 
                
              </tr>
            )
          })
        }
      </tbody>
    </table>
     </div>
    )
  }
}

export default App

