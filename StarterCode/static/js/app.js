var x = [];
var y = [];

//use d3 to read json file
d3.json("samples.json").then( data => { 
  
  //map values to a variable called map
  var map = d3.map(data); 
       
  // Calling the map.values() function
  // Getting an array of values for 
  // every entry in the map. 

  A = map.values(); 
  //check values in console window
  
  //console.log(A);
  
  // grab only information from samples
  var bar_data = A[2]
  // ???Slice the first 10 objects for plotting ???
  bar_data = bar_data.slice(0,10);
  //check data
  //console.log(bar_data);
     for (var i=0; i< bar_data.length; i++)
     {
       //push sample_values and otu_ids
       //to the empty list x and y
        x.push(bar_data[i].sample_values);
        y.push(bar_data[i].otu_ids);
      };
       
});
console.log(x);
console.log(y);
trace = {
  x: x,
  y: y,
  type:'bar',
  orientation: 'h' };

Plotly.newPlot("bar",[trace]);
