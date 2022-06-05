import { useEffect, useState, useRef, React} from 'react';
import './App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { FaTimes, FaEdit, FaArrowUp, FaGlobeEurope, FaHandPointLeft, FaInstagramSquare, FaGithub, FaEnvelope, FaBars } from "react-icons/fa"
import iceland from './images/iceland.jpeg'
import chile from './images/chile.jpeg'
import indo from './images/indo.jpeg'
import italy from './images/italy.jpeg'
import japan from './images/japan.jpeg'
import mexico from './images/mexico.jpeg'
import slovenia from './images/slovenia_2.jpeg'
import greece from './images/greece.jpeg'
import south_korea from './images/south_korea.jpeg'
import spain from './images/spain.jpeg'
import thailand from './images/thailand.jpeg'
import turkey from './images/turkey.jpeg'
import south_africa from './images/south_africa.jpeg'
import Carousel from 'react-bootstrap/Carousel'
import { GoogleMap, LoadScript} from '@react-google-maps/api'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


const mapContainerStyle = {width: '100%', height:300}


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
const [query, setQuery] = useState("")

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
  
    }
  ).then(() =>{
    axios.get('https://travelblogbackend.herokuapp.com/placestogo').then( (response) =>{
      console.log(response.data)
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

  }).then(() =>{
axios.get('https://travelblogbackend.herokuapp.com/placestogo').then((response) =>{
  console.log(newListData._id)
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
  axios.delete(`https://travelblogbackend.herokuapp.com/${locationData._id}`).then(() =>{
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
 {/* <div className='likes'>
      <FaHeart onClick={()=>(setLike(like + 1))}/>{like}
       <FaHeartBroken onClick={()=>(setDisLike(disLike -1))}/>{disLike} 
       </div> */}
const aboutRef = useRef()

const scrollDown = () => {
  window.scrollTo({
    top: aboutRef.current.offsetTop,
    behavior: 'smooth',
  });
};
const handleChange = (e) => {
  e.preventDefault()
  setQuery(e.target.value);
};

  return (
<>
{/* <div className='container' style={{marginBottom: -50}}>
  <h1>Places</h1>

 
 </div>    */}
 <Navbar className='navbar-custom'  bg="light" expand="lg">
  <Container fluid>
     
    <Navbar.Toggle aria-controls="navbarScroll">
    {/* <FaBars /> */}
    </Navbar.Toggle>
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto">
          <Navbar.Brand style={{marginLeft:50, marginTop:5, fontSize: 35}} href="/"><FaGlobeEurope/>PLACES.</Navbar.Brand>
   
        {/* <Nav.Link style={{marginTop: 20 }} id ="navlink" href="/">Home.</Nav.Link> */}
        <Nav.Link style={{marginTop: 20}} id ="navlink" onClick={scrollDown}>About.</Nav.Link>
        <NavDropdown style={{marginTop: 20}} title="Contact Us." id="navbarScrollingDropdown">
          <NavDropdown.Item href="https://www.instagram.com/?hl=en" target="_blank">Instagram.</NavDropdown.Item>
          <NavDropdown.Item href="mailto:someone@yoursite.com" target="_blank">Email.</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="https://github.com/" target="_blank">GitHub.</NavDropdown.Item>
          
        </NavDropdown>
      
      </Nav>
   
    </Navbar.Collapse>
  </Container>
</Navbar>
       <div style={{ display: 'block', marginBottom: -100}}>
      
      <Carousel fade>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" id ="car" src={iceland} alt="Image One"/>
          <Carousel.Caption>
            <h3>Iceland</h3>
        
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100" id ="car" src={south_africa} alt="Image Two"/>
          <Carousel.Caption>
            <h3>South Africa</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item  interval={1500}>
          <img className="d-block w-100 " id ="car" src={italy} alt="Italy"/>
          <Carousel.Caption>
            <h3>Italy</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={south_korea} alt="Korea"/>
          <Carousel.Caption>
            <h3>South Korea</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={chile} alt="Image Five"/>
          <Carousel.Caption>
            <h3>Chile</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={turkey} alt="Turkey"/>
          <Carousel.Caption>
            <h3>Turkey</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={indo} alt="Indonesia"/>
          <Carousel.Caption>
            <h3>Indonesia</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={japan} alt="Japan"/>
          <Carousel.Caption>
            <h3>Japan</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={mexico} alt="Mexico"/>
          <Carousel.Caption>
            <h3>Mexico</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={slovenia} alt="Slovenia"/>
          <Carousel.Caption>
            <h3>Slovenia</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={thailand} alt="Thailand"/>
          <Carousel.Caption>
            <h3>Thailand</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={spain} alt="Spain"/>
          <Carousel.Caption>
            <h3>Spain</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img className="d-block w-100 " id ="car" src={greece} alt="Greece"/>
          <Carousel.Caption>
            <h3>Greece</h3>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
    <div className='container'>
 <h1>About Us.</h1>
<div ref={aboutRef}>

<p>Have you ever wondered:</p>

<p><i>“What’s the best way to start planning a trip?”</i></p>

<p><i>“How do I find the best things to do while on the road?”</i></p>

<p><i>“How can some people afford to travel for so long?”</i></p>

<p><i>“How do people make money from travel blogging?”</i></p>

<p>If you answered yes to any of these questions, you are not alone as we once asked those questions ourselves.</p>
<p>Follow us in our journey! < a href="https://www.instagram.com/?hl=en"> <FaInstagramSquare/></a></p>
</div>
</div>
    <button className="btn btn-light" onClick={info} ><h1>Explore Places </h1> </button>
    <button className="btn btn-light" onClick={form}><h2>Bucket List</h2></button>
    <div className='container'>

     
    { toggle ?
    <>
 
      <button className="btn btn-outline-success" id = "search" onClick = {lowToHigh}>Sort low to high</button>
      <button className="btn btn-outline-success" id = "search"  onClick = {highToLow}>Sort high to low</button>
      <input type="search" id="search"  placeholder="Find Destination" onChange={handleChange} />
    

   
     {
    destination.filter(spots => {
      if (query == ""){
        return spots
      }else if (spots.location.toLowerCase().includes(query.toLowerCase())) {
          return spots
        }
    
  }).map((spots) =>{
      return(
        
      <div key={spots._id}>
     

        <h4>{spots.location}.</h4> 
      
      
        <img className='img-fluid' src={spots.image}/>
        <dl className="row" style={{marginTop: 20}}>
  <dt className="col-sm-3"><h5>Things To Do</h5></dt>
  <dd className="col-sm-9">
        <p><a href={spots.mustSee[0].link} target="_blank" rel="noreferrer">{spots.mustSee[0].name}.<FaHandPointLeft/></a></p>
        <p><a href={spots.mustSee[1].link} target="_blank" rel="noreferrer">{spots.mustSee[1].name}.<FaHandPointLeft/></a></p>
        <p><a href={spots.mustSee[2].link} target="_blank" rel="noreferrer">{spots.mustSee[2].name}.<FaHandPointLeft/></a></p>
        <p><a href={spots.mustSee[3].link} target="_blank" rel="noreferrer">{spots.mustSee[3].name}.<FaHandPointLeft/></a></p>
  </dd>

  <dt className="col-sm-3"><h5>Restaurants To Try</h5></dt>
  <dd className="col-sm-9">
        <p><a href={spots.restaurantsToTry[0].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[0].name}.</a><FaHandPointLeft/></p>
        <p><a href={spots.restaurantsToTry[1].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[1].name}.</a><FaHandPointLeft/></p>
        <p><a href={spots.restaurantsToTry[2].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[2].name}.</a><FaHandPointLeft/></p>
        <p><a href={spots.restaurantsToTry[3].link}target="_blank" rel="noreferrer">{spots.restaurantsToTry[3].name}.</a><FaHandPointLeft/></p>
  </dd>

  <dt className="col-sm-3"><h5>Cost per person/per day</h5></dt>
  <dd className="col-sm-9">{spots.costPerPerson} $</dd>

  <dt className="col-sm-3 text-truncate"><h5>Best Time To Come</h5></dt>
  <dd className="col-sm-9">{spots.bestTime}.</dd>
</dl>
        
        
        <div className='container'>
        <LoadScript googleMapsApiKey = {process.env.REACT_APP_GOOGLE}> 
  <GoogleMap mapContainerStyle={mapContainerStyle} center={{lat: spots.lat, lng: spots.lng }} zoom={10}></GoogleMap>
 </LoadScript>
 </div>
        <button className="btn btn-outline-secondary" onClick={(event) => handleLocationDelete(spots)}>Delete this Listing</button>
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
   
  {places.map((list, key)=>{
    return (
    
   <div key={list._id}>
     <li><h3 >{list.location}, {list.country}</h3></li>
      <FaEdit  onClick={updateFormToggle}/>
      <FaTimes  onClick={(event)=>handleNewDelete(list)}/>
    
      <ul>
      <li>Restaurants: {list.restaurants}</li>
      <li>Must See Places: {list.mustSee}</li>

      </ul>
 
       {  updateForm ?
        <form onSubmit={(event)=>{handleNewUpdate(event, list)}}>
      Name: <input className='form-control' type='text' defaultValue={list.location} onChange={handleNewCity}/>
      Country:<input className='form-control' type='text' defaultValue={list.country} onChange={handleNewCountry}/>
      Must See: <input className='form-control' type='text' defaultValue={list.mustSee} onChange={handleSights}/>
      Top Restaurants: <input className='form-control' type="text" defaultValue={list.restaurants} onChange={handleRestaurants}/>
     
      <input className="btn btn-secondary" type="submit" value='Update'/>
     
    </form> : ""}
    
      
     
      </div>
    )
  })}
  </ol>
  <FaArrowUp/> <h5 onClick={()=>(window.scrollTo(0,0))} style={{cursor: "pointer"}} >Back to the top</h5> 
  </>
  : ""}

</div>
<div>

 </div>
 
<footer style={{textAlign: 'center'}}>
  Created By Yulia and Sage.
  <p>
  < a href="https://www.instagram.com/?hl=en"> <FaInstagramSquare/></a>
  < a href="mailto:someone@yoursite.com"> <FaEnvelope/> </a>
  < a href="https://github.com/"> <FaGithub/></a>
  </p>
</footer>
     </>) 
  
}
export default App;


