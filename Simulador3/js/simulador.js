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
        /* Costos Constantes*/
        $("#ele_Q_mon").val(formulasconst.Qmonopolio(Model.a, Model.b, Model.c));
        $("#ele_Q_cart").val(formulasconst.Qcartel(Model.a, Model.b, Model.c));
        $("#ele_Q_cour").val(formulasconst.Qcournot(Model.a, Model.b, Model.c));
        $("#ele_Q_courN").val(formulasconst.QcournotN(Model.a, Model.b, Model.c, Model.n));
        $("#ele_Q_comp").val(formulasconst.Qcompetencia(Model.a, Model.b, Model.c));
        /* Siguiente fila */
        $("#ele_q_mon").val(); // No tiene valor
        $("#ele_q_cart").val(formulasconst.qcartel(Model.a, Model.b, Model.c));
        $("#ele_q_cour").val(formulasconst.qcournot(Model.a, Model.b, Model.c));
        $("#ele_q_courN").val(formulasconst.qcournotN(Model.a, Model.b, Model.c, Model.n));
        $("#ele_q_comp").val(formulasconst.qcompetencia(Model.a, Model.b, Model.c, Model.n));
        /* Siguiente fila */
        $("#ele_p_mon").val(formulasconst.pmonopolio(Model.a, Model.c)); // No tiene valor
        $("#ele_p_cart").val(formulasconst.pcartel(Model.a, Model.c));
        $("#ele_p_cour").val(formulasconst.pcournot(Model.a, Model.c));
        $("#ele_p_courN").val(formulasconst.pcournotN(Model.a, Model.c, Model.n));
        $("#ele_p_comp").val(formulasconst.pcompetencia(Model.c));
        /* Siguiente fila */
        $("#ele_N_mon").val(formulasconst.benmonopolio(Model.a, Model.b, Model.c, Model.f, Model.n)); // No tiene valor
        $("#ele_N_cart").val(formulasconst.bencartel(Model.a, Model.b, Model.c, Model.f));
        $("#ele_N_cour").val(formulasconst.bencournot(Model.a, Model.b, Model.c, Model.f));
        $("#ele_N_courN").val(formulasconst.bencournotN(Model.a, Model.b, Model.c, Model.f, Model.n));
        $("#ele_N_comp").val(formulasconst.bencompetencia(Model.a, Model.b, Model.c, Model.f, Model.n));
        
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

var formulasconst = {
    Qmonopolio: function(a,b,c){
        var result = (a-c)/(2*b);
        return Math.round(result*100)/100;
    },
    Qcartel: function(a,b,c){
        var result = formulasconst.Qmonopolio(a,b,c);
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
        var result = formulasconst.Qcartel(a,b,c)/2;
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
        var result = formulasconst.Qcompetencia(a,b,c)/n;
        return Math.round(result*100)/100;
    },
    pmonopolio: function(a,c){
        var result = (a+c)/2;
        return Math.round(result*100)/100;
    },
    pcartel: function(a,c){
        var result = formulasconst.pmonopolio(a,c);
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
        var QMonopolio = formulasconst.Qmonopolio(a,b,c);
        var result = b * Math.pow(QMonopolio,2) -f;
        return Math.round(result*100)/100;
    },
    bencartel: function(a,b,c,f){
        var qCartel = formulasconst.qcartel(a,b,c);
        var result = 2*b*Math.pow(qCartel,2)-f;
        return Math.round(result*100)/100;
    },
    bencournot: function(a,b,c,f){
        var qC = formulasconst.qcournot(a,b,c);
        var result = b*Math.pow(qC,2)-f;
        return Math.round(result*100)/100;
    },
    bencournotN: function(a,b,c,f,n){
        var PCN = formulasconst.pcournotN(a,c,n);
        var QCN = formulasconst.qcournotN(a,b,c,n);
        var result = PCN*QCN-(f+c*QCN);
        return Math.round(result*100)/100;
    },
    bencompetencia: function(a,b,c,f,n){
        var pCompetencia = formulasconst.pcompetencia(c);
        var qCompetencia = formulasconst.qcompetencia(a,b,c,n);
        var result = pCompetencia*qCompetencia-f-c*qCompetencia;
        return Math.round(result*100)/100;
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

function initialize(){
    $("#parameter_a").val(Model.a);
    $("#parameter_b").val(Model.b);
    $("#parameter_F").val(Model.f);
    $("#parameter_c").val(Model.c);
    $("#parameter_n").val(Model.n);
    Views.parameters_changed();
    Views.update_values();
}
