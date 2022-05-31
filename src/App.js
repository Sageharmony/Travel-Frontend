import { useEffect, useState, useRef, React} from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import Carousel from 'react-bootstrap/Carousel'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
// import { Map, GoogleApiWrapper } from 'google-maps-react';


const App = () =>{

const [location, setLocation] = useState()
const [country, setCountry] = useState()
const [sights, setSights] = useState()
const [img, setImg] = useState()
const [restaurants, setRestaurants] = useState()
const [time, setTime] = useState()
const [cost, setCost] = useState()
//______adding new list 
const [newCity, setNewCity] = useState()
const [newCountry, setNewCountry] = useState()
const [places, setPlace] = useState([])
//
const [destination, setDestination] = useState([])



//_______new city add
const handleNewCity= (event) =>{
  setNewCity(event.target.value)
}
const handleNewCountry= (event) =>{
  setNewCountry(event.target.value)
}
const addNewList = (event) =>{
  event.preventDefault()
  axios.post(
    'http://localhost:3001/placestogo', {
      location: newCity,
      country: newCountry,
     
    }
  ).then(() =>{
    axios.get('http://localhost:3000/placestogo').then( (response) =>{
 
      setPlace(response.data)
    })
  })
}
useEffect(()=>{
  axios
      .get('http://localhost:3000/placestogo')
      .then((response)=>{
        setPlace(response.data);
      })
},[])
const handleNewDelete = (newListData) =>{
  axios.delete(`http://localhost:3001/placestogo/${newListData._id}`).then(() =>{
axios.get('http://localhost:3000/placestogo').then((response) =>{
setPlace(response.data)
})
  })
}
//_________________________
const handleLocation = (event) =>{
  setLocation(event.target.value)
}
const handleCountry = (event) =>{
  setCountry(event.target.value)
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
      country: country,
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
const lowToHigh = () =>{
const sort = [...destination].sort((a,b)=>{
  return a.costPerPerson > b.costPerPerson ? 1 : -1
})
 setDestination(sort)
}
const highToLow = () =>{
  const sort = [...destination].sort((a,b)=>{
    return a.costPerPerson < b.costPerPerson ? 1 : -1
  })
   setDestination(sort)
  }
  // --- google maps 

  return (
<>
<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></hr></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<Carousel>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://img.huffingtonpost.com/asset/6054be58240000760a25f476.jpeg?ops=1778_1000"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>Travel</h3>
      <p>With the Knowdlege of thousands</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://www.frankfurt-airport.com/content/dam/fraport-travel/airport/reisevorbereitung/reise-services/reisebeschr%C3%A4nkungen/Weltkugel-in-Hand.jpg/_jcr_content/renditions/media_landscape.jpg./media_landscape.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Know Where To Go</h3>
      <p>Find the Best Destinations.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://prod-virtuoso.dotcmscloud.com/dA/188da7ea-f44f-4b9c-92f9-6a65064021c1/heroImage1/PowerfulReasons_hero.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Plan To See The World.</h3>
      <p>Planning is now Easy and Fun</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>


  
<div className='container'>
  <h1>Places</h1>
  <button onClick = {lowToHigh}>Sort low to high</button>
  <button onClick = {highToLow}>Sort high to low</button>
    {/* <form onSubmit={addLocation}>
      City: <input className='form-control' type='text' onChange={handleLocation}/>
      Country: <input className='form-control' type='text' onChange={handleCountry}/>
      Image: <input className='form-control' type='text' onChange={handleImg}/> */}
      {/* Must See: <input className='form-control' type='text' onChange={handleSights.toString()}/>
      Top Restaurants: <input className='form-control' type="text" onChange={handleRestaurants.toString()}/> */}
      {/* Average Cost Per-Person: <input className='form-control' type='number' onChange={handleCost}/>
      Best Time of Year: <input className='form-control' type='text' onChange={handleTime}/>
      <input type="submit" value='Add Location'/> */}
    {/* </form> */}
     <h1>Top Spots</h1> 

     <div className='container'>
     {destination.map((spots) =>{
      return(
      <div key={spots._id}>
        
        <h4>{spots.location}</h4>
        <img className='img-fluid' src={spots.image}/>
        <h4> Things to Do: </h4>
        {/* <ul>
        <li><a href={spots.mustSee[0].link} target="_blank" rel="noreferrer">{spots.mustSee[0].name}</a></li>
        <li><a href={spots.mustSee[1].link} target="_blank" rel="noreferrer">{spots.mustSee[1].name}</a></li>
        <li><a href={spots.mustSee[2].link} target="_blank" rel="noreferrer">{spots.mustSee[2].name}</a></li>
        <li><a href={spots.mustSee[3].link} target="_blank" rel="noreferrer">{spots.mustSee[3].name}</a></li>
        </ul> */}
        <h4>Restaurants to try: </h4>
        {/* <ul>
        <li><a href={spots.restaurantsToTry[0].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[0].name}</a></li>
        <li><a href={spots.restaurantsToTry[1].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[1].name}</a></li>
        <li><a href={spots.restaurantsToTry[2].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[2].name}</a></li>
        <li><a href={spots.restaurantsToTry[3].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[3].name}</a></li>
        </ul> */}
        <h4>Per person / per day:{spots.costPerPerson} $</h4>
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
<div className='container'>
<h2>Places I want to go</h2>
  <form onSubmit={addNewList}>
  <label>City: <input className='form-control' type='text' onChange={handleNewCity}/></label>
  <label>Country: <input className='form-control'  type='text' onChange={handleNewCountry}/></label>
  <input type="submit" value='Add Location'/>
  </form>
  <ol>
  {places.map((list)=>{
    return (
      <>
      <li>{list.location}, {list.country} </li>
      <button onClick={(event)=>handleNewDelete(list)}>Delete</button>
      </>
    )
  })}
</ol>
</div>
     </>) 
  
}
export default App;
