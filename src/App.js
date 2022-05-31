import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () =>{

const [location, setLocation] = useState()
const [sights, setSights] = useState()
const [img, setImg] = useState()
const [restaurants, setRestaurants] = useState()
const [time, setTime] = useState()
const [cost, setCost] = useState()
const [destination, setDestination] = useState([])
const [seeLocation, setSeeLocation] = useState(false) 

const handleLocation = (event) =>{
  setLocation(event.target.value)
  return true
}
const handleSights = (event) =>{
  setSights(event.target.value)
  return true
}
const handleImg = (event) =>{
  setImg(event.target.value)
  return true
}
const handleRestaurants = (event) =>{
  setRestaurants(event.target.value)
  return true
}
const handleTime = (event) =>{
  setTime(event.target.value)
  return true
}
const handleCost = (event) =>{
  setCost(event.target.value)
  return true
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
    axios.get('http://localhost:3000/').then((response) =>{
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
    costPerPerson: cost,
    show: false
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

const toggleItems = (locationData) =>{
// button onClick => get ._id information
// create function that will toggle information based on ID
// create button that will invoke the function
// item ? show function : null 
axios.get(`http:localhost:3000/${locationData._id}`,).then(() =>{
  
})


}

  return (
<>
<div className='container'>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>

  <h1>Travel Blog</h1>
  <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://img.huffingtonpost.com/asset/6054be58240000760a25f476.jpeg?ops=scalefit_720_noupscale" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://www.frankfurt-airport.com/content/dam/fraport-travel/airport/reisevorbereitung/reise-services/reisebeschr%C3%A4nkungen/Weltkugel-in-Hand.jpg/_jcr_content/renditions/media_landscape.jpg./media_landscape.jpg" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD_kCrE0JwBLF54gd_-ooF8kM-Gk-nZrKIOw&usqp=CAU" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

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