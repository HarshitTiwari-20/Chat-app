
import {  WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 3030 });

let countUser = 0;
let allSockets: User[] = [];

interface User {
    socket: WebSocket;
    room: string;
}

wss.on("connection", (socket) =>{

   
   
    socket.on("message", (message) => {
        console.log("message received: " + message.toString())   

        const parsedMessage = JSON.parse(message as unknown as string);
       // allSockets.forEach((s) => s.send(message.toString()));
        if(parsedMessage.type === "join"){
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId

            })

        }
        if (parsedMessage.type === "chat"){
            // const currenUserRoom = allSockets.find((x) => x.socket)

            // allSockets.forEach((user) => {
            //     if(user.room === currenUserRoom?.room){
            //         user.socket.send(JSON.stringify({
            //             type: "chat",
            //             payload: {
            //                 message: parsedMessage.payload.message
            //             }
            //         }))
            //     }


            
            let currentUserRoom = null;
            for(let i=0; i<allSockets.length; i++){
                if(allSockets[i].socket == socket){
                    currentUserRoom = allSockets[i].room;

                }
            }
            for (let i = 0; i < allSockets.length; i++){
                if(allSockets[i].room === currentUserRoom){
                    allSockets[i].socket.send(parsedMessage.payload.message)
                }
            }

        }
        

    
    })
   
} )






