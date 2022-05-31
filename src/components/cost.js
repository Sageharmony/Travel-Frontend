
const Cost = (props) => {
    const [cost, setCost] = useState(0)


      return (
        <>
        <div>
          <hr/>
          <p>{props.points.value}</p>
        </div>
        <h3>{cost}</h3>
        
         </>
      )     
    }
  
    export default Points