// Created by Colin Matthews for Flexxia on August 18th, 2017
// Not compatiable with IE 11 due to use of FetchAPI
// Not compatiable with old verisons of Edge due to use of CSS Grids

// Note:
// The VueJs code sits inside the fetch promise because VueJs needs the style properties provided by the json file
// in order to render the components. If the Vue components weren't dependent on the JSON data for rendering, we could
// asynchronously fetch the json data and render the components. For example, if we just wanted the data from the
// JSON file, we could render the components, and then populate the data when the promise resolves.


fetch("Task-json.json")
	 .then(response => response.json())
	 .then(json => {
	 	console.log(json);

	 	// Tile Component
	 	// props: tileStyle, passed from the appComponent. Contains tile css
	 	Vue.component('tile', {
		  props:['tileStyle'],
		  template:`<div class="tile" v-bind:style="styleObject">
		  				<div class="topRow">
				  			<p class="tileNumber">{{tileNumber}}</p>
				  			<p class="caret"><i class="fa fa-caret-down" aria-hidden="true"></i></p>
			  			</div>
			  			<p class="tileText">{{tileText}}</p>
		  			</div>`,

		  data:function() {
		  	return{
			  	styleObject: {
				    backgroundColor: this.tileStyle.bgColor,
			    },
			    tileNumber: this.tileStyle.tileNumber,
			    tileText: this.tileStyle.tileText
			}
		  }
		});


	 	//Graph Component
		Vue.component('graph', {
		  props:['title'],
		  template: `<canvas class="graph"></canvas>`,
		  mounted:function(){
		  	var barData = json.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartData;
		  	var barOptions = json.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartOptions;
		    new Chart(document.getElementById("Clinical Practice").getContext("2d")).Bar(barData,barOptions);


		    var pieData = json.contentSection[1].middle.middleMiddle.middleMiddleMiddle.chartData;
		    var pieOptions = json.contentSection[1].middle.middleMiddle.middleMiddleMiddle.chartOptions;
		    new Chart(document.getElementById("How effective is the speaker?").getContext("2d")).Pie(pieData,pieOptions);
		  }
		});

		// Graph-Conainer Component
		// wrapper for the graph, renders the title bar and the graph component
		Vue.component('graph-container',{
			props:['title'],
			template: `<div class="graph-wrapper">
							<div class="graph-header">
								<p  class="graph-header-text">{{title}}</p>
								<p><i class="fa fa-caret-down graph-caret" aria-hidden="true"></i></p>
							</div>
							<graph v-bind:id="title"></graph>
						</div>`,

		});


		// App Component
		// wrapper component to manage data and render other components.
		Vue.component('app', {
		  data:function(){
		  	return{
			  	tile1: {
			  		bgColor:json.tilesSection[0].tileBgColor,
			  		tileNumber:json.tilesSection[0].tileNumber,
			  		tileText:json.tilesSection[0].tileText,

			  	},
			  	tile2: {
			  		bgColor:json.tilesSection[1].tileBgColor,
			  		tileNumber:json.tilesSection[1].tileNumber,
			  		tileText:json.tilesSection[1].tileText,

			  	},
			  	tile3: {
			  		bgColor:json.tilesSection[2].tileBgColor,
			  		tileNumber:json.tilesSection[2].tileNumber,
			  		tileText:json.tilesSection[2].tileText,

			  	},
			  	tile4: {
			  		bgColor:json.tilesSection[3].tileBgColor,
			  		tileNumber:json.tilesSection[3].tileNumber,
			  		tileText:json.tilesSection[3].tileText,
			  	},
			  }
		  },
		  template: `<div>
			  			<div class="tile-section">
							<tile v-bind:tileStyle="tile1"></tile>
							<tile v-bind:tileStyle="tile2"></tile>
							<tile v-bind:tileStyle="tile3"></tile>
							<tile v-bind:tileStyle="tile4"></tile>
						</div>

						<div class="graph-section">
								<graph-container title="Clinical Practice"></graph-container>
								<graph-container title="How effective is the speaker?"></graph-container>			
						</div>
					</div>
					`
		});

		// Register instance of Vue and anchor it to the "app" div
		var app = new Vue({
		  el: '#app'
		});
});
