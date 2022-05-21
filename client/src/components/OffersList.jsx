import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const OffersList = ({buyActive, filtredOffers, filtredSellOffers}) => {
  const [active, setActive] = useState(false)
  
  const handleFav = () => {
    if(!active){
      return <img src="/img/favorites.png" alt="" />
    } else {
      return (<img src="/img/favoritesblack.png" alt="" />)
    }
  }
  const handleCol = (id) => {
    setActive(true)
  }
  
  const whichList = () => {
    if(buyActive){
      if(filtredOffers.length !== 0){
        return( 
          filtredOffers.map(offer => 
            <li className="market-list__item" key={offer.id}>
              <p className='offer-project'>{offer.project}</p>
              <p className='offer-rating'>0.00</p>
              <p className='offer-description'>{offer.shortDescription}</p>
              <p className='offer-price'>{offer.price}</p>
              <p className='offer-favorites' onClick={handleCol}>
                {handleFav()}
              </p>
              <Link to={`/buy-offer/${offer.id}`} >
                <p className='offer-button_btn'>Buy</p>
              </Link>
            </li>
          )
        )
      } else {
        return <h1>No offers</h1>
      }
    } else{
      if(filtredSellOffers.length !== 0){
        console.log(filtredSellOffers)
        return( 
          filtredSellOffers.map(offer => 
            <li className="market-list__item" key={offer.id}>
              <p className='offer-project'>{offer.project}</p>
              <p className='offer-rating'>0.00</p>
              <p className='offer-description'>{offer.shortDescription}</p>
              <p className='offer-price'>{offer.price}</p>
              <p className='offer-favorites' onClick={handleCol}>
                {handleFav()}
              </p>
              <Link to={`/sell-offer/${offer.id}`} >
                <p className='offer-button_btn'>Buy</p>
              </Link>
            </li>
          )
        ) 
      } else {
        return <h1>No offers</h1>
      }
    }
  }
  return (
    <div className="market">
      <ul className='market-list'>
        {whichList()}
      </ul>
    </div>
  )
}

export default OffersList