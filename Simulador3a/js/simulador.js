/* 
 * Author: Santiago Mendoza Ramirez
 * Email: contacto@santiagomendoza.org
 */

//var $ = require('jquery');
//window.jQuery = $;

var Model = {
    a: 150,
    b: 0.5,
    f: 12,
    c: 0.5
};

var Controller = {
    update_params: function (a, b, f, c) {
        Model.a = a;
        Model.b = b;
        Model.c = c;
        Model.f = f;
    },
    param_validate: function (a, b, f, c) {
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
    pcart: $('#ele_p_cart'),
    pcour: $('#ele_p_cour'),
    pcomp: $('#ele_p_comp'),
    Qcart: $('#ele_Q_cart'),
    Qcour: $('#ele_Q_cour'),
    Qcomp: $('#ele_Q_comp'),
    update_params: function (a, b, f, c) {
        a = parseFloat(a);
        b = parseFloat(b);
        f = parseFloat(f);
        c = parseFloat(c);

        if (Controller.param_validate(a, b, f, c)) {
            if (Views.parameter_b.data('bs.tooltip')) {
                Views.parameter_b.tooltip('hide');
                Views.parameter_b.removeClass('error');
            }
            if (Views.parameter_c.data('bs.tooltip')) {
                Views.parameter_c.tooltip('hide');
                Views.parameter_c.removeClass('error');
            }
            Controller.update_params(a, b, f, c);
            Views.parameter_a.val(a);
            Views.parameter_b.val(b);
            Views.parameter_c.val(c);
            Views.parameter_F.val(f);
            Views.update_values();
        } else {

        }
    },
    param_costos_crecientes: $("#param_costos_crecientes"),
    parameters_changed: function () {
        Views.parameter_a.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val());
        });
        Views.parameter_b.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val());
        });
        Views.parameter_F.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val());
        });
        Views.parameter_c.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F.val(), Views.parameter_c.val());
        });
    },
    update_values: function () {
        /* Costos Crecientes */
        $("#ele_Q_comp").val(formulascrec.Qcompetencia(Model.a, Model.b, Model.c).toFixed(2));
        $("#ele_Q_cart").val(formulascrec.Qcartel(Model.a, Model.b, Model.c).toFixed(2));
        $("#ele_Q_cour").val(formulascrec.Qcournot(Model.a, Model.b, Model.c).toFixed(2));
        /*Siguiente fila */
        $("#ele_q_comp").val();
        $("#ele_q_cart").val(formulascrec.qcartel(Model.a, Model.b, Model.c).toFixed(2));
        $("#ele_q_cour").val(formulascrec.qcournot(Model.a, Model.b, Model.c).toFixed(2));
        /*Siguiente fila */
        $("#ele_p_comp").val(formulascrec.pcompetencia(Model.a, Model.b, Model.c).toFixed(2));
        $("#ele_p_cart").val(formulascrec.pcartel(Model.a, Model.b, Model.c).toFixed(2));
        $("#ele_p_cour").val(formulascrec.pcournot(Model.a, Model.b, Model.c).toFixed(2));
        /*Siguiente fila */
        $("#ele_ben_comp").val(formulascrec.bencompetencia(Model.a, Model.b, Model.c, Model.f).toFixed(2));
        $("#ele_ben_cart").val(formulascrec.bencartel(Model.a, Model.b, Model.c, Model.f).toFixed(2));
        $("#ele_ben_cour").val(formulascrec.bencournot(Model.a, Model.b, Model.c, Model.f).toFixed(2));

        build_graph([parseFloat(Views.pcomp.val()), parseFloat(Views.pcart.val()), parseFloat(Views.pcour.val())], [parseFloat(Views.Qcomp.val()), parseFloat(Views.Qcart.val()), parseFloat(Views.Qcour.val())]);
    }
};

var formulascrec = {
    Qcompetencia: function (a, b, c) {
        var result = a / (2 * c + 2 * b);
        return result;
    },
    Qcartel: function (a, b, c) {
        var result = a / (2 * b + c);
        return result;
    },
    Qcournot: function (a, b, c) {
        var result = (2 * a * b + 4 * a * c) / (3 * Math.pow(b, 2) + 8 * b * c + 4 * Math.pow(c, 2));
        return result;
    },
    qcartel: function (a, b, c) {
        var result = a / (4 * b + 2 * c);
        return result;
    },
    qcournot: function (a, b, c) {
        var result = (a * b + 2 * a * c) / (3 * Math.pow(b, 2) + 8 * b * c + 4 * Math.pow(c, 2));
        return result;
    },
    pcompetencia: function (a, b, c) {
        var result = (2 * a * c + a * b) / (2 * c + 2 * b);
        return result;
    },
    pcartel: function (a, b, c) {
        var result = (a * b + a * c) / (2 * b + c);
        return result;
    },
    pcournot: function (a, b, c) {
        var result = (a * Math.pow(b, 2) + 4 * a * b * c + 4 * a * Math.pow(c, 2)) / (3 * Math.pow(b, 2) + 8 * b * c + 4 * Math.pow(c, 2));
        return result;
    },
    bencompetencia: function (a, b, c, f) {
        var result = (Math.pow(a, 2) / (4 * (c + b)));
        console.log(((c + b)));
        result = result - f;
        return result;
    },
    bencartel: function (a, b, c, f) {
        var result = (2 * Math.pow(a, 2) * b + Math.pow(a, 2) * c) / (Math.pow((4 * b + 2 * c), 2)) - f;
        return result;
    },
    bencournot: function (a, b, c, f) {
        var result = (Math.pow(a, 2) * Math.pow(b, 3) + 5 * Math.pow(a, 2) * Math.pow(b, 2) * c + 8 * Math.pow(a, 2) * b * Math.pow(c, 2) + 4 * Math.pow(a, 2) * Math.pow(c, 3)) / (Math.pow((3 * Math.pow(b, 2) + 8 * b * c + 4 * Math.pow(c, 2)), 2)) - f;
        return result;
    }

};

$(document).ready(function () {
    Views.update_params(150, 0.5, 12, 0.5);
    Views.parameters_changed();
    Views.update_values();
});