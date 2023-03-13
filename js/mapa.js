//se crea la variable llamada map, y se utiliza la libreria (L), setView es para especiificar un punto en el mapa y el zomm 18
let map = L.map('map').setView([3.4137353508661232, -76.46891672594022],18)
//se agrega el mapa en el div con el id map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
