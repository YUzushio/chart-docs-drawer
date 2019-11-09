/* jshint browser: true, esversion: 5 */
/* globals document,Vue,window,uibuilder */
// @ts-nocheck
/*
  Copyright (c) 2019 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict'

/** @see https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Front-End-Library---available-properties-and-methods */

// eslint-disable-next-line no-unused-vars
var app1 = new Vue({
    el: '#app',
    data: {
        // Single series line chart
        lineChartData: [
            ['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3],
        ],
        // Multi-series line chart
        lineChartData2: [
            {name: 'Workout', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4}},
            {name: 'Call parents', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}},
        ],

        // Area chart
        areaChartData: [], //{
            //'2017-01-01 00:00:00 -0800': 2,
            //'2017-01-01 00:01:00 -0800': 5,
        //},

    }, // --- End of data --- //
    computed: {
    }, // --- End of computed --- //
    methods: {
    }, // --- End of methods --- //

    // Available hooks: init,mounted,updated,destroyed
    mounted: function(){
        /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
         * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
         * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
         * e.g. uibuilder.start('/nr/uib', '/nr/uibuilder/vendor/socket.io') // change to use your paths/names
         */
        uibuilder.start()

        var vueApp = this

        // Process new messages from Node-RED
        uibuilder.onChange('msg', function (newVal) {
            // We are assuming that msg.payload is an array like [datenum, value]

            // Add new element
            vueApp.areaChartData.push( new Array( (new Date(newVal.payload[0])), newVal.payload[1] ) )

            // If data array > 1000 points, keep it at that length by losing the first point
            if ( vueApp.areaChartData.length > 1000 ) vueApp.areaChartData.shift()

            //console.log(vueApp.areaChartData)
        })

    } // --- End of mounted hook --- //

}) // --- End of app1 --- //

// EOF
