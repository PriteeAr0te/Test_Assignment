import React, { useContext, useEffect } from 'react'
import { BsGlobe, BsBoxArrowInDownRight, BsGraphUp, BsListCheck } from 'react-icons/bs';
import dataContext from '../Context/Data/dataContext';
import Barchart from './Barchart';
import Linechart from './Linechart';
import Likelihood from './Likelihood';
import CombinedLikelihood from './CombinedLikelihood';

const Home = () => {
  const { data, getData } = useContext(dataContext);

  useEffect(() => {
    // eslint-disable-next-line 
    getData();
    // eslint-disable-next-line 
  }, [])

  console.log("Data:", data);
  
  if (!data || data.length === 0) {
    // Handle the case when data is not yet available
    return <div>Loading...</div>;
  }

  const sectorCount = data.reduce((count, item) => {
    count[item.sector] = (count[item.sector] || 0) + 1;
    return count
  }, {})

  const uniqueCountries = [...new Set(data.map(item => item.country))];
  const countriesCount = uniqueCountries.length;
  const totalEntries = data.length;
  const avgRelevance = data.length > 0
    ? data.reduce((sum, item) => sum + (isNaN(item.relevance) ? 0 : item.relevance), 0) / data.length
    : 0;



  const mostCommonSector = Object.keys(sectorCount).reduce((a, b) => sectorCount[a] > sectorCount[b] ? a : b);

  return (
    <main className='main-container'>
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Countries</h3>
            <BsGlobe className='card-icon' size={20} />
          </div>
          <h1>{countriesCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Total Entries</h3>
            <BsListCheck className='card_icon' />
          </div>
          <h1>{totalEntries}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Average Relevance</h3>
            <BsGraphUp className='card_icon' />
          </div>
          <h1>{avgRelevance}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Most Common Sector</h3>
            <BsBoxArrowInDownRight className='card_icon' />
          </div>
          <h1>{mostCommonSector}</h1>
        </div>
      </div>

      <div className='charts'>
        <div className='barchart-container'>
          <h3>Top Countries by Count</h3>
          <Barchart data={data} />
        </div>
        <div className='linechart-container'>
          <h3>Top Sectors by Intensity</h3>
          <Linechart data={data} />
        </div>
        <div className='linechart-container'>
          <Likelihood dimension="topic" data={data} />
        </div>
        <div className='linechart-container'>
          <CombinedLikelihood dimensions={['likelihood', 'relevance', 'region']} />
        </div>
      </div>

    </main>
  )
}

export default Home;