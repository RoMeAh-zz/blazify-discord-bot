Ascii Art Graph
===============


Currently uses d3 internally for domain/range generation, but the eventual goal is a "drop in" d3 compatible interface

Usage
-----

```javascript
var graph = new Graph.Timeseries({
    height : 20,
    width : 80,
    node : '@',
    line : '`',
    timeField : 'date',
    valueField : 'value',
    colors : ['red', 'blue']
});
graph.render({
    'timeseries-a' : [
      { value: 2, date: '2019-11-25T01:55:45.000Z' },
      { value: 5, date: '2019-11-25T01:56:45.000Z' },
      { value: 3, date: '2019-11-25T01:58:45.000Z' },
      { value: 11, date: '2019-11-25T01:59:45.000Z' }
  ],
  'timeseries-b' : [
    { value: 10, date: '2019-11-25T01:55:45.000Z' },
    { value: 8, date: '2019-11-25T01:56:45.000Z' },
    { value: 4, date: '2019-11-25T01:58:45.000Z' },
    { value: 6, date: '2019-11-25T01:59:45.000Z' }
  ]
}, function(err, result){
    //do something with the result
});
```

will render:

![multi-series](https://github.com/khrome/ascii-art-graph/raw/master/multi-series.png)

and you can get finer detail by using the `.braille()` method to use the braille charset to subgrid the individual characters.

```javascript
var graph = new Graph.Timeseries({
    height : 20,
    width : 80
});
graph.braille({
    'some-random-timeseries' : [
      { value: 2, date: '2019-11-25T01:55:45.000Z' },
      { value: 5, date: '2019-11-25T01:56:45.000Z' },
      { value: 3, date: '2019-11-25T01:58:45.000Z' },
      { value: 11, date: '2019-11-25T01:59:45.000Z' }
  ]
}, function(err, text, grid){
    //do something with the results
});
```
will render:

![simple-braille](https://github.com/khrome/ascii-art-graph/raw/master/simple-braille.png)

Roadmap
-------
- node output
- axes & labels
