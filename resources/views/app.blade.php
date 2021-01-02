<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel Google Maps Demo</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Nunito', sans-serif;
                font-weight: 200;
                height: 100vh;
                margin: 1rem 2rem;
            }
        </style>
    </head>
    <body>
        
        <div class="flex-center position-ref full-height">
          

            <div class="content">
            
                <h2>Laravel Google Maps Demo</h2>
            
                <div class="map" id="app">
                    <div class="col-sm-12">
                        <div class="row">
                            <select v-model="gender">
                                <option value="">Both</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
        
                            <input type="text" v-model="user_name" placeholder="Filter By Name"/>
        
                            <select v-model="selectedCity">
                                <option value="">Select center city</option>
                                <option v-for="(optionCity,key) in centerCities" :value="optionCity.name">
                                    @{{ optionCity.name }}
                                  </option>
                            </select>
        
                            <h2> Total Male : @{{ genderCount.maleUsersCount }}  </h2>
                            <h2>Total Female :  @{{ genderCount.femaleUsersCount }} </h2>
                        </div>
                    </div>
                    

                    <gmap-map
                        :center="mapCenter"
                        :zoom="4"
                        style="width: 100%; height: 440px;"
                    >

                    <gmap-circle
                        :center="mapCenter"
                        :radius="2000000"
                        :visible="true"
                        :options="{fillColor:'red',fillOpacity:0.2}"
                    ></gmap-circle>

                    <gmap-info-window
                        :options="infoWindowOptions"
                        :position="infoWindowPosition"
                        :opened="infoWindowOpened"
                        @closeclick="handleInfoWindowClose"
                    >

                        <div class="info-window">
                            <h2 v-text="activeUser.first_name+ ' ' + activeUser.last_name"></h2>
                            <h5 v-text="'Gender: ' + activeUser.gender"></h5>
                            <p v-text="activeUser.lat + ', ' + activeUser.lon"></p>
                        </div>

                    </gmap-info-window>
                    
                    <gmap-marker
                        v-for="(user,index) in filteredUsersData"
                        :key="user.id"
                        :position="getPosition(user)"
                        :clickable="true"
                        :draggable="false"
                        :icon="getColoerdMarker(user)"
                        @click="handleMarkerClicked(user)"
                    >
                    </gmap-marker>

                </gmap-map>
                </div>
            </div>
        </div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>