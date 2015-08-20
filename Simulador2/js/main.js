$(function () {
    var graph =  $('#graph1').highcharts({
        chart: {
            type: 'column',
            height: 250,
        },
        title: {
            text: 'Precios'
        },
        
        xAxis: {
            categories: [
                'Competencia',
                'Cartel',
                'Multiplanta',
                'Monopolio'
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
                'Competencia',
                'Cartel',
                'Multiplanta',
                'Monopolio',
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
       
    $("#parameter_table input").change(function () {
        build_data();
    });
   
    $('[data-toggle="tooltip"]').tooltip()
     
    build_data();

    function build_data() {
        var a = 0, b = 0, c = 0, F = 0, n = 0;
        var Q_comp = 0, p_comp = 0, q_comp = 0, PI_comp = 0 ;
        var Q_cart = 0, p_cart = 0, q_cart = 0, PI_cart = 0, N_cart = 0;
        var Q_mult = 0, p_mult = 0, q_mult = 0, PI_mult = 0, N_mult = 0;
        var Q_mono = 0, p_mono = 0, q_mono = 0, PI_mono = 0, N_mono = 0;

        //Gat values of parameters
        a = getInputValue("parameter_a");
        b = getInputValue("parameter_b");
        F = getInputValue("parameter_F");
        c = getInputValue("parameter_c");
        n = getInputValue("parameter_n");

        if (a == null || b == null || c == null || F == null || n == null) {
            return;
        }
        //Validate parameters
        if ( !validate_parameter(a,b,c,F,n) ){
            return;
        }
        
        //Calculate Q,p,q and PI Competition
        Q_comp = a / ( 2 * c + b );
        p_comp = (2 * a * c)/( 2 *  c + b)
        q_comp = Q_comp/n
        PI_comp = p_comp * q_comp - ( F + c * ( q_comp * q_comp ) )
        
        setInputValue("ele_q_comp",q_comp );
        setInputValue("ele_Q_comp",Q_comp );
        setInputValue("ele_p_comp",p_comp);
        setInputValue("ele_PI_comp",PI_comp );
        
        //Calculate Q,p,q and PI Cartel
        q_cart = a / ( 2 * c + 2 * b * Math.floor( n ) );
        Q_cart = a * Math.floor( n ) / ( 2 * c + 2 * b * Math.floor( n ) )
        p_cart = (2 * a * c + a * b * Math.floor( n ) ) / ( 2 *  c + 2 * b * Math.floor( n ))
        N_cart = Math.floor( n );
        PI_cart = (p_cart * Q_cart - ( F + c * ( Q_cart * Q_cart ) )) / N_cart
        
        setInputValue("ele_q_cart",q_cart );
        setInputValue("ele_Q_cart",Q_cart );
        setInputValue("ele_p_cart",p_cart);
        setInputValue("ele_N_cart",N_cart );
        setInputValue("ele_PI_cart",PI_cart );
        
        //Calculate Q,p,q and PI Multiplanta
        N_mult = ( a * Math.sqrt(c) ) / ( 2 * b * Math.sqrt(F) ) - c/b;
        q_mult = a / ( 2 * c + 2 * b * Math.floor( N_mult ) );
        Q_mult = a * Math.floor( N_mult ) / ( 2 * c + 2 * b * Math.floor( N_mult ) )
        p_mult = (2 * a * c + a * b * Math.floor( N_mult ) ) / ( 2 *  c + 2 * b * Math.floor( N_mult ))
        PI_mult = p_mult * Q_mult - ( F + c * ( Q_mult * Q_mult ) )
        
        setInputValue("ele_q_mult",q_mult );
        setInputValue("ele_Q_mult",Q_mult );
        setInputValue("ele_p_mult",p_mult);
        setInputValue("ele_N_mult",N_mult );
        setInputValue("ele_PI_mult",PI_mult );
        
        //Calculate Q,p,q and PI Monopoly
        Q_mono = a / ( 2 * c + 2 * b )
        q_mono = Q_mono;
        p_mono = (2 * a * c + a * b ) / ( 2 *  c + 2 * b )
        PI_mono = p_mono * q_mono - ( F + c * ( q_mono * q_mono ) )
        
        setInputValue("ele_q_mono",q_mono );
        setInputValue("ele_Q_mono",Q_mono );
        setInputValue("ele_p_mono",p_mono);
        setInputValue("ele_PI_mono",PI_mono );
        
        build_graph([fixFloat(p_comp), fixFloat(p_cart), fixFloat(p_mult),fixFloat(p_mono)],[fixFloat(Q_comp), fixFloat(Q_cart), fixFloat(Q_mult),fixFloat(Q_mono)] );
        
        var EC_comp = 0, EP_comp = 0, BS_comp = 0, PIE_comp = 0, Total_comp = 0 ;
        var EC_cart = 0, EP_cart = 0, BS_cart = 0, PIE_cart = 0, Total_cart = 0;
        var EC_mult = 0, EP_mult = 0, BS_mult = 0, PIE_mult = 0, Total_mult = 0;
        var EC_mono = 0, EP_mono = 0, BS_mono = 0, PIE_mono = 0, Total_mono = 0;
        
        //Calculate EC, EP, BS, PIE and Total for Competition
        EC_comp = (a - p_comp)*(Q_comp-0)/2
        EP_comp = (p_comp - 0)*(Q_comp-0)/2
        BS_comp = EC_comp + EP_comp
        Total_comp = EC_comp + EP_comp + PIE_comp
        
        setInputValue("ele_EC_comp",EC_comp );
        setInputValue("ele_EP_comp",EP_comp );
        setInputValue("ele_BS_comp",BS_comp);
        setInputValue("ele_PIE_comp",PIE_comp );
        setInputValue("ele_total_comp",Total_comp );
        
        //Calculate EC, EP, BS, PIE and Total for Cartel
        EC_cart = (a - p_cart)*(Q_cart-0)/2
        PIE_cart = (p_cart - 2 * c *Q_cart)* (Q_comp - Q_cart )/2
        BS_cart = BS_comp - PIE_cart
        EP_cart = BS_cart - EC_cart
        Total_cart = EC_cart + EP_cart + PIE_cart
        
        setInputValue("ele_EC_cart",EC_cart );
        setInputValue("ele_EP_cart",EP_cart );
        setInputValue("ele_BS_cart",BS_cart);
        setInputValue("ele_PIE_cart",PIE_cart );
        setInputValue("ele_total_cart",Total_cart );
        
        //Calculate EC, EP, BS, PIE and Total for Multiplanta
        EC_mult = (a - p_mult)*(Q_mult-0)/2
        PIE_mult = (p_mult - 2 * c *Q_mult)* (Q_comp - Q_mult)/2
        BS_mult = BS_comp - PIE_mult
        EP_mult = BS_mult  - EC_mult 
        Total_mult = EC_mult + EP_mult  + PIE_mult 
        
        setInputValue("ele_EC_mult",EC_mult );
        setInputValue("ele_EP_mult",EP_mult );
        setInputValue("ele_BS_mult",BS_mult);
        setInputValue("ele_PIE_mult",PIE_mult );
        setInputValue("ele_total_mult",Total_mult );
        
        //Calculate EC, EP, BS, PIE and Total for Monopoly
        EC_mono = (a - p_mono)*(Q_mono-0)/2
        PIE_mono = (p_mono - 2 * c *Q_mono)* (Q_comp - Q_mono)/2
        BS_mono = BS_comp - PIE_mono
        EP_mono = BS_mono  - EC_mono 
        Total_mono = EC_mono + EP_mono  + PIE_mono 
        
        setInputValue("ele_EC_mono",EC_mono );
        setInputValue("ele_EP_mono",EP_mono );
        setInputValue("ele_BS_mono",BS_mono);
        setInputValue("ele_PIE_mono",PIE_mono );
        setInputValue("ele_total_mono",Total_mono );
       

    }

    function getFloat(n) {
        var num = parseFloat(n);
        if (!isNaN(num)) {
            return num;
        }
        return null;
    }  
    
    function fixFloat(n){
        return parseFloat(accounting.toFixed(n,2));
    }
    
    function validate_parameter(a,b,c,F,n){
        s = true;
        
        
        if( c < 0 || c > 1 ){
            $("#parameter_c").addClass("error").tooltip({placement: 'right', title: 'Parámetro c debe estar entre 0 y 1', trigger: 'manual', }).tooltip('show');
            s = false;
        }
        
        return s;
        
    }
    
    function getInputValue(id) {
        var i = $("#" + id);
        if (i.length <= 0) {
            return null;
        }
        var v = getFloat(i.val());
        if (!v && v != 0 ) {
            i.focus().addClass("error").tooltip({placement: 'right', title: 'Revisar', trigger: 'manual', }).tooltip('show');
        } else {
            i.removeClass("error").tooltip('destroy');
        }
        return v;
    }

    function setInputValue(id, value) {
        var i = $("#" + id);
        if (i.length <= 0) {
            return null;
        }
        i.val(accounting.toFixed(value,2));
    }

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

});