const express = require('express');
const app = express();

let compteur = 0;

console.log('initialise compteur =' + compteur);

app.get('/',(req, res) => {
	console.log('incrémente compteur dans route =' + compteur++);
   res.send('Hello');
})

const server = app.listen(8081, () =>{
   let host = server.address().address
   let port = server.address().port
   
   console.log("Le server Express écoute at http://%s:%s", host, port)
})