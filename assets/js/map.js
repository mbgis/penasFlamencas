/*		CREACIÓN DE MAPA */
var map = L.map('map').setView([36.4840, -5.9410], 10);
/*		CREACIÓN DE MAPA */

/*		MAPA DE OPEN STREET MAP		*/
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: 'Tiles courtesy of <a href="http://openstreetmap.es/" target="_blank">OpenStreetMap Spain</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
/*		MAPA DE OPEN STREET MAP		*/

/*		MAPA DE PNOA		*/
var pnoa = L.tileLayer.wms('http://www.ign.es/wms-inspire/pnoa-ma',{
  layers: 'OI.OrthoimageCoverage',
  format: 'image/png',
  transparent: false,
  continuousWorld : true,
  attribution: 'PNOA cedido por © <a href="http://www.ign.es/ign/main/index.do" target="_blank">Instituto Geográfico Nacional de España</a>'
});
/*		MAPA DE PNOA		*/

/*		MAPA DE ACUARELA		*/
var watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'jpg'
});
/*		MAPA DE ACUARELA		*/

/*		MAPA DE CARTO NEGRO		*/
var cartoNegro = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
});
/*		MAPA DE CARTO NEGRO		*/

/*		CREACIÓN DE ICONO		*/
var icono = L.icon({
    iconUrl: 'assets/css/images/marker.png',
    iconSize: [32, 32],
    iconAnchor:   [15, 45],
    popupAnchor:  [0, -46]
});
/*		CREACIÓN DE ICONO		*/

/*		FUNCIÓN DE ESTILO DE ICONO		*/
function estiloIcon(feature, latlng) {
	return L.marker(latlng, {
		icon: icono
	})
};
/*		FUNCIÓN DE ESTILO DE ICONO		*/

/*	DAR ESTILO AL GEOJSON Y DEFINIR EL POP UP	*/
var icono = new L.geoJson(penas, {
    onEachFeature: popup, // Llama la función popUpInfo para presentar los datos de simbologia
    pointToLayer: estiloIcon
});
/*	DAR ESTILO AL GEOJSON Y DEFINIR EL POP UP	*/

/*	DEFINE EL GEOJSON, SU ICONO Y EL POP UP	*/
var penas = L.geoJson(penas, {
	icon: icono,
	onEachFeature: popup
});
/*	DEFINE EL GEOJSON, SU ICONO Y EL POP UP	*/

/*	APLICA EL ESTILO CLUSTER AL EL GEOJSON	*/
var marcadores = L.markerClusterGroup();
marcadores.addLayer(icono);
map.addLayer(marcadores);
/*	APLICA EL ESTILO CLUSTER AL EL GEOJSON	*/

/*	REALIZA UN CONTROLADOR DE CAPAS	*/
var baseMaps = {
    "OSM": osm,
    "PNOA": pnoa,
    "Watercolor": watercolor,
    "Carto": cartoNegro
};
var overlayMaps = null ;

L.control.layers(baseMaps, overlayMaps,{
	position: 'topright',
	collapsed: true,
	hideSingleBase: true
}).addTo(map);
/*	REALIZA UN CONTROLADOR DE CAPAS	*/


/*	APLICAR EL POP UP	*/
function popup(feature, layer) { 
	if (feature.properties && feature.properties.nombre) 
	{ 
		layer.bindPopup( "<span class='tituloPeña'>" + feature.properties.nombre + "</span></br><span class='tituloMunicipio'>(" + feature.properties.municipio + ")</span></br><div class='flex-center'><a class='botoncito btn-floating btn-sm btn-default' href=" +feature.properties.url+" target='_blank'><i class='icono fas fa-map-marked-alt'></i></a></div>"); 
	} 
}

/*	APLICAR EL POP UP	*/
function moveToLocation(latlng, title, map) {
	//map.fitBounds( latlng.layer.getBounds() );
	var zoom = map.getBoundsZoom(latlng.layer.getBounds());
	map.setView(latlng, zoom); // access the zoom
	}