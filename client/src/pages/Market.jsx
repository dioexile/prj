import React, { useState, useEffect } from 'react'
import OffersList from '../components/OffersList'
import '../css/market.css'
import { Link } from 'react-router-dom'
import '../css/controls.css'
import { fetchOffers } from '../http/offerApi';
import { fetchSellOffers } from '../http/SellOfferApi';

const Market = () => {
  const [offerList, setOfferList] = useState([])
  const [sellOfferList, setSellOfferList] = useState([])
  const [buyActive, setBuyActive] = useState(true)
  const [sellActive, setSellActive] = useState(false)
  const [value, setValue] = useState('')
  const sellStyles = ['sell-btn']
  const buyStyles = ['buy-btn']

  useEffect(() => {
    fetchOffers().then(data => setOfferList(data.reverse()))
    fetchSellOffers().then(data => setSellOfferList(data.reverse()))
  }, [])


  const filtredOffers = offerList.filter(offer => {
    return offer.project.toLowerCase().includes(value.toLowerCase())
  })

  const filtredSellOffers = sellOfferList.filter(offer => {
    return offer.project.toLowerCase().includes(value.toLowerCase())
  })

  if (buyActive){
    buyStyles.push('buy-active')
  }
  if(sellActive){
    sellStyles.push('sell-active')
  }
  const handleBuy = () => {
    setSellActive(false)
    setBuyActive(true)
  }

  const handleSell = () => {
    setSellActive(true)
    setBuyActive(false)
  }
  
  const sell = () => {
    if(buyActive){
      return (
        <Link to="create-offer">
          <button className='create-offer'>
            Create a sale offer
          </button>
        </Link>
      )
    } else {
      return(
        <Link to="sell-offer">
          <button className='create-offer'>
            Create a purchase offer
          </button>
        </Link>
      )
    }
  }
  return (
    <main className='main-page'>
      <div className="market-title">
        <h1 className='title'>Massive Crypto Trade: сообщество криптопространства</h1>
        <p className="desc">Торговая площадка, где люди могут делится друг с другом сделками напрямую и на своих условиях практически из любой страны.</p>
      </div>
      <div className="controls">
        <div className="market-controls">
          <div className="conrols-btns">
            <div className="market-button">
              <div className={buyStyles.join(' ')} onClick={handleBuy}>buy</div>
              <div className={sellStyles.join(' ')} onClick={handleSell}>sell</div>
            </div>
            <div className="controls-input">
              <input type="text" placeholder='Search' value={value} onChange={(e) => setValue(e.target.value)}/>
              <button >
                <img src="/img/search_icon.svg" alt="" className="search-icon"/>
              </button>
            </div>
          </div>
          <div className="controls-right">
            {/* <div className="my-offers">
              <button>My offers</button>
            </div> */}
            {sell()}
          </div>
        </div>
      </div> 
      <div className='container'>
        <div className="columns">
          <ul className='columns-list'>
            <li className='columns-nick'>
              Project
            </li>
            <li className='columns-rating'>
              Rating
            </li>
            <li className='columns-description'>
              Description
            </li>
            <li className='columns-price'>
              Price
            </li>
          </ul>
        </div>
        <OffersList 
          buyActive={buyActive} 
          offerList={offerList} 
          sellOfferList={sellOfferList} 
          filtredSellOffers={filtredSellOffers} 
          filtredOffers={filtredOffers}/>
      </div>
    </main>
  )
}

export default Market





// const inputHandler = (e) => {
  //   if(e.key==='Enter'){
  //     setOfferList(filtredOffers = offerList.filter(offer => {
  //       return offer.project.toLowerCase().includes(value.toLowerCase())
  //     }))
  //     if(!value){
  //       fetchOffers().then(data => setOfferList(data))
  //     }
  //     setValue('')
  //   }
  // }
  // const handleSearch = () => {
    
  //   setOfferList()
  //   if(!value){
  //     fetchOffers().then(data => setOfferList(data))
  //   }
  //   setValue('')
  // }