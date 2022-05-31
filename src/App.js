import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { FaCheck } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaHeartBroken } from "react-icons/fa"
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
    'http://localhost:3000/placestogo', {
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
  axios.delete(`http://localhost:3000/placestogo/${newListData._id}`).then(() =>{
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
  const [like, setLike] = useState(0)
  const [disLike, setDisLike] = useState(0)
  return (
<>
<div className='container'>
  <h1>Places</h1>
  <p className='row'>
      <p className='col-sm-6'>
      <h1><FaHeart onClick={()=>(setLike(like + 1))}/>{like}</h1>
      </p>
      <p className='col-sm-6'>
       <h1><FaHeartBroken onClick={()=>(setDisLike(disLike -1))}/>{disLike} </h1>
       </p> 
       </p>
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
        <ul>
        <li><a href={spots.mustSee[0].link} target="_blank" rel="noreferrer">{spots.mustSee[0].name}</a></li>
        <li><a href={spots.mustSee[1].link} target="_blank" rel="noreferrer">{spots.mustSee[1].name}</a></li>
        <li><a href={spots.mustSee[2].link} target="_blank" rel="noreferrer">{spots.mustSee[2].name}</a></li>
        <li><a href={spots.mustSee[3].link} target="_blank" rel="noreferrer">{spots.mustSee[3].name}</a></li>
        </ul>
        <h4>Restaurants to try: </h4>
        <ul>
        <li><a href={spots.restaurantsToTry[0].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[0].name}</a></li>
        <li><a href={spots.restaurantsToTry[1].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[1].name}</a></li>
        <li><a href={spots.restaurantsToTry[2].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[2].name}</a></li>
        <li><a href={spots.restaurantsToTry[3].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[3].name}</a></li>
        </ul>
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
      <li>{list.location}, {list.country} <FaCheck  onClick={(event)=>handleNewDelete(list)}/></li>
      
      
      </>
    )
  })}
</ol>
</div>
     </>) 
  
}
export default App;








