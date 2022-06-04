

=======
=======
# Travel-Frontend
Frontend for Project 3

1. Created react app and deployed it on heroku.
=======
2. Installed dependencies such as axios, react-bootstrap
=======
4. Created front-end routes for creating/updating/deleting elements.
=======
5. Displayed data on the webpage by utilizing .map method.
=======
6. Added update and create forms with toggle buttons (form/updateForm functions in App.js + ternary operator in jsx ) 
=======
7. Added another toggle button for main information (info function in App.js + ternary operator in jsx)
=======
8. Installed and imported icons  (used "fontawesome" for react => npm i react-fontawesome)
=======
9. Created image-carousel by utilizing react-bootstrap (import  => import Carousel from 'react-bootstrap/Carousel') 
=======
10. Created responsive nav bar (import => 
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown')
=======
11. Added buttons that can sort content based on the cost ( lowToHigh/highToLow functions in App.js, that has ternary expression comparing a.costPerPerson  and b.costPerPerson and if element a has higher cost than element b then return 1; else return -1.
If 1 is returned, element a gets sorted first. If -1 is returned, element b gets sorted first.)
=======
12. Implemented GoogleMaps API. (npm i @react-google-maps/api => import { GoogleMap, LoadScript} from '@react-google-maps/api' ). Adjusted original schema : added latitude/longitude key-value pairs - now each element displayed has its own map
=======
13. Implemented search input by utilizing .filter and conditional statement( => destination.filter(spots => {
      if (query == ""){
        return spots
      }else if (spots.location.toLowerCase().includes(query.toLowerCase())) {
          return spots
        }
    
  }).map((spots) etc.)  and wrapped it all in ternary operator.
=======
14. Added scrollDown button that slides to About Us section (important => import {useRef} from 'react'=> create const aboutRef = useRef() => ()=>  window.scrollTo({top: aboutRef.current.offsetTop}))
=======
15. Added "back to the top" button ( onClick={()=>(window.scrollTo(0,0))})