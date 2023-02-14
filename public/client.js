// const root = document.getElementById('root');

// function ChatForm({onSendMessage}){
//   const type = "submit";
//   const [value, setValue] = React.useState('');
//   return(
//     <React.Fragment>
//       <form onSubmit={(e)=> {
//         e.preventDefault();
//         onSendMessage(value);
//       }}>
//       <input 
//       type="text"
//       value={value} 
//       onChange={e => setValue(e.target.value)}
//       id="chat-input" />
//       <button type={type} >Send</button>
//     </form>
//     <form action="/profile">
//         <input type={type} value="Go to Profile" />
//       </form>
//       </React.Fragment>
      
//   )
// }

// function App(){
//   return(
//     <React.Fragment>
//       <div id="title-div">
//     <h1>My chat app</h1>
//     <i id="chat-status"></i>
//   </div>
// <div id="message-list"></div>
//     <ChatForm on/>
//     </React.Fragment>
//   )
// }

// ReactDOM.render(<App/>, root)


const messageList = document.getElementById('message-list');
const chatStatus = document.getElementById('chat-status');

function test(){
  return <div/>
}

function addMessage(message) {
  const messageElement = document
    .createElement('div');
  messageElement.textContent = message;
  messageList.appendChild(messageElement);
}

// Connexion du WebSocket

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws');
  ws.onopen = () => {
    console.log('Connected');
    chatStatus.style.backgroundColor = 'green';
  };

  ws.onclose = () => {
    console.log('Disconnected');
    chatStatus.style.backgroundColor = 'red';
    setTimeout(connect, 1000);
  };

  ws.onerror = (error) => {
    console.log('Error', error);
  };

  ws.onmessage = (event) => {
    console.log('Message from server', event.data);
    addMessage(event.data);
  };
}

connect()

document.querySelector('form')
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document
      .querySelector('#chat-input');
    addMessage(input.value);
    ws.send(input.value);
    input.value = '';
  });
