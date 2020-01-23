var url = "/aircraft";
d3.json(url).then(function(charts) {

    var trace1 = {
        type: 'bar',
        marker: {color: '#3F5400'},
        y: charts.map(row => row.flights),
        x: charts.map(row => row.type),
    }

    var planes = [trace1];

    var layout1 = {
        plot_bgcolor: '#121226',
        name: 'Flight Missions for Each Aircraft',
        title: {
            text:'10 Most Used Aircraft',
            font: {
              family: 'Helvetic',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },
          xaxis: {
            title: {
              text: 'Aircraft Name',
              font: {
                family: 'Helvetic',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Total Number of Missions Flown',
              font: {
                family: 'Helvetice',
                size: 18,
                color: '#7f7f7f'
              }
            }
          }
    }

    Plotly.plot('plot1', planes, layout1);

});

var url2 = "/yearly_missions";
d3.json(url2).then(function(charts) {

    var trace2 = {
        type: 'pie',
        values: charts.map(row => row.missions),
        labels: charts.map(row => row.year),
        hole: .4,
        marker: {
            colors: ['#465C03', '#66743C', '#7EA701', '#769710', '#8CB40E', '#8EA44B', '#9FC529' ]
          },
    }

    var missions = [trace2];

    var layout2 = {
        plot_bgcolor: '#121226',
        name: 'Flight Missions by Year',
        title: {
            text:'Number of Missions Flown Per Year',
            font: {
              family: 'Helvetic',
              size: 24
            }
        }
    }

    Plotly.plot('plot2', missions, layout2);

});

var url3 = "/country_flying"
d3.json(url3).then(function(charts) {

    var trace3 = {
        x: ['1939', '1940', '1941', '1942', '1943', '1944', '1945'],
        y: [41, 6710, 10225, 4139, 2705, 5205, 2355],
        type: 'bar',
        name: 'Great Britain/South Africa',
        marker: {
            color: '#465C03'
        }
    };

    var trace4 = {
        x: ['1939', '1940', '1941', '1942', '1943', '1944', '1945'],
        y: [0, 32, 45, 1369, 14911, 46040, 31768],
        type: 'bar',
        name: 'USA',
        marker: {
            color: '#66743C'
        }
    };

    var trace5 = {
        x: ['1939', '1940', '1941', '1942', '1943', '1944', '1945'],
        y: [0, 0, 4, , 312, 9, 314, 310],
        type: 'bar',
        name: 'AUS/NZ',
        marker: {
            color: '#7EA701'
        }
    };

    var data = [trace3, trace4, trace5];

    var layout3 = {
        plot_bgcolor: '#121226',
        name: 'Participating Countries',
        title: {
            text:'Allied Powers Flight Missions',
            font: {
              family: 'Helvetic',
              size: 24
            },
            xref: 'paper',
            x: 0.05,
          },
          xaxis: {
            title: {
              text: 'Year',
              font: {
                family: 'Helvetic',
                size: 18,
                color: '#7f7f7f'
              }
            },
          },
          yaxis: {
            title: {
              text: 'Total Number of Missions Flown',
              font: {
                family: 'Helvetice',
                size: 18,
                color: '#7f7f7f'
              }
            }
          },
          barmode: 'group'
    }

    Plotly.newPlot('plot3', data, layout3);
    
});

// var url3 = "/flights_by_year"
// d3.json(url3).then(function(data) {

//     tickDuration = 425;
//     top_n = 10;

//     chart = {
//         const svg = d3.select(plot4.svg(width, height));
        
//         const margin = {
//           top: 80,
//           right: 0,
//           bottom: 5,
//           left: 0
//         };
        
//         let barPadding = (height-(margin.bottom+margin.top))/(top_n*5);
        
//         let title = svg.append('text')
//           .attrs({
//             class: 'title',
//             y: 24
//           }) 
//           .style('font-family','Roboto Condensed')
//           .html('Top 10 Aircraft Used During WWII');
        
//         let subTitle = svg.append('text')
//           .attrs({
//             class: 'subTitle',
//             y: 55
//           })
//           .style('font-family','Roboto Condensed')  
//           .html('Total Missions Flown');
        
//         let caption = svg.append('text')
//           .attrs({
//             class: 'caption',
//             x: width,
//             y: height-5
//           })
//           .styles({
//             'text-anchor': 'end'
//           })
//           .html('Source: MLB');
      
//         let year = 1939;
        
//         data.forEach(d => {
//           d.missions = +d.missions,
//           d.missions = isNaN(d.missions) ? 0 : d.missions,
//           d.year = +d.year,
//           d.colour = d3.hsl(Math.random()*360,0.75,0.75)
//         });
        
//         let yearSlice = data.filter(d => d.year == year && !isNaN(d.missions))
//           .sort((a,b) => b.missions - a.missions)
//           .slice(0,top_n);
        
//         yearSlice.forEach((d,i) => d.rank = i);
        
//         let x = d3.scaleLinear()
//           .domain([0, d3.max(yearSlice, d => d.missions)])
//           .range([margin.left, width-margin.right-65]);
        
//         let y = d3.scaleLinear()
//           .domain([top_n, 0])
//           .range([height-margin.bottom, margin.top]);
        
//         let xAxis = d3.axisTop()
//           .scale(x)
//           .ticks(width > 500 ? 5:2)
//           .tickSize(-(height-margin.top-margin.bottom))
//           .tickFormat(d => d3.format(',')(d));
        
//         svg.append('g')
//           .attrs({
//             class: 'axis xAxis',
//             transform: `translate(0, ${margin.top})`
//           })
//           .call(xAxis)
//             .selectAll('.tick line')
//             .classed('origin', d => d == 0);
        
//         svg.selectAll('rect.bar')
//           .data(yearSlice, d => d.aircraft_name)
//           .enter()
//           .append('rect')
//           .attrs({
//             class: 'bar',
//             x: x(0)+1,
//             width: d => x(d.missions)-x(0)-1,
//             y: d => y(d.rank)+5,
//             height: y(1)-y(0)-barPadding
//           })
//           .styles({
//             fill: d => d.colour
//           });
        
//         svg.selectAll('text.label')
//           .data(yearSlice, d => d.aircraft_name)
//           .enter()
//           .append('text')
//           .attrs({
//             class: 'label',
//             x: d => x(d.missions)-8,
//             y: d => y(d.rank)+5+((y(1)-y(0))/2)+1,
//             'text-anchor': 'end'
//           })
//             .style('font-family','Roboto Condensed')
      
//           .html(d => d.aircraft_name);
        
//         console.log(yearSlice)
//         svg.selectAll('text.valueLabel')
//           .data(yearSlice, d => d.aircraft_name)
//           .enter()
//           .append('text')
//           .attrs({
//             class: 'valueLabel',
//             x: d => x(d.missions)+5,
//             y: d => y(d.rank)+5+((y(1)-y(0))/2)+1,
//           })
          
        
//         let yearText = svg.append('text')
//           .attrs({
//             class: 'yearText',
//             x: width-margin.right,
//             y: height-25
//           })
//           .styles({
//             'text-anchor': 'end'
//           })
//           .html(~~year)
//           .call(halo, 10);
        
//         let ticker = d3.interval(e => {
        
//           console.log(year)
//           yearSlice = data.filter(d => d.year == year && !isNaN(d.missions))
//       //      .sort((a,b) => b.value - a.value)
//             .slice(0,top_n);
          
//           console.log(yearSlice);
          
//          yearSlice.forEach((d,i) => d.rank = i);
          
//           x.domain([0, d3.max(yearSlice, d => d.missions)]);
          
//           svg.select('.xAxis')
//             .transition()
//             .duration(tickDuration)
//             .ease(d3.easeLinear)
//             .call(xAxis);
          
//           let bars = svg.selectAll('.bar').data(yearSlice, d => d.aircraft_name);
          
//           bars
//             .enter()
//             .append('rect')
//             .attrs({
//               class: d => `bar ${d.aircraft_name.replace(/\s/g,'_')}`,
//               x: x(0)+1,
//               width: d => x(d.missions)-x(0)-1,
//               y: d => y(top_n+1)+5,
//               height: y(1)-y(0)-barPadding
//             })
//             .styles({
//               fill: d => d.colour
//             })
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 y: d => y(d.rank)+5
//               });
          
//           bars
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 width: d => x(d.missions)-x(0)-1,
//                 y: d => y(d.rank)+5
//               });
          
//           bars
//             .exit()
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 width: d => x(d.missions)-x(0)-1,
//                 y: d => y(top_n+1)+5
//               })
//               .remove();
          
//           let labels = svg.selectAll('.label').data(yearSlice, d => d.aircraft_name);
          
//           labels
//             .enter()
//             .append('text')
//             .attrs({
//               class: 'label',
//               x: d => x(d.missions)-8,
//               y: d => y(top_n+1)+5+((y(1)-y(0))/2),
//               'text-anchor': 'end'
//             })
//             .html(d => d.aircraft_name)
//           .style('font-family','Roboto Condensed')
          
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 y: d => y(d.rank)+5+((y(1)-y(0))/2)+1,
//               });
          
//           labels
//             .transition()
//             .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 x: d => x(d.missions)-8,
//                 y: d => y(d.rank)+5+((y(1)-y(0))/2)+1
//               });
          
//           labels
//             .exit()
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 x: d => x(d.missions)-8,
//                 y: d => y(top_n+1)+5
//               })
//               .remove();
          
//           let valueLabels = svg.selectAll('.valueLabel').data(yearSlice, d => d.aircraft_name);
          
//           valueLabels
//             .enter()
//             .append('text')
//             .attrs({
//               class: 'valueLabel',
//               x: d => x(d.missions)+5,
//               y: d => y(top_n+1)+5,
//             })
           
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 y: d => y(d.rank)+5+((y(1)-y(0))/2)+1
//               });
          
//           valueLabels
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 x: d => x(d.missions)+5,
//                 y: d => y(d.rank)+5+((y(1)-y(0))/2)+1
//               })
//               .tween("text", function(d) {
//                 let i = d3.interpolateRound(d.missions, d.missions);
//                 return function(t) {
//                   this.textContent = d3.format(',')(i(t));
//                 };
//               });
          
//           valueLabels
//             .exit()
//             .transition()
//               .duration(tickDuration)
//               .ease(d3.easeLinear)
//               .attrs({
//                 x: d => x(d.missions)+5,
//                 y: d => y(top_n+1)+5
//               })
//               .remove();
          
//           yearText.html(~~year);
          
//           if(year == 1945) ticker.stop();
//           year++;
//         },tickDuration);
      
//         return svg.node();
//     }
// });