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
const [destination, setDestination] = useState([])
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
const [toggle, setToggle] = useState(false)
const [query, setQuery] = useState("")




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
  // --- toggle information 

const info = ()=>{
  setToggle(!toggle)
}

// search functioin 



const [like, setLike] = useState(0)
const [disLike, setDisLike] = useState(0)

// google maps 

  
//   <div className='likes'>
//       <FaHeart onClick={()=>(setLike(like + 1))}/>{like}
//        <FaHeartBroken onClick={()=>(setDisLike(disLike -1))}/>{disLike} 
//        </div>
//  </div>  

const aboutRef = useRef(null)

const scrollDown = () => {
  window.scrollTo({
    top: aboutRef.current.offsetTop,
    behavior: 'smooth',
  });
};
  return (
<>


<Navbar bg="light" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#">Travel Hub</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link onClick={scrollDown}>About</Nav.Link>
        <NavDropdown title="Contact Us" id="navbarScrollingDropdown">
          <NavDropdown.Item href="instagram.com">Instagram</NavDropdown.Item>
          <NavDropdown.Item href="#">Email</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
           GitHub
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form className="d-flex">
      <input placeholder="Find Destination" onChange={event => setQuery(event.target.value)} />
     {
    destination.filter(post => {
    if (query === '') {
      return post;
    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  }).map((post, index) => (
    <div className="box" key={index}>
      <p>{post.location}</p>
    </div>
  ))
}
        <Button variant="outline-success">Search</Button>
      </Form>
    </Navbar.Collapse>
  </Container>
</Navbar>

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
       <button onClick={toggle} >
       {toggle ? 
     destination.map((spots) =>{
      return(
      <div key={spots._id}>
        <div className="info">
        <h4>{spots.location}</h4>
        <img src={spots.image}/>
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
          </div>
        <form onSubmit={(event)=>{handleLocationUpdate(event, spots)}}>
      Name: <input className='form-control' type='text' defaultValue={spots.location} onChange={handleLocation}/>
      Image: <input className='form-control' type='text' defaultValue={spots.image} onChange={handleImg}/>
      Must See: <input className='form-control' type='text' defaultValue={spots.mustSee} onChange={handleSights}/>
      Top Restaurants: <input className='form-control' type="text" defaultValue={spots.restaurantsToTry} onChange={handleRestaurants}/>
      Average Cost Per-Person: <input className='form-control' type='number' defaultValue={spots.costPerPerson} onChange={handleCost}/>
      Best Time of Year: <input className='form-control' type='text' defaultValue={spots.bestTime} onChange={handleTime}/>
      <input type="submit" value='Update'/>
    </form> 
        <button onClick={(event) => handleLocationDelete(spots)}>Delete this Listing</button>
      </div>
       )}
      ) : '' } See this Listing
      </button>
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
<div>
     
  
    </div>


<h1>About Us.</h1>
<h6 ref={aboutRef}>
Bacon ipsum dolor amet non meatball elit sirloin, short ribs brisket do. Brisket ipsum enim sed alcatra fugiat, frankfurter chicken. Capicola in id pork loin shank ea. Alcatra kielbasa excepteur anim, flank nisi strip steak ullamco minim cupidatat pariatur. Ea chuck aliqua mollit magna meatball bacon short ribs enim spare ribs excepteur. In shankle turducken tongue ham pork loin. Shoulder venison kielbasa, andouille jerky magna turkey enim pork chop voluptate veniam non.

Cillum ham hock in, pork belly laboris venison meatball swine aute ut. Beef jerky shankle duis, flank voluptate corned beef. Shoulder pork chop meatball sausage pig ut anim tail id ut. Meatball ad do boudin turducken sirloin pancetta reprehenderit chuck kevin esse burgdoggen salami consequat. Beef ribs quis sint irure ea andouille leberkas deserunt cow landjaeger.

</h6>
</div>
<footer>
  Created By Yulia and Sage.
</footer>

     </>) 
  
}
export default App;
