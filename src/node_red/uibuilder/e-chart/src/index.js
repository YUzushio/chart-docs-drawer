/* jshint browser: true, esversion: 5 */
/* globals document,Vue,window,uibuilder,VueECharts */
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

/** Reference the component (removes need for a build step with import) */
Vue.component('v-chart', VueECharts)

// eslint-disable-next-line no-unused-vars
var app1 = new Vue({
    el: '#app',
    data: {
        // Data for bar chart
        ecOptionsBar: {
            title: {
                text: 'ECharts entry example',
            },
            tooltip: {},
            legend: {
                data:['Sales'],
            },
            xAxis: {
                data: ['shirt','cardign','chiffon shirt','pants','heels','socks'],
            },
            yAxis: {},
            series: [{
                name: 'Sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
            }],
        },

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
            if ( typeof newVal.payload === 'number' ){
                // Add new element
                vueApp.ecOptionsBar.series[0].data.push(newVal.payload)
                // Lose the first element
                vueApp.ecOptionsBar.series[0].data.shift()
                //console.log(vueApp.ecOptionsBar.series[0].data)
            }
        })

    } // --- End of mounted hook --- //

}) // --- End of app1 --- //

// EOF