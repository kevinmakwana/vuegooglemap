require('./bootstrap');

window.Vue = require('vue');

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyCswGFMpRa1XAyhN5DMvaA4LWId1eR06R0',
    }
});

const app = new Vue({
    el: '#app',
    data(){
        return {
            updatedUsers : [],
            users : [],
            gender : '',
            userName : '',
            selectedCity: '',
            infoWindowOptions: {
                pixelOffset: {
                    width: 0,
                    height: -30
                }
            },
            activeUser: {},
            infoWindowOpened: false,
            radiusOfCircle : 2000000,
            
            centerCities: [
                {
                    name : 'London',
                    lat : 51.528308,
                    lon : -0.3817862
                },
                {
                    name : 'Paris',
                    lat : 48.8588377,
                    lon : 2.2770196
                },
                {    
                    name : 'Kansas',
                    lat : 38.4773648,
                    lon : -100.5641916
                }
            ]
        }
    },
    created() {
        axios.get('/api/users')
            .then((response) => 
                this.users = response.data.users
            )
            .catch((error) => console.error(error));
    },
    methods : {
        getPosition(user) {
            return {
                lat: parseFloat(user.lat),
                lng: parseFloat(user.lon)
            }
        },
        getColoerdMarker(user){
            if(user.gender == "Female"){
                return 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'; 
            }else if(user.gender == "Male"){
                return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            }
        },
        handleMarkerClicked(user) {
            this.activeUser = user;
            this.infoWindowOpened = true;
        },
        handleInfoWindowClose() {
            this.activeUser = {};
            this.infoWindowOpened = false;
        },
        validateGenderOrUserName(){
            if (this.gender == '' || this.userName == ''){ 
                this.updatedUsers = this.users;
            }
        },
        filterByGender(){
            if(this.gender != ''){                
                this.updatedUsers = this.users.filter(user => user.gender == this.gender); 
            }
        },
        filterByUserName(){
            if(this.userName != ''){
                this.updatedUsers = this.users.filter( user => (!user.first_name.indexOf(this.userName)) || (!user.last_name.indexOf(this.userName)) );
            }
        },
        filterByCityCenter(){
            if (this.selectedCity != '') {
                let filterdUsers = [];
                let CenterOfCircle = new google.maps.LatLng(parseFloat(this.selectedCity[0].lat), parseFloat(this.selectedCity[0].lon));
                let radiusOfCircle=  this.radiusOfCircle;
                $.each(this.updatedUsers, function(key, user) {
                    let latLng = new google.maps.LatLng(user.lat, user.lon);
                    let dist  = google.maps.geometry.spherical.computeDistanceBetween(CenterOfCircle,latLng);   
                   
                    if (dist <= radiusOfCircle){
                            filterdUsers.push(user);
                    } 
                });
                this.updatedUsers = filterdUsers;
            }
        }
    },
    computed: {
        genderCount() {
            let maleUsers = this.updatedUsers.filter(user => user.gender == 'Male');
            let femaleUsers = this.updatedUsers.filter(user => user.gender == 'Female');
            return {
                maleUsersCount : maleUsers.length,
                femaleUsersCount : femaleUsers.length
            };
        },
        mapCenter() {

            if (this.selectedCity == '') {
                return {
                    lat: parseFloat(this.centerCities[0].lat),
                    lng: parseFloat(this.centerCities[0].lon)
                }
            }

            this.selectedCity = this.centerCities.filter(city => city.name == this.selectedCity);
            
            return {
                lat: parseFloat(this.selectedCity[0].lat),
                lng: parseFloat(this.selectedCity[0].lon)
            }
        },
        infoWindowPosition() {
            return {
                lat: parseFloat(this.activeUser.lat),
                lng: parseFloat(this.activeUser.lon)
            };
        },
        filteredUsersData: function () {
            
            
            this.validateGenderOrUserName(); 
            
            this.filterByGender();
            
            this.filterByUserName();
            
            this.filterByCityCenter();
            
            return this.updatedUsers;
        }
    }
    
});

