import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Collections</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
        
          <h3> New Project</h3>
          <br/>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text=' Future Car '
              label='Car'
              path='#'
            />
            <CardItem
              src='images/iron_man.jpg'
              text=' Iron Man Suit  '
              label='Avenger'
              path='#'
            />
          </ul>
          <h3>Popular</h3>
          <br/>
          <ul className='cards__items'>
            <CardItem
              src='images/Captain_America_Shield.jpg'
              text=' Captain America Shield '
              label='Avenger'
              path='#'
            />
            <CardItem
              src='images/Shuttle.jpg'
              text='SpaceX Reuse Space Shuttle'
              label='Space'
              path='#'
            />
            <CardItem
              src='images/metaverse.jpg'
              text='A New Investment Idea in The Metaverse Universe'
              label='Social'
              path='#'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
