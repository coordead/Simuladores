var graph = $('#graph1').highcharts({
    chart: {
        type: 'column',
        height: 250,
    },
    title: {
        text: 'Precios'
    },
    xAxis: {
        categories: [
            'Monopolio',
            'Cartel',
            'Cournot'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'p'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}: </span>',
        pointFormat: '<b>{point.y:.1f}</b',
        footerFormat: '',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: []
}).highcharts();

var graph2 = $('#graph2').highcharts({
    chart: {
        type: 'column',
        height: 250,
    },
    title: {
        text: 'Producción'
    },
    xAxis: {
        categories: [
            'Monopolio',
            'Cartel',
            'Cournot'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Q'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}: </span>',
        pointFormat: '<b>{point.y:.1f}</b',
        footerFormat: '',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: []
}).highcharts();

$('[data-toggle="tooltip"]').tooltip()

function build_graph(prices_series, production_series) {
    var PRICES_SERIES = {
        colorByPoint: true,
        data: prices_series,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }

    if (graph.series.length) {
        graph.series[0].remove(false);
    }
    graph.addSeries(PRICES_SERIES);

    var PRODUCTION_SERIES = {
        colorByPoint: true,
        data: production_series,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.1f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '11px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }

    if (graph2.series.length) {
        graph2.series[0].remove(false);
    }
    graph2.addSeries(PRODUCTION_SERIES);
}

/*$.get("lib/pdfjs/web/viewer.html?file=doc/Simulator_01_(Competencia_y_Monopolio).pdf", function(data){
 $("#pdf_viewer_load").html(data);
 })*/