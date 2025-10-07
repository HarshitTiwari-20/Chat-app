import { useEffect, useState } from "react"

function App() {

const [message, setMessage] = useState("Hello", "Hi");

    useEffect(() => {
      const ws = new WebSocket("http://localhost:3000");
      ws.onmessage = (event) => {
        setMessage(m => [...m, event.data])
      }
    }, []);
    

  return (
    <div className = "h-screen bg-gray-900  ">
      <br/> <br/> <br/> <br/> <br/> 
      <div className="">

      </div>

    

  













    </div>
  )
}

export default App
