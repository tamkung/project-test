import React from 'react';
import { Link } from 'react-router-dom';
function CardItem(props) {
  return (
    <>
      <br />
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>
          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt=''
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{props.text}</h5>
          </div>

          <div className='cards__item__info' style={{ textAlign: "right" }}>
            <div>
              {/* <Link className='cards__item__text'>Edit</Link> &nbsp;&nbsp;
              <Link className='cards__item__text'>Delete</Link> */}
            </div>
          </div>


        </Link>
      </li>
    </>
  );
}

export default CardItem;
