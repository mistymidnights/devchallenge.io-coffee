import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [coffees, setCoffees] = useState([]);
  const [activeButton, setActiveButton] = useState('All Products');

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json'
      );
      const data = await response.json();
      setCoffees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setActiveButton('All Products');
  };

  const handleAvailableNowClick = () => {
    setCoffees(coffees.filter((coffee) => coffee.available));
    setActiveButton('Available Now');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='header'>
        <img src='./bg-cafe.jpg' alt='' />
      </div>
      <div className='list-items-container'>
        <div className='container text-center'>
          <div className='row'>
            <div className='col-lg-5 col-sm-4 mx-auto  pt-5'>
              <p className='title'>Our Collection</p>
              <p className='text'>
                Introducing our Coffee Collection, a selection of unique coffees
                from different roast types and origins, expertly roasted in
                small batches and shipped fresh weekly.
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-5 col-sm-4  mx-auto d-flex justify-content-center gap-3'>
              <button
                type='button'
                className={`btn-gray ${
                  activeButton === 'All Products' ? 'active' : ''
                }`}
                onClick={() => fetchData()}
              >
                All Products
              </button>
              <button
                type='button'
                className={`btn-gray ${
                  activeButton === 'Available Now' ? 'active' : ''
                }`}
                onClick={() => handleAvailableNowClick()}
              >
                Available Now
              </button>
            </div>
          </div>
        </div>

        <div className='container text-center'>
          <div className='row'>
            <div className='list-container col-10'>
              {coffees.length > 0 ? (
                <>
                  {coffees.map((coffee) => (
                    <div className='card' key={coffee.id}>
                      <div className='img-container'>
                        <img src={coffee.image} alt='' />
                        {coffee.popular ? (
                          <p className='badge'>Popular</p>
                        ) : null}
                      </div>
                      <div className='desciption'>
                        <div className='d-flex justify-content-between'>
                          <div className='name w-auto'>{coffee.name}</div>
                          <div className='price w-auto price'>
                            {coffee.price}
                          </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between my-2'>
                          <div className='stars w-auto d-flex align-items-center gap-1'>
                            {coffee.votes > 0 ? (
                              <>
                                <img src='./Star_fill.svg' alt='' />
                                {coffee.rating}
                                <span>({coffee.votes} votes)</span>
                              </>
                            ) : (
                              <>
                                <img src='./Star.svg' alt='' />
                                <span>No rating</span>
                              </>
                            )}
                          </div>
                          {!coffee.available ? (
                            <p className='sold'>Sold out</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
