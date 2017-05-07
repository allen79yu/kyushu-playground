<template>
    <div>
        <label for="">search</label> <input id="search" type="text">
        <label for="">text</label> <input id="info" type="text">
        <button @click="search">search</button>
        <div id="map"></div>
        <modify-list :modifyArray="markers"></modify-list>
    </div>
</template>
<script>
import ModifyList from '../components/modifyList.vue';
export default{
    data(){
        return{
            map:{},
            markers:[],
            modifyArray:[]
        }
    },
    mounted(){
        this.initMap();
    },
    methods:{
        queryMarker(){
            firebase.database().ref('/member_pins/' + localStorage.mapUid).once('value')
            .then((snapshot)=>{
                
                Object.keys(snapshot.val()).map((objectkey, index)=>{
                    this.markers.push(snapshot.val()[objectkey]);
                    this.markers[index]['id'] = objectkey;
                    var pin = {};
                    pin.lat = snapshot.val()[objectkey].lat;
                    pin.lng = snapshot.val()[objectkey].lng;
                    pin.description = snapshot.val()[objectkey].description;
                    this.setMarker(pin.lat, pin.lng, pin.description);
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
                var info = document.getElementById('info');
                this.setMarker(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng, info.value);
                this.sendToFirebase(res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng, info.value);
            }
        },
        sendToFirebase(lat, lng, des){
            let pushKey = firebase.database().ref('/member_pins/' + localStorage.mapUid + '/').push({
                lat:lat,
                lng:lng,
                description:des
            }).key;
            this.markers.push({
                id:pushKey,
                lat:lat,
                lng:lng,
                description:des
            });
        },
        setMarker(lat, lng, info) {
            
            var infowindow = new google.maps.InfoWindow({
                content: info
            });
            
            var marker = new google.maps.Marker({
                position: { lat: Number(lat), lng: Number(lng) },
                title: "here"
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            this.modifyArray.push(marker);
            marker.setMap(this.map);
        }
    },
    components:{
        'modify-list':ModifyList
    }
}

</script>