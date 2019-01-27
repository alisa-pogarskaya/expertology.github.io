// 1-й график

var chartData = [
    {
        year: 1999,
        value: 10
    }, 
    {
        year: 2000,
        value: 68
    }, 
    {
        year: 2001,
        value: 73
    }, 
    {
        year: 2002,
        value: 27
    }, 
    {
        year: 2003,
        value: 45
    }, 
    {
        year: 2004,
        value: 70
    }
  ];

var AMCHART_SERIAL_CONFIG = {
    "type": "serial",
    "startDuration": 0.5,   // loading animation, in second
    "valueAxes": [{
        maximum: 0,
        minimum: 100,
        "position": "left",
        "title": "Score"
    }],
    "graphs": [{
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillColorsField": "color",
        "fillAlphas": 1,
        "lineAlpha": 0.1,
        "type": "column",
        "valueField": "value"
    }],
    "depth3D": 20,
    "angle": 30,
    "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
    },
    
    dataProvider: chartData,

    "categoryField": "year",
    "categoryAxis": {
        "gridPosition": "start",
        "labelRotation": 45
    }
};

// 2-й график

var AMCHART_SERIAL_CONFIG_2 = {
  "type": "pie",
  "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
  "innerRadius": 40,
  "titleField": "country",
  "valueField": "litres",
  "fontSize": 12,
  "theme": "default",
  "allLabels": [],
  "balloon": {},
  "titles": [],
  "dataProvider": [
    {
      "country": "Czech Republic",
      "litres": "356.9"
    },
    {
      "country": "Ireland",
      "litres": 131.1
    },
    {
      "country": "Germany",
      "litres": 115.8
    },
    {
      "country": "Australia",
      "litres": 109.9
    },
    {
      "country": "Austria",
      "litres": 108.3
    },
    {
      "country": "UK",
      "litres": 65
    },
    {
      "country": "Belgium",
      "litres": "20"
    }
  ]
}

// вывод графиков

AmCharts.ready(function () {
var chart1 = AmCharts.makeChart("chart1div", $.extend(true, {}, AMCHART_SERIAL_CONFIG, { "theme": "dark" }) );
var chart2 = AmCharts.makeChart("chart2div", $.extend(true, {}, AMCHART_SERIAL_CONFIG_2, { "theme": "light" }) );
    });
