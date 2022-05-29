import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
const App = () =>{

const [location, setLocation] = useState()
const [sights, setSights] = useState()
const [img, setImg] = useState()
const [restaurants, setRestaurants] = useState()
const [time, setTime] = useState()
const [cost, setCost] = useState()

const [destination, setDestination] = useState([])

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
    'http://localhost:3000/', {
      location: location,
      mustSee: sights,
      image: img,
      restaurantsToTry: restaurants,
      bestTime: time,
      costPerPerson: cost  
    }
  ).then(() =>{
    axios.get('http://localhost:3000/').then( (response) =>{
 
      setDestination(response.data)
    })
  })
}
const handleLocationUpdate = (event, locationData) =>{
  event.preventDefault();
  axios.put(`http://localhost:3000/${locationData._id}`,
    {
    location: location,
    mustSee: sights,
    image: img,
    restaurantsToTry: restaurants,
    bestTime: time,
    costPerPerson: cost
  }).then(() =>{
    axios.get('http://localhost:3000/').then((response) =>{
      setDestination(response.data)
    })
  })
}
useEffect(()=>{
  axios
      .get('http://localhost:3000/')
      .then((response)=>{
        setDestination(response.data);
      })
},[])


const handleLocationDelete = (locationData) =>{
  axios.delete(`http://localhost:3000/${locationData._id}`,).then(() =>{
axios.get('http://localhost:3000/').then((response) =>{
setDestination(response.data)
})
  })
}


  return (
<>
<div className='container'>
  <h1>Travel Blog</h1>
    <form onSubmit={addLocation}>
      Name: <input className='form-control' type='text' onChange={handleLocation}/>
      Image: <input className='form-control' type='text' onChange={handleImg}/>
      Must See: <input className='form-control' type='text' onChange={handleSights}/>
      Top Restaurants: <input className='form-control' type="text" onChange={handleRestaurants}/>
      Average Cost Per-Person: <input className='form-control' type='number' onChange={handleCost}/>
      Best Time of Year: <input className='form-control' type='text' onChange={handleTime}/>
      <input type="submit" value='Add Location'/>
    </form>
     <h1>Top Spots</h1> 
     <div className='container'>
     {destination.map((spots) =>{
      return(
      <div key={spots._id}>
        <h4>{spots.location}</h4>
        <img className='img-fluid' src={spots.image}/>
        <h4> Things to Do: </h4>
        <ul>
        <li>{spots.mustSee[0]}</li>
        <li>{spots.mustSee[1]}</li>
        <li>{spots.mustSee[2]}</li>
        <li>{spots.mustSee[3]}</li>
        </ul>
        <h4>Restaurants to try: </h4>
        <ul>
        <li>{spots.restaurantsToTry[0]}</li>
        <li>{spots.restaurantsToTry[1]}</li>
        <li>{spots.restaurantsToTry[2]}</li>
        <li>{spots.restaurantsToTry[3]}</li>
        </ul>
        <h4>Average cost PPPD  :{spots.costPerPerson} $</h4>
        <h4>The best time to come: {spots.bestTime}</h4>
        {/* <form onSubmit={(event)=>{handleLocationUpdate(event, spots)}}>
      Name: <input className='form-control' type='text' defaultValue={spots.location} onChange={handleLocation}/>
      Image: <input className='form-control' type='text' defaultValue={spots.image} onChange={handleImg}/>
      Must See: <input className='form-control' type='text' defaultValue={spots.mustSee} onChange={handleSights}/>
      Top Restaurants: <input className='form-control' type="text" defaultValue={spots.restaurantsToTry} onChange={handleRestaurants}/>
      Average Cost Per-Person: <input className='form-control' type='number' defaultValue={spots.costPerPerson} onChange={handleCost}/>
      Best Time of Year: <input className='form-control' type='text' defaultValue={spots.bestTime} onChange={handleTime}/>
      <input type="submit" value='Update'/>
    </form> */}
        <button onClick={(event) => handleLocationDelete(spots)}>Delete this Listing</button>
      </div>
       )}
      )}
</div>
</div>
     </>) 
  
}
export default App;








