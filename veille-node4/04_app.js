const express = require('express');
const app = express();
app.use(express.static('public'));


const transform_en_tableau = (collection) => {

	let html = "<table>"

	for(elm of collection){

		html += "<th>" + elm + "<th>";
		html += "<tr>";
		for(p in elm){
			html += "<td>"+ elm[p] +"</td>";
		}
		html += "</tr>";
	}

	html += "</table>";
	return html;
}

//=======================================================Route /html/01form.html
app.get('/formulaire', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/public/hmtl" + "01_form.html" );
})
//=======================================================Route
app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

//=======================================================Route /traiter_get
app.get('/traiter_get', function (req, res) {
 // Preparer l'output en format JSON

console.log('la route /traiter_get')

// on utilise l'objet req.query pour récupérer les données GET
 let reponse = {
 prenom:req.query.prenom,
 nom:req.query.nom,
 courriel:req.query.courriel,
 telephone:req.query.telephone
 };

 res.end(JSON.stringify(reponse));

	const fs = require('fs');

	fs.appendFile('public/data/membres.txt',  ',' + JSON.stringify(reponse),  (err) => {
	  if (err) throw err;
	  //console.log('Sauvegardé');
	});


})

//==================================Route :membres
app.get("/membres", (req,res) => {

	const fs = require('fs');

	fs.readFile('public/data/membres.txt', 'utf8', function (err, data) {
	 	let collection = JSON.parse("["+data+"]");

	 	res.end(transform_en_tableau(collection))
	});

});

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})