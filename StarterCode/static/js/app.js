var demographic_info = d3.select("#sample-metadata");
function init() {
  var dropdownMenu = d3.select("#selDataset");
  var demographic_info = d3.select("#sample-metadata");
  // Assign the value of the dropdown menu option to a variable
  d3.json("samples.json").then( data => { 
  
  var map = d3.map(data); 
  A2 = map.values();
  //console.log(A2[0].slice(0,10));
 
  var id = A2[0].slice(0,10);
  var id2 = A2[1].slice(0,10);

  id.forEach(i => {
    dropdownMenu.append("option").text(i);
  
  })
  var dataset = dropdownMenu.property("value");
  
  demographic_info.property("value");
console.log(Object.entries(id2[0]));
Object.entries(id2[0]).forEach(([key,value])=>{demographic_info.append("h6").text(`${key}: ${value}`)});


  });
};
init();

var x = [];
var y = [];
var z = [];

//use d3 to read json file
d3.json("samples.json").then( data => { 
  var dropdownMenu = d3.select("#selDataset");
  var dataset = dropdownMenu.property("value");
  var demographic_info = d3.select("#sample-metadata")
  var dataset2 = demographic_info.property("value");

  //map values to a variable called map
  var map = d3.map(data); 
       
  // Calling the map.values() function
  // Getting an array of values for 
  // every entry in the map. 

  A = map.values(); 
  //check values in console window
  
  console.log(A);
  
  // grab only information from samples
  var bar_data = A[2];
  //Slice the first 10 objects for plotting
  bar_data = bar_data.slice(0,10);
  //check data
  console.log(bar_data);
     for (var i=0; i< bar_data.length; i++)
     {
       //push sample_values and otu_ids
       //to the empty list x and y
        x.push(bar_data[i].sample_values);
        y.push(bar_data[i].otu_ids);
        z.push(bar_data[i].otu_labels);
      };
// prepare bar chart data for graphing
      trace = {
        x: x[1].slice(0,10).reverse(),
        y: y[1].slice(0,10).map(otuID => `OTU ${otuID}`),
        hover_data: z[1].slice(0,10),
        type:'bar',
        orientation: 'h'
      };
// bar chart layout
      var layout = {
          title: "Top 10 OTUs",
          xaxis: { title: "Sample Values" },
          yaxis: { title: "OTU IDs"}
        };
      
      Plotly.newPlot("bar",[trace], layout);  
//prepare bubble chart data for graphing
trace2 = {
  y: y[1].slice(0,10).map(otuID => `OTU ${otuID}`),
  x: x[1].slice(0,10).reverse(),
  text: z[1].slice(0,10),
  mode:'markers', marker: {
   
    size:bar_data[1].sample_values,
    color: bar_data[1].otu_ids
  }
};

var layout2 = {
    yaxis: { title: "Sample Values" },
    xaxis: { title: "OTU IDs"}
  };
  Plotly.newPlot("bubble",[trace2], layout2); 

});

function optionChanged(name){

 d3.json("samples.json").then( data => { 
  
//     //map values to a variable called map
  var sample_info = data.metadata.filter((sample => sample.id == parseInt(name)))[0];
  demographic_info.html("");
  Object.entries(sample_info).forEach(([key,value])=>{demographic_info.append("h6").text(`${key}: ${value}`)});
    console.log(sample_info);
//rebuild new bar chart

var map = d3.map(data); 
       
  // Calling the map.values() function
  // Getting an array of values for 
  // every entry in the map. 

  A = map.values(); 
  //check values in console window
  
  console.log(A);
  
  // grab only information from samples
  var bar_data = A[2];
  //Slice the first 10 objects for plotting
  bar_data = bar_data.slice(0,10);
  //check data
  //console.log(bar_data);
  var id_change = bar_data.filter((sample => sample.id==name))
  console.log(id_change);
      trace = {
        x: id_change[0].sample_values.slice(0,10).reverse(),
        y: id_change[0].otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`),
        hover_data: id_change[0].otu_labels.slice(0,10),
        type:'bar',
        orientation: 'h'
      };

      var layout = {
          title: "Top 10 OTUs",
          xaxis: { title: "Sample Values" },
          yaxis: { title: "OTU IDs"}
        };
      
      Plotly.newPlot("bar",[trace], layout);  

      //bubble chart
      trace2 = {
        y: id_change[0].sample_values.slice(0,10).reverse(),
        x: id_change[0].otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`),
        text: id_change[0].otu_labels.slice(0,10),
        mode:'markers', marker: {
         
          size:id_change[0].sample_values,
          color: id_change[0].otu_ids
        }
      };
      var layout2 = {
          yaxis: { title: "Sample Values" },
          xaxis: { title: "OTU IDs"}
        };
      Plotly.newPlot("bubble",[trace2], layout2); 
})
};

