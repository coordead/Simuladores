/* 
 * Author: Santiago Mendoza Ramirez
 * Email: contacto@santiagomendoza.org
 */

//var $ = require('jquery');
//window.jQuery = $;

var Model = {
    a: 500,
    b: 1,
    f: 50,
    c: 0.5,
    n: 14.57439666,
    qcompetencia: 0,
    qcartel: 0,
    qcournot: 0
};

var Controller = {
    updated_a: function(a){
        Model.a = parseFloat(a);
        Views.update_values();
    },
    updated_b: function(b){
        Model.b = parseFloat(b);
        Views.update_values();
    },
    updated_F: function(f){
        Model.f = parseFloat(f);
        Views.update_values();
    },
    updated_c: function(c){
        Model.c = parseFloat(c);
        Views.update_values();
    },
    updated_n: function(n){
        Model.n = parseFloat(n);
        Views.update_values();
    },
    initial_params: function(a,b,c,f,n){
        Model.a = a;
        Model.b = b;
        Model.c = c;
        Model.f = f;
        Model.n = n;
    }
};

var Views = {
    parameter_a :$("#parameter_a"),
    parameter_b: $("#parameter_b"),
    parameter_F: $("#parameter_F"),
    parameter_c: $("#parameter_c"),
    parameter_n: $("#parameter_n"),
    initial_params: function(a,b,f,c,n){
        Controller.initial_params(a,b,c,f,n);
        Views.parameter_a.val(a);
        Views.parameter_b.val(b);
        Views.parameter_c.val(c);
        Views.parameter_F.val(f);
        Views.parameter_n.val(n);
        Views.update_values();
    },
    param_costos_constantes: $("#param_costos_constantes"),
    param_costos_crecientes: $("#param_costos_crecientes"),
    parameters_changed: function(){
        Views.parameter_a.change(function(){
            Controller.updated_a(Views.parameter_a.val());
        });
        Views.parameter_b.change(function(){
            Controller.updated_b(Views.parameter_b.val());
        });
        Views.parameter_F.change(function(){
            Controller.updated_F(Views.parameter_F.val());
        });
        Views.parameter_c.change(function(){
            Controller.updated_c(Views.parameter_c.val());
        });
        Views.parameter_n.change(function(){
            Controller.updated_n(Views.parameter_n.val());
        });
    },
    update_values: function(){       
        /* Costos Crecientes */
        $("#ele_QC_comp").val(formulascrec.Qcompetencia(Model.a, Model.b, Model.c));
        $("#ele_QC_cart").val(formulascrec.Qcartel(Model.a, Model.b, Model.c));
        $("#ele_QC_cour").val(formulascrec.Qcournot(Model.a, Model.b, Model.c));
        /*Siguiente fila */
        $("#ele_qC_comp").val();
        $("#ele_qC_cart").val(formulascrec.qcartel(Model.a, Model.b, Model.c));
        $("#ele_qC_cour").val(formulascrec.qcournot(Model.a, Model.b, Model.c));
        /*Siguiente fila */
        $("#ele_pC_comp").val(formulascrec.pcompetencia(Model.a, Model.b, Model.c));
        $("#ele_pC_cart").val(formulascrec.pcartel(Model.a, Model.b, Model.c));
        $("#ele_pC_cour").val(formulascrec.pcournot(Model.a, Model.b, Model.c));
        /*Siguiente fila */
        $("#ele_benC_comp").val(formulascrec.bencompetencia(Model.a, Model.b, Model.c, Model.f));
        $("#ele_benC_cart").val(formulascrec.bencartel(Model.a, Model.b, Model.c, Model.f));
        $("#ele_benC_cour").val(formulascrec.bencournot(Model.a, Model.b, Model.c, Model.f));
    }
};

var formulascrec = {
    Qcompetencia: function(a,b,c){
        var result = a/(2*c+2*b);
        return result;
    },
    Qcartel: function(a,b,c){
        var result = a/(2*b+c);
        return result;
    },
    Qcournot: function(a,b,c){
        var result = (2*a*b+4*a*c)/(3*Math.pow(b,2)+8*b*c+4*Math.pow(c,2));
        return result;
    },
    qcartel: function(a,b,c){
        var result = a/(4*b+2*c);
        return result;
    },
    qcournot: function(a,b,c){
        var result = (a*b+2*a*c)/(3*Math.pow(b,2)+8*b*c+4*Math.pow(c,2));
        return result;
    },
    pcompetencia: function(a,b,c){
        var result = (2*a*c+a*b)/(2*c+2*b);
        return result;
    },
    pcartel: function(a,b,c){
        var result = (a*b+a*c)/(2*b+c);
        return result;
    },
    pcournot: function(a,b,c){
        var result = (a*Math.pow(b,2)+4*a*b*c+4*a*Math.pow(c,2))/(3*Math.pow(b,2)+8*b*c+4*Math.pow(c,2));
        return result;
    },
    bencompetencia: function(a,b,c,f){
        var result = (Math.pow(a,2)/(4*(c+b)));
        console.log(((c+b)));
        result = result - f;
        return result;
    },
    bencartel: function(a,b,c,f){
        var result = (2*Math.pow(a,2)*b+Math.pow(a,2)*c)/(Math.pow((4*b+2*c),2))-f;
        return result;
    },
    bencournot: function(a,b,c,f){
        var result = (Math.pow(a,2)*Math.pow(b,3)+5*Math.pow(a,2)*Math.pow(b,2)*c+8*Math.pow(a,2)*b*Math.pow(c,2)+4*Math.pow(a,2)*Math.pow(c,3))/(Math.pow((3*Math.pow(b,2)+8*b*c+4*Math.pow(c,2)),2))-f;
        return result;
    }
    
};

$(document).ready(function(){
    Views.initial_params(500,1,50,0.5,14.57439666);
    Views.parameters_changed();
    Views.update_values();
});