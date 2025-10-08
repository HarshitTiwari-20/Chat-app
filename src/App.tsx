import { useEffect, useRef, useState } from "react"

function App() {

const [message, setMessage] = useState(["Hello","Hi"]);
const wsRef = useRef(null);
const inputRef = useRef(null);

    useEffect(() => {
      const ws = new WebSocket("http://localhost:3030");
      ws.onmessage = (event) => {
        setMessage(m => [...m, event.data])
      }
      // @ts-ignore
      wsRef.current = ws;
      ws.onopen = () => {
         ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
      }
     
    }, []);
      

  return (
    <div className = "h-full w-full bg-gray-900  p-3 ">

     <div className="h-[85vh] ">
      {message.map(message =>
      <div className="m-8">
        <span className="text-white bg-green-700 rounded-2xl m-1 p-3 ">
          {message}
        </span>
      </div>)}
     </div>

    <div className="w-full bg-gray-600 flex rounded-2xl ">
      <input ref={inputRef} id="message"  className="flex-1 p-2 text-white "></input>
      <button className="bg-blue-600 text-white p-4 rounded-2xl m-1 hover:bg-blue-700"
       onClick={() => {
         // @ts-ignore
         const message = inputRef.current?.value;
        
         // @ts-ignore
         wsRef.current.send(JSON.stringify({
           type: "chat",
           payload: {
             message: message
           }
         }))
        }
      }
      >
        Send 
      </button>
    </div>

  













    </div>
  )
}

export default App