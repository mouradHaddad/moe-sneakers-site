import React from 'react'
import Link from 'next/link'

import { urlFor } from '../lib/client'
const HeroBanner = ({ heroBanner }) => {
  return (
    <div className='hero-banner-container' style={{backgroundImage: `url(${urlFor(heroBanner.image)})`, backgroundSize: 'cover'}}>
        <div>
            <p className='beats-solo'>{heroBanner.smallText}</p>
            <h3>{heroBanner.midText}</h3>
            <h1 style={{'color' : '#eb0844', 'opacity': '0.7', 'textTransform': 'capitalize', 'textShadow' : '5px black'}}>{heroBanner.largeText1}</h1>
            {/* <img src={urlFor(heroBanner.image )} alt="Sneakers" className='hero-banner-image'  style={{'marginTop' : '20px', 'opacity' : '0.6  '}}/> */}
        </div>
        <div>
          <Link href="/product/ID">
            <button type='button'>{heroBanner.buttonText}</button>
          </Link>
          <div className='desc'>
            <h3 style={{ color: '#f3f3f3', opacity: '0.7', marginBottom: '280px', textTransform: 'uppercase'}}>{heroBanner.desc}</h3>
          </div>
        </div>

    </div>
  )
}

export default HeroBanner