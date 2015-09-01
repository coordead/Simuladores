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
    update_params: function (a, b, f, c, n) {
        Model.a = a;
        Model.b = b;
        Model.c = c;
        Model.f = f;
        Model.n = n;
    },
    param_validate: function (a, b, f, c, n) {
        if (b < 0 || b > 1) {
            Views.parameter_b.addClass("error").tooltip({placement: 'right', title: 'Parámetro b debe estar entre 0 y 1', trigger: 'manual', }).tooltip('show');
            return false;
        }
        if (c < 0 || c > 1) {
            Views.parameter_c.addClass("error").tooltip({placement: 'right', title: 'Parámetro c debe estar entre 0 y 1', trigger: 'manual', }).tooltip('show');
            return false;
        }
        return true;
    }
};

var Views = {
    parameter_a: $("#parameter_a"),
    parameter_b: $("#parameter_b"),
    parameter_F: $("#parameter_F"),
    parameter_c: $("#parameter_c"),
    parameter_n: $("#parameter_n"),
    pmon: $('#ele_p_mon'),
    pcart: $('#ele_p_cart'),
    pcour: $('#ele_p_cour'),
    pcourn: $('#ele_p_courN'),
    pcomp: $('#ele_p_comp'),
    Qmon: $('#ele_Q_mon'),
    Qcart: $('#ele_Q_cart'),
    Qcour: $('#ele_Q_cour'),
    Qcourn: $('#ele_Q_courN'),
    Qcomp: $('#ele_Q_comp'),
    update_params: function (a, b, f, c, n) {
        a = parseFloat(a);
        b = parseFloat(b);
        f = parseFloat(f);
        c = parseFloat(c);
        n = parseFloat(n);

        if (Controller.param_validate(a, b, f, c, n)) {
            if (Views.parameter_b.data('bs.tooltip')) {
                Views.parameter_b.tooltip('toggle');
                Views.parameter_b.removeClass('error');
            }
            if (Views.parameter_c.data('bs.tooltip')) {
                Views.parameter_c.tooltip('toggle');
                Views.parameter_c.removeClass('error');
            }
            Controller.update_params(a, b, f, c, n);
            Views.parameter_a.val(a);
            Views.parameter_b.val(b);
            Views.parameter_c.val(c);
            Views.parameter_F.val(f);
            Views.parameter_n.val(n);
            Views.update_values();
        } else {

        }
    },
    param_costos_constantes: $("#param_costos_constantes"),
    parameters_changed: function () {
        Views.parameter_a.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val(), Views.parameter_n.val());
        });
        Views.parameter_b.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val(), Views.parameter_n.val());
        });
        Views.parameter_F.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val(), Views.parameter_n.val());
        });
        Views.parameter_c.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val(), Views.parameter_n.val());
        });
        Views.parameter_n.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val(), Views.parameter_n.val());
        });
    },
    update_values: function () {
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

        build_graph([parseFloat(Views.pmon.val()), parseFloat(Views.pcart.val()), parseFloat(Views.pcour.val()), parseFloat(Views.pcourn.val()), parseFloat(Views.pcomp.val())], [parseFloat(Views.Qmon.val()), parseFloat(Views.Qcart.val()), parseFloat(Views.Qcour.val()), parseFloat(Views.Qcourn.val()), parseFloat(Views.Qcomp.val())]);
    }
};

var formulasconst = {
    Qmonopolio: function (a, b, c) {
        var result = (a - c) / (2 * b);
        return Math.round(result * 100) / 100;
    },
    Qcartel: function (a, b, c) {
        var result = formulasconst.Qmonopolio(a, b, c);
        return Math.round(result * 100) / 100;
    },
    Qcournot: function (a, b, c) {
        var result = (2.00 * (a - c)) / (3.00 * b);
        return Math.round(result * 100) / 100;
    },
    QcournotN: function (a, b, c, n) {
        var result = ((a - c) / b) * (n / (n + 1));
        return Math.round(result * 100) / 100;
    },
    Qcompetencia: function (a, b, c) {
        var result = (a - c) / b;
        return Math.round(result * 100) / 100;
    },
    qcartel: function (a, b, c) {
        var result = formulasconst.Qcartel(a, b, c) / 2;
        return Math.round(result * 100) / 100;
    },
    qcournot: function (a, b, c) {
        var result = (a - c) / (3 * b);
        return Math.round(result * 100) / 100;
    },
    qcournotN: function (a, b, c, n) {
        var result = (a - c) / ((n + 1) * b);
        return Math.round(result * 100) / 100;
    },
    qcompetencia: function (a, b, c, n) {
        var result = formulasconst.Qcompetencia(a, b, c) / n;
        return Math.round(result * 100) / 100;
    },
    pmonopolio: function (a, c) {
        var result = (a + c) / 2;
        return Math.round(result * 100) / 100;
    },
    pcartel: function (a, c) {
        var result = formulasconst.pmonopolio(a, c);
        return Math.round(result * 100) / 100;
    },
    pcournot: function (a, c) {
        var result = (a + 2 * c) / 3;
        return Math.round(result * 100) / 100;
    },
    pcournotN: function (a, c, n) {
        var result = (a + n * c) / (n + 1);
        return Math.round(result * 100) / 100;
    },
    pcompetencia: function (c) {
        var result = c;
        return Math.round(result * 100) / 100;
    },
    benmonopolio: function (a, b, c, f) {
        var QMonopolio = formulasconst.Qmonopolio(a, b, c);
        var result = b * Math.pow(QMonopolio, 2) - f;
        return Math.round(result * 100) / 100;
    },
    bencartel: function (a, b, c, f) {
        var qCartel = formulasconst.qcartel(a, b, c);
        var result = 2 * b * Math.pow(qCartel, 2) - f;
        return Math.round(result * 100) / 100;
    },
    bencournot: function (a, b, c, f) {
        var qC = formulasconst.qcournot(a, b, c);
        var result = b * Math.pow(qC, 2) - f;
        return Math.round(result * 100) / 100;
    },
    bencournotN: function (a, b, c, f, n) {
        var PCN = formulasconst.pcournotN(a, c, n);
        var QCN = formulasconst.qcournotN(a, b, c, n);
        var result = PCN * QCN - (f + c * QCN);
        return Math.round(result * 100) / 100;
    },
    bencompetencia: function (a, b, c, f, n) {
        var pCompetencia = formulasconst.pcompetencia(c);
        var qCompetencia = formulasconst.qcompetencia(a, b, c, n);
        var result = pCompetencia * qCompetencia - f - c * qCompetencia;
        return Math.round(result * 100) / 100;
    }
};

$(document).ready(function () {
    Views.update_params(500, 1, 50, 0.5, 14.57439666);
    Views.parameters_changed();
    Views.update_values();
});