$(function () {
   
    var graph = $('#container_graph').highcharts({
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        colors: ["#2b908f", "#90ee7e", "#7798BF", "#ff0066"],
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            },
            series: {
                marker: {
                    lineWidth: 0.5,
                    radius: 2,
                    lineColor: null // inherit from series
                }
            }
        },
        xAxis: {
            title: {
                text: 'Q'
            },
            plotLines: [{
                    value: 0,
                    width: 0,
                    color: '#808080'
            }]
            
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: 'x = {point.x}, y = {point.y}'
        },
        yAxis: {
            title: {
                text: 'P'
            },
            gridLineColor: 'transparent',
            tickInterval: 10,
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#000000'
                }]
        },
        series: []
    }).highcharts();
    
    $("#parameter_table input").change(function () {
        build_data();
    });
    
    $('[data-toggle="tooltip"]').tooltip()
  
    
    build_data();


    function build_data() {
        var a = 0, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 0, k = 0, p_ast = 0, p_m = 0, q_ast = 0, q_m = 0;

        //Gat values of parameters
        a = getInputValue("parameter_a");
        b = getInputValue("parameter_b");
        c = getInputValue("parameter_c");
        d = getInputValue("parameter_d");

        if (a == null || b == null || c == null || d == null) {
            return;
        }
        
        if ( !validate_parameter(a,b,c,d) ){
            return;
        }
        
        //Calculate Competition
        q_ast = ((a - c) / (d + b));
        p_ast = (a - b * q_ast);
        setInputValue("competition_p", p_ast);
        setInputValue("competition_q", q_ast);

        //Calculate monopoly
        q_m = ((a - c) / (2 * b + d));
        p_m = (a - b * q_m);
        setInputValue("monopoly_p", p_m);
        setInputValue("monopoly_q", q_m);

        //Set other vars
        e = (a - p_m);
        f = (p_m - p_ast);
        i = (q_m);
        j = (q_ast - q_m);
        k = (c + q_m * d);
        g = (p_ast - k);
        h = (k - c);

        //Set competition monpoly / EC EP BS PIE
        var ec_comp = ((e + f) * (i + j) / 2),
                ec_mono = (e * i / 2),
                ep_com = ((g + h) * (i + j) / 2),
                bs_comp = (ec_comp + ep_com),
                pie_mono = ((f * j / 2) + (g * j / 2)),
                ep_mono = (bs_comp - ec_mono - pie_mono),
                pie_comp = 0,
                bs_mono = (ec_mono + ep_mono),
                total_comp = (bs_comp + pie_comp),
                total_mono = (bs_mono + pie_mono);

        setInputValue("ele_EC_comp", ec_comp);
        setInputValue("ele_EC_mono", ec_mono);

        setInputValue("ele_EP_comp", ep_com);
        setInputValue("ele_EP_mono", ep_mono);

        setInputValue("ele_BS_comp", bs_comp);
        setInputValue("ele_BS_mono", bs_mono);

        setInputValue("ele_PIE_comp", pie_comp);
        setInputValue("ele_PIE_mono", pie_mono);

        setInputValue("ele_total_comp", total_comp);
        setInputValue("ele_total_mono", total_mono);


        var footer_table_data = new Array(4);
        footer_table_data[2] = q_ast * 2;
        footer_table_data[3] = 20;
        footer_table_data[1] = c + d * footer_table_data[2];
        footer_table_data[0] = a - b * footer_table_data[2];

        var dd = 0, oo = 0, cant = 0, temp = 0,count_x = 0, oo_series = new Array(), dd_series = new Array(), p_ast_serires = new Array(), q_ast_serires = new Array();
        cant = footer_table_data[2];
        
        var j = 0,p_a_table = "";
        $("#datatable tbody").empty();
        for (var i = 19; i >= 0; i--) {
            temp = accounting.toFixed(cant - footer_table_data[2] / 20,2);
            cant = parseFloat(temp);
            oo = accounting.toFixed(c + d * temp,2);
            dd =accounting.toFixed( a - b * temp,2);
            oo_series[i] = parseFloat(oo);
            dd_series[i] = parseFloat(dd);
            cant = temp;
            p_a_table = "";
            if( i < 11 ){
                if(cant <= q_ast){
                    p_ast_serires[i] = p_ast;
                    count_x++;
                    p_a_table =accounting.toFixed(p_ast,2)
                }else{
                    p_a_table= "";
                }
                
            }else{
               p_a_table ="";
            }

            $("<tr/>", {
                html: "<td>"+p_a_table+"</td><td>"+dd+"</td><td>"+oo+"</td><td>"+cant+"</td><td>"+(20-j)+"</td>"
            }).prependTo("#datatable tbody");
            j++;            
        }
        
        for( i = 0; i < parseInt(p_ast); i++){
            q_ast_serires[i] = [count_x-1,i];
        }
         q_ast_serires[i] = [count_x-1,p_ast];
        
        console.log(p_ast_serires);
        build_graph(dd_series, oo_series,p_ast_serires,q_ast_serires);

    }

    function getFloat(n) {
        var num = parseFloat(n);
        if (!isNaN(num)) {
            return num;
        }
        return null;
    }  
    
    function validate_parameter(a,b,c,d){
        s = true;
        if( c < 0 ){
            $("#parameter_c").addClass("error").tooltip({placement: 'right', title: 'Parámetro c debe ser mayor o igual que cero', trigger: 'manual', }).tooltip('show');
            s = false;
        }
        
        if( a <= c   ){
            $("#parameter_a").addClass("error").tooltip({placement: 'right', title: 'Parámetro a debe ser mayor que parametro c', trigger: 'manual', }).tooltip('show');
            s = false;
        }
        
        if( b <= 0 ){
            $("#parameter_b").addClass("error").tooltip({placement: 'right', title: 'Parámetro b debe ser mayor que cero', trigger: 'manual', }).tooltip('show');
            s = false;
        }
        
        if( d <= 0 ){
            $("#parameter_d").addClass("error").tooltip({placement: 'right', title: 'Parámetro d debe ser mayor que cero', trigger: 'manual', }).tooltip('show');
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

    function build_graph(dd_data, oo_data,p_ast_serires,q_ast_serires) {
        
        var DD_OBJ = {
            name: 'D',
            type: 'areaspline',
            data: dd_data,
        };
        var OO_OBJ = {
            name: 'S',
            type: 'areaspline',
            data: oo_data
        };
        var PAS_OBJ = {
            name: "P*",
            type: 'areaspline',
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            data: p_ast_serires
        };
        var QAS_OBJ = {
            name: "Q*",
            type: 'areaspline',
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            data: q_ast_serires
        };
        
        if (graph.series.length) {
            graph.series[0].remove(false);
            graph.series[0].remove(false);
            graph.series[0].remove(false);
            graph.series[0].remove(false);
        }
        graph.addSeries(DD_OBJ);
        graph.addSeries(OO_OBJ);
        graph.addSeries(PAS_OBJ);
        graph.addSeries(QAS_OBJ);
        
    }

    /*$.get("lib/pdfjs/web/viewer.html?file=doc/Simulator_01_(Competencia_y_Monopolio).pdf", function(data){
        $("#pdf_viewer_load").html(data);
    })*/

});