import './App.css'
import Lottery from "./Lottery.jsx";
import {sum} from "./helper.js";

function App() {

  let winCondition = (ticket)=>{
    return ticket[0]>ticket[1]>ticket[2] ;
  }
  return (
    <>
    <Lottery n={3} winCondition={winCondition} />
    </>
  )
}

export default App
