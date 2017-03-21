import React from 'react';
import {Link} from '../router'

export const Footer = () => {
  return (
    <div className="Footer">
      <Link to='./'><span role="button" className="btn-gradient cyan mini">Wszystkie</span></Link>
      <Link to='./aktywne'><span role="button" className="btn-gradient blue mini">Aktywne</span></Link>
      <Link to='./zakonczone'><span role="button" className="btn-gradient red mini">Zakończone</span></Link>
    </div>
  )
}
