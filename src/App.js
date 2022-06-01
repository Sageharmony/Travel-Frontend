import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { FaTimes } from "react-icons/fa"
import { FaHeart } from "react-icons/fa"
import { FaHeartBroken } from "react-icons/fa"
import { FaCheck } from "react-icons/fa"
import { FaEdit } from "react-icons/fa"
import { FaArrowUp } from "react-icons/fa"
import Carousel from 'react-bootstrap/Carousel'

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
    'http://localhost:3000/placestogo', {
      location: newCity,
      country: newCountry,
      image: img,
      mustSee: sights,
      restaurants: restaurants,
  
    }
  ).then(() =>{
    axios.get('http://localhost:3000/placestogo').then( (response) =>{
      console.log(response.data)
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
const handleNewUpdate = (event, newListData) =>{
  event.preventDefault();
  axios.put(`http://localhost:3000/placestogo/${newListData._id}`,
  {
    location: newCity,
    country: newCountry,
    image: img,
    mustSee: sights,
    restaurants: restaurants,

  }).then(() =>{
axios.get('http://localhost:3000/placestogo').then((response) =>{
setPlace(response.data)
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
  axios.delete(`http://localhost:3000/${locationData._id}`).then(() =>{
axios.get('http://localhost:3000/').then((response) =>{
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
const form =() =>{
  setAddForm(!addForm)
  setToggle(false)
}
const updateFormToggle =()=>{

  setUpdateForm(!updateForm)

}
//______TOGGLE FOR MAIN CHUNK OF INFO
const [toggle, setToggle] = useState(false)
const info = ()=>{
  setToggle(!toggle)
  setAddForm(false)
}


  return (
<>
<div className='container'>
  <h1>Places</h1>
  
  <div className='likes'>
      <FaHeart onClick={()=>(setLike(like + 1))}/>{like}
       <FaHeartBroken onClick={()=>(setDisLike(disLike -1))}/>{disLike} 
       </div>
 </div>   
       <div style={{ display: 'block'}}>
      
      <Carousel fade>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" id ="car" src="https://res.cloudinary.com/itb-database/image/upload/s--IYQLolO6--/c_fill,dpr_auto,f_auto,q_auto:eco,w_1280/v1/Places/c29063d99be162886898118abbd053c1" alt="Image One"/>
          <Carousel.Caption>
            <h3>Iceland</h3>
        
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" id ="car" src="https://www.capetown.travel/wp-content/uploads/2018/12/Helderberg_dusk_Craig_Howes.jpg" alt="Image Two"/>
          <Carousel.Caption>
            <h3>South Africa</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item  interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://149359143.v2.pressablecdn.com/wp-content/uploads/2020/04/Canva-Trulli-of-Alberobello-Puglia-Italy-1024x684.jpg" alt="Image Three"/>
          <Carousel.Caption>
            <h3>Italy</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://media.architecturaldigest.com/photos/5c0ed0538d2a442e241057b1/16:9/w_2560%2Cc_limit/GettyImages-771579891.jpg" alt="Image Four"/>
          <Carousel.Caption>
            <h3>South Korea</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://static.onecms.io/wp-content/uploads/sites/9/2020/08/17/santiago-restaurant-bar-guide-FT-BLOG0820.jpg" alt="Image Five"/>
          <Carousel.Caption>
            <h3>Chile</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://cdn.theculturetrip.com/wp-content/uploads/2017/06/24854155744_c61f21b3b9_k.jpg" alt="Turkey"/>
          <Carousel.Caption>
            <h3>Turkey</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://a.cdn-hotels.com/gdcs/production143/d1112/c4fedab1-4041-4db5-9245-97439472cf2c.jpg" alt="Indonesia"/>
          <Carousel.Caption>
            <h3>Indonesia</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://cdn.cnn.com/cnnnext/dam/assets/170606121226-japan---travel-destination---shutterstock-230107657.jpg" alt="Japan"/>
          <Carousel.Caption>
            <h3>Japan</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://www.fodors.com/wp-content/uploads/2021/05/UltimateMexicoCity__HERO_shutterstock_1058054480.jpg" alt="Mexico"/>
          <Carousel.Caption>
            <h3>Mexico</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Ljubljana_made_by_Janez_Kotar.jpg" alt="Slovenia"/>
          <Carousel.Caption>
            <h3>Slovenia</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src='https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt="Thailand"/>
          <Carousel.Caption>
            <h3>Thailand</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://images.unsplash.com/photo-1620677368158-32b1293fac36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Spain"/>
          <Carousel.Caption>
            <h3>Spain</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src="https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Greece"/>
          <Carousel.Caption>
            <h3>Greece</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  
    <button className="btn btn-light" onClick={info} ><h1>Explore Places </h1> </button>
    <button className="btn btn-light" onClick={form}><h2>Bucket List</h2></button>
    <div className='container'>
   

     { toggle ?
    <>
    <button className="btn btn-success" onClick = {lowToHigh}>Sort low to high</button>
    <button className="btn btn-success" onClick = {highToLow}>Sort high to low</button>
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
      ) }
<FaArrowUp/><h5 onClick={()=>(window.scrollTo(0,0))} style={{cursor: "pointer"}} >Back to the top</h5> 
      </>
      : "" }

</div>

<div className='container'>


{addForm ? 
<>
<form onSubmit={addNewList}>
City: <input className='form-control' type='text' onChange={handleNewCity}/>
Country: <input className='form-control' type='text' onChange={handleNewCountry}/>
Must See: <input className='form-control' type='text' onChange={handleSights}/>
Top Restaurants: <input className='form-control' type="text" onChange={handleRestaurants}/>

      <input className="btn btn-secondary" type="submit" value='Add Location'/>
    </form> 
    <ol>
   
  {places.map((list)=>{
    return (
      <>
       
      <div key={list._id}>
    
     
     <li><h3 >{list.location}, {list.country}</h3></li>
      <FaEdit  onClick={updateFormToggle}/>
      <FaTimes  onClick={(event)=>handleNewDelete(list)}/>
    
      <ul>
      <li>Restaurants: {list.restaurants}</li>
      <li>Must See Places: {list.mustSee}</li>

      </ul>
    
       { updateForm? <form onSubmit={(event)=>{handleNewUpdate(event, list)}}>
      Name: <input className='form-control' type='text' defaultValue={list.location} onChange={handleNewCity}/>
      Country:<input className='form-control' type='text' defaultValue={list.country} onChange={handleNewCountry}/>
      Must See: <input className='form-control' type='text' defaultValue={list.mustSee} onChange={handleSights}/>
      Top Restaurants: <input className='form-control' type="text" defaultValue={list.restaurants} onChange={handleRestaurants}/>
     
      <input className="btn btn-secondary" type="submit" value='Update'/>
     
    </form> : ""}
  
      
      </div>
      </>
    )
  })}
  </ol>
  <FaArrowUp/> <h5 onClick={()=>(window.scrollTo(0,0))} style={{cursor: "pointer"}} >Back to the top</h5> 
  </>
  : ""}

</div>
     </>) 
  
}
export default App;


