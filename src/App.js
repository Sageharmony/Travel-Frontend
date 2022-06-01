import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { FaTimes } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaHeartBroken } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
const App = () =>{

const [location, setLocation] = useState()
const [country, setCountry] = useState()

const [time, setTime] = useState()
const [cost, setCost] = useState()
const [destination, setDestination] = useState([])

//______WANT TO GO LIST 
const [newCity, setNewCity] = useState()
const [newCountry, setNewCountry] = useState()
const [img, setImg] = useState()
const [sights, setSights] = useState()
const [restaurants, setRestaurants] = useState()
const[complete, setComplete] = useState(false)
const [places, setPlace] = useState([])

//_______WANT TO GO LIST
const handleNewCity= (event) =>{
  setNewCity(event.target.value)
}
const handleNewCountry= (event) =>{
  setNewCountry(event.target.value)
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
const addNewList = (event) =>{
  event.preventDefault()
  axios.post(
    'https://travelblogbackend.herokuapp.com/placestogo', {
      location: newCity,
      country: newCountry,
      image: img,
      mustSee: sights,
      restaurants: restaurants,
      isComplete: complete
    }
  ).then(() =>{
    axios.get('https://travelblogbackend.herokuapp.com/placestogo').then( (response) =>{
 
      setPlace(response.data)
    })
  })
}
useEffect(()=>{
  axios
      .get('https://travelblogbackend.herokuapp.com/placestogo')
      .then((response)=>{
        setPlace(response.data);
      })
},[])
const handleNewDelete = (newListData) =>{
  axios.delete(`https://travelblogbackend.herokuapp.com/placestogo/${newListData._id}`).then(() =>{
axios.get('https://travelblogbackend.herokuapp.com/placestogo').then((response) =>{
setPlace(response.data)
})
  })
}
const handleNewUpdate = (event, newListData) =>{
  event.preventDefault();
  axios.put(`https://travelblogbackend.herokuapp.com/placestogo/${newListData._id}`,
  {
    location: newCity,
    country: newCountry,
    image: img,
    mustSee: sights,
    restaurants: restaurants,
    isComplete: complete
  }).then(() =>{
axios.get('https://travelblogbackend.herokuapp.com/placestogo').then((response) =>{
setPlace(response.data)
})

  })
}

useEffect(()=>{
  axios
      .get('https://travelblogbackend.herokuapp.com/')
      .then((response)=>{
        setDestination(response.data);
      })
},[])


const handleLocationDelete = (locationData) =>{
  axios.delete(`/${locationData._id}`).then(() =>{
axios.get('https://travelblogbackend.herokuapp.com/').then((response) =>{
setDestination(response.data)
})
  })
}
///__________SORTING
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

 ///__________LIKES
  const [like, setLike] = useState(0)
  const [disLike, setDisLike] = useState(0)

//_____TOGGLE FORM
const [updateForm, setUpdateForm] = useState(false)
const [addForm, setAddForm] = useState(false)
  return (
<>
<div className='container'>
  <h1>Places</h1>
  <div className='likes'>
      <FaHeart onClick={()=>(setLike(like + 1))}/>{like}
       <FaHeartBroken onClick={()=>(setDisLike(disLike -1))}/>{disLike} 
       </div>
  <button className="btn btn-success" onClick = {lowToHigh}>Sort low to high</button>
  <button className="btn btn-success" onClick = {highToLow}>Sort high to low</button>

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
   
        <button className="btn btn-secondary" onClick={(event) => handleLocationDelete(spots)}>Delete this Listing</button>
      </div>
       )}
      )}
</div>
</div>
<div className='container'>
<h2>Places I want to go</h2>
<button className="btn btn-secondary" onClick={()=>(setAddForm(s=>!s))}>Complete the Form</button>
{addForm ? <form onSubmit={addNewList}>
City: <input className='form-control' type='text' onChange={handleNewCity}/>
Country: <input className='form-control' type='text' onChange={handleNewCountry}/>
Must See: <input className='form-control' type='text' onChange={handleSights}/>
Top Restaurants: <input className='form-control' type="text" onChange={handleRestaurants}/>

      <input className="btn btn-secondary" type="submit" value='Add Location'/>
    </form> : ""}
  <ol>
  {places.map((list)=>{
    return (
      <>
      <div key={list._id}>
      <li>{list.location}, {list.country}</li>
     
      <h4><FaEdit onClick={()=> (setUpdateForm(s=>!s))}/></h4> 
      <h4><FaTimes  onClick={(event)=>handleNewDelete(list)}/></h4>
     
      <img className='img-thumbnail' src={list.image}/>
      <li>Restaurants I want to eat at: {list.restaurants}</li>
      <li>Must See Places: {list.mustSee}</li>
  
       { updateForm? <form onSubmit={(event)=>{handleNewUpdate(event, list)}}>
      Name: <input className='form-control' type='text' defaultValue={list.location} onChange={handleNewCity}/>
      Country:<input className='form-control' type='text' defaultValue={list.country} onChange={handleNewCountry}/>
      Must See: <input className='form-control' type='text' defaultValue={list.mustSee} onChange={handleSights}/>
      Top Restaurants: <input className='form-control' type="text" defaultValue={list.restaurants} onChange={handleRestaurants}/>
     
      <input className="btn btn-secondary" type="submit" value='Update'/>
     
    </form> : ""}
      {/* <FaCheck onClick={()=>(setComplete(s=>!s))}  />
      {(complete)?<strike>{list.location}</strike>:list.location} */}
      
      </div>
      </>
    )
  })}
</ol>
</div>
     </>) 
  
}
export default App;


