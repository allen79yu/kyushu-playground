<template>
    <div>
        <label for="">lat</label><input id="lat" type="text">
        <label for="">lng</label><input id="lng" type="text">
        <label for="">search</label> <input id="search" type="text">
        <label for="">text</label> <input id="info" type="text">
        <button @click="pinMap">pin</button>
        <button @click="search">search</button>
        <div id="map"></div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            map:{},
            markers:{}
        }
    },
    mounted(){
        this.initMap();
    },
    methods:{
        queryMarker(){
            firebase.database().ref('/member_pins/' + localStorage.mapUid).once('value').then((snapshot)=>{
                this.markers = snapshot.val();
                Object.keys(this.markers).map((objectkey)=>{
                    var pin = {};
                    pin.lat = this.markers[objectkey].lat;
                    pin.lng = this.markers[objectkey].lng;
                    pin.description = this.markers[objectkey].description;
                    var marker = new google.maps.Marker({
                        position: pin,
                        map: this.map
                    });
                    var infowindow = new google.maps.InfoWindow({
                        content: pin.description
                    });
                    marker.addListener('click', function () {
                        infowindow.open(map, marker);
                    });
                });
            });
        },
        initMap() {
            var Fukuoka = { lat: 33.569271, lng: 130.356005 };
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 9,
                center: Fukuoka
            });
            var marker = new google.maps.Marker({
                position: Fukuoka,
                map: this.map
            });
            this.queryMarker();
        },
        search() {
            var searchText = document.getElementById('search');

            console.log(searchText.value);
            axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + searchText.value + '&component=administrative_area&key=AIzaSyD-HFPWoUOQk2i7Fk9B_epsWmqDFrcdJ6E')
                .then((response) => {
                    console.log(response);
                    this.resolveResults(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        resolveResults(res) {
            if (res.status == 200 && res.data.status == 'OK') {
                this.setMarker(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng);
            }
        },
        pinMap(lat, lng) {
            var lat = document.getElementById('lat');
            var lng = document.getElementById('lng');
            console.log(lat.value, lng.value);
            this.setMarker(lat.value, lng.value);
        },
        sendToFirebase(lat, lng, des){
            firebase.database().ref('/member_pins/' + localStorage.mapUid + '/').push({
                lat:lat,
                lng:lng,
                description:des
            });
        },
        setMarker(lat, lng) {
            var info = document.getElementById('info');
            var infowindow = new google.maps.InfoWindow({
                content: info.value
            });
            this.sendToFirebase(lat, lng, info.value);
            var marker = new google.maps.Marker({
                position: { lat: Number(lat), lng: Number(lng) },
                title: "here"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            marker.setMap(this.map);
        }
    }
}
</script>