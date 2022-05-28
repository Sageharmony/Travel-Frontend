import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
const [destination, setDestination] = useState([])
const [location, setLocation] = useState('')
const [sights, setSights] = useState([])
const [img, setImg] = useState('')
const [restaurants, setRestaurants] = useState([])
const [time, setTime] = useState('')
const [cost, setCost] = useState(2)

const handleLocation = (event) =>{
  setLocation(event.target.value)
}
const handleSights = (event) =>{
  setSights(event.target.value)
}
const handleImg = (event) =>{
  setImg(event.target.value)
}
const handleRestaurants = (event) =>{
  setRestaurants(event.target.value)
}
const handleTime = (event) =>{
  setTime(event.target.value)
}
const handleCost = (event) =>{
  setCost(event.target.value)
}

const addLocation = (event) =>{
  event.preventDefault()
  axios.post(
    '/', {
      location: location,
      mustSee: sights,
      image: img,
      restaurantsToTry: restaurants,
      bestTime: time,
      costPerPerson: cost
    
    }
  ).then(() =>{
    axios.get('/').then( (response) =>{
      ServiceWorkerContainer(response.data)
    })
  })
}


const handleLocationUpdate = (event, locationData) =>{
  event.preventDefault();
  axios.put(`/${locationData}`,
    {
    location: location,
    mustSee: sights,
    image: img,
    restaurantsToTry: restaurants,
    bestTime: time,
    costPerPerson: cost
  }).then(() =>{
    axios.get('/').then((response) =>{
      setDestination(response.data)
    })
  })
}

useEffect(()=>{
  axios 
      .get('')
      .then((response)=>{
        setDestination(response.data);
      })
},[])








  return (
    <>
    <h1>Travel Blog</h1>
    <form onSubmit={addLocation}>
      Name: <input type='text' onChange={handleLocation}></input>
      image: <input type='text' onChange={handleImg}></input>
      Must See: <input type='text' onChange={handleSights}></input>
      Top Restuants: <input type="number" onChange={handleRestaurants}></input>
      Average Cost Per-Person: <input type='text' onChange={handleCost}></input>
      Best Time of Year: <input type='text' onChange={handleTime}></input>
      <input type="submit" value='Add Location'/>
    </form>
     <h1>Top Spots</h1>
     {destination.map((spots) =>{
      return(
      <div key={spots._id}>
        <h4>{spots.location}</h4>
        <h4>{spots.sights}</h4>
        <h4>{spots.img}</h4>
        <h4>{spots.restaurants}</h4>
        <h4>{spots.cost}</h4>
        <h4>{spots.time}</h4>
      </div>
       )
       })} 
    
    
    
    
    
    
    </>
  )
}

export default App;
