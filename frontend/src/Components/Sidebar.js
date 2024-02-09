import React from 'react';
import {  BsCompass, BsHouseDoorFill, BsFilter } from 'react-icons/bs';
import { FaCalendarAlt,  FaBook, FaIndustry, FaGlobe, FaBug, FaNewspaper ,FaChartBar,FaFlag  } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
        <BsCompass className="icon-header" />  Insights Explorer
        </div>
        <span className='icon close_icon'>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to = "/">
          <BsHouseDoorFill className='icon'/> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item filters-item' >
            <BsFilter className='icon'/> Filters
          <ul className="submenu">
            <li className='sidebar-list-item'><Link to="/endyear"><FaCalendarAlt size="18" className='icon'/> End Year</Link></li>
            <li className='sidebar-list-item'><Link to="/topics"><FaBook  size="18" className='icon'/> Topics</Link></li>
            <li className='sidebar-list-item'><Link to="/sectors"><FaIndustry size="18" className='icon'/> Sectors</Link></li>
            <li className='sidebar-list-item'><Link to="/regions"><FaGlobe size="18" className='icon'/> Regions</Link></li>
            <li className='sidebar-list-item'><Link to="/pest"><FaBug size="18" className='icon'/> PEST</Link></li>
            <li className='sidebar-list-item'><Link to="sources"><FaNewspaper size="18" className='icon'/> Sources</Link></li>
            <li className='sidebar-list-item'><Link to="/swot"><FaChartBar size="18" className='icon'/> SWOT</Link></li>
            <li className='sidebar-list-item'><Link to="/countries"><FaFlag size="18" className='icon'/> Counrty</Link></li>
          </ul>
        </li>
        
      </ul>
    </aside>
  )
}

export default Sidebar
