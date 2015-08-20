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
    n: 14.57439666
};

var Controller = {
    updated_a: function(a){
        Model.a = a;
        Views.update_values();
    },
    updated_b: function(b){
        Model.b = b;
        Views.update_values();
    },
    updated_F: function(f){
        Model.f = f;
        Views.update_values();
    },
    updated_c: function(c){
        Model.c = c;
        Views.update_values();
    },
    updated_n: function(n){
        Model.n = n;
        Views.update_values();
    }
};

var Views = {
    parameter_a :$("#parameter_a"),
    parameter_b: $("#parameter_b"),
    parameter_F: $("#parameter_F"),
    parameter_c: $("#parameter_c"),
    parameter_n: $("#parameter_n"),
    QMonopolio: $("#ele_Q_comp"),
    QCartel: $("#ele_Q_cart"),
    QCournot: $("#ele_Q_mult"),
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
        $("#ele_Q_mon").val(formulas.Qmonopolio(Model.a, Model.b, Model.c));
        $("#ele_Q_cart").val(formulas.Qcartel(Model.a, Model.b, Model.c));
        $("#ele_Q_cour").val(formulas.Qcournot(Model.a, Model.b, Model.c));
        $("#ele_Q_courN").val(formulas.QcournotN(Model.a, Model.b, Model.c, Model.n));
        $("#ele_Q_comp").val(formulas.Qcompetencia(Model.a, Model.b, Model.c));
        /* Siguiente fila */
        $("#ele_q_mon").val("0"); // No tiene valor
        $("#ele_q_cart").val(formulas.qcartel(Model.a, Model.b, Model.c));
        $("#ele_q_cour").val(formulas.qcournot(Model.a, Model.b, Model.c));
        $("#ele_q_courN").val(formulas.qcournotN(Model.a, Model.b, Model.c, Model.n));
        $("#ele_q_comp").val(formulas.qcompetencia(Model.a, Model.b, Model.c, Model.n));
        /* Siguiente fila */
        $("#ele_p_mon").val(formulas.pmonopolio(Model.a, Model.c)); // No tiene valor
        $("#ele_p_cart").val(formulas.pcartel(Model.a, Model.c));
        $("#ele_p_cour").val(formulas.pcournot(Model.a, Model.c));
        $("#ele_p_courN").val(formulas.pcournotN(Model.a, Model.c, Model.n));
        $("#ele_p_comp").val(formulas.pcompetencia(Model.c));
        /* Siguiente fila */
        $("#ele_N_mon").val(formulas.benmonopolio(Model.a, Model.b, Model.c, Model.f, Model.n)); // No tiene valor
        $("#ele_N_cart").val(formulas.bencartel(Model.a, Model.b, Model.c, Model.f));
        $("#ele_N_cour").val(formulas.bencournot(Model.a, Model.b, Model.c, Model.f));
        $("#ele_N_courN").val(formulas.bencournotN(Model.a, Model.b, Model.c, Model.f, Model.n));
        $("#ele_N_comp").val(formulas.bencompetencia(Model.a, Model.b, Model.c, Model.f, Model.n));
    }
};

var formulas = {
    Qmonopolio: function(a,b,c){
        var result = (a-c)/(2*b);
        return Math.round(result*100)/100;
    },
    Qcartel: function(a,b,c){
        var result = formulas.Qmonopolio(a,b,c);
        return Math.round(result*100)/100;
    },
    Qcournot: function(a,b,c){
        var result = (2.00*(a-c))/(3.00*b);
        return Math.round(result*100)/100;
    },
    QcournotN: function(a,b,c,n){
        var result = ((a-c)/b)*(n/(n+1));
        return Math.round(result*100)/100;
    },
    Qcompetencia: function(a,b,c){
        var result = (a-c)/b;
        return Math.round(result*100)/100;
    },
    qcartel: function(a,b,c){
        var result = formulas.Qcartel(a,b,c)/2;
        return Math.round(result*100)/100;
    },
    qcournot: function(a,b,c){
        var result = (a-c)/(3*b);
        return Math.round(result*100)/100;
    },
    qcournotN: function(a,b,c,n){
        var result = (a-c)/((n+1)*b);
        return Math.round(result*100)/100;
    },
    qcompetencia: function(a,b,c,n){
        var result = formulas.Qcompetencia(a,b,c)/n;
        return Math.round(result*100)/100;
    },
    pmonopolio: function(a,c){
        var result = (a+c)/2;
        return Math.round(result*100)/100;
    },
    pcartel: function(a,c){
        var result = formulas.pmonopolio(a,c);
        return Math.round(result*100)/100;
    },
    pcournot: function(a,c){
        var result = (a+2*c)/3;
        return Math.round(result*100)/100;
    },
    pcournotN: function(a,c,n){
        var result = (a+n*c)/(n+1);
        return Math.round(result*100)/100;
    },
    pcompetencia: function(c){
        var result = c;
        return Math.round(result*100)/100;
    },
    benmonopolio: function(a,b,c,f){
        var QMonopolio = formulas.Qmonopolio(a,b,c);
        var result = b * Math.pow(QMonopolio,2) -f;
        return Math.round(result*100)/100;
    },
    bencartel: function(a,b,c,f){
        var qCartel = formulas.qcartel(a,b,c);
        var result = 2*b*Math.pow(qCartel,2)-f;
        return Math.round(result*100)/100;
    },
    bencournot: function(a,b,c,f){
        var qC = formulas.qcournot(a,b,c);
        var result = b*Math.pow(qC,2)-f;
        return Math.round(result*100)/100;
    },
    bencournotN: function(a,b,c,f,n){
        var PCN = formulas.pcournotN(a,c,n);
        var QCN = formulas.qcournotN(a,b,c,n);
        var result = PCN*QCN-(f+c*QCN);
        return Math.round(result*100)/100;
    },
    bencompetencia: function(a,b,c,f,n){
        var pCompetencia = formulas.pcompetencia(c);
        var qCompetencia = formulas.qcompetencia(a,b,c,n);
        var result = pCompetencia*qCompetencia-f-c*qCompetencia;
        console.log(result);
        return Math.round(result*100)/100;
    }
};

function initialize(){
    $("#parameter_a").val(Model.a);
    $("#parameter_b").val(Model.b);
    $("#parameter_F").val(Model.f);
    $("#parameter_c").val(Model.c);
    $("#parameter_n").val(Model.n);
    Views.parameters_changed();
    Views.update_values();
}
