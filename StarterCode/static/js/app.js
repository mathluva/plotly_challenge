d3.json("samples.json").then(function(data){
    console.log(data);
    var trace1 = {
        x: data.samples,
        y: data.names,
        marker: {
          color: 'rgba(1,1,1,0.0)'
        },
        type: 'bar'
      };
    Plotly.newPlot("bar",[trace1]);
});

   
