

const socket = io('http://localhost:5500');

const form = document.getElementsByClassName('send-msg')[0];

const messageInput = document.getElementById('messageImp');

const messageContainer = document.querySelector('.container')

var audio =  new Audio('./js/notification.mp3');


const append = (message , position)=>{
     const messageElement = document.createElement('div')
     messageElement.innerText = message;
     messageElement.classList.add('message')
     messageElement.classList.add(position)
     messageContainer.append(messageElement)
     if(position == 'left'){

         audio.play();
     }

}

const leftt = (message , position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageElement.style.color = "white"
    messageElement.style.backgroundColor = "red"

    messageContainer.append(messageElement)
    // if(position == 'left'){

    //     audio.play();
    // }


}

const join = (message , position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageElement.style.color = "white"
    messageElement.style.backgroundColor = "green"

    messageContainer.append(messageElement)
    if(position == 'left'){

        audio.play();
    }


}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
  });

const name = prompt("Enter your name for a smooth joining")

socket.emit('new-user-joined' , name );

socket.on('user-joined' , name =>{
    join(`${name} joined the chat` , 'right' )

})

socket.on('receive' , data =>{
    append(`${data.name}:${data.message}` , 'left' )

})

socket.on('leave' , name =>{
    leftt(`${name} left the chat` , 'left' )

})




