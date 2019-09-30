const socket = io();

let message_user = document.getElementById('message_user');
let user = document.getElementById('user');
let btn = document.getElementById('send');
let events = document.getElementById('events');
let messages = document.getElementById('messages');
let btn2 = document.getElementById('geo')


btn.addEventListener('click', function(){
    console.log(user.value + ' ' + message_user.value);

    socket.emit('message',{
        user:user.value,
        message_user:message_user.value
    });

});




    document.querySelector('#geo').addEventListener('click', e => {
        
        if (!navigator.geolocation)
            return alert('su navegador no soporta geo locate');
        navigator.geolocation.watchPosition(
            pos =>
                socket.emit('new-geo', {
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                }),
            () => console.log('Unable to fetch location, try again'));
    })



socket.on('message', function(data){
   
    messages.innerHTML +=`<p><strong>${data.user} : </strong>${data.message_user}</p>`;
    message_user.value = '';
    events.innerHTML = '';
    
});

message_user.addEventListener('keypress', function(){
    socket.emit('typing', user.value)
});

socket.on('typing', function(data){
    events.innerHTML = `<p><em>${data} is typing...</em></p>`;
});

