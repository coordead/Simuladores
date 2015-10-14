/* 
 * Author: Santiago Mendoza Ramirez
 * Email: contacto@santiagomendoza.org
 */

//var $ = require('jquery');
//window.jQuery = $;

var Model = {
    a: 10,
    b: 1,
    F1: 0,
    F2: 0,
    C1: 3,
    C2: 2
};

var Controller = {
    update_params: function (a, b, F1, F2, C1, C2) {
        Model.a = a;
        Model.b = b;
        Model.F1 = F1;
        Model.F2 = F2;
        Model.C1 = C1;
        Model.C2 = C2;
    },
    param_validate: function (a, b, F1, F2, C1, C2) {
//        if (b < 0 || b > 1) {
//            Views.parameter_b.addClass("error").tooltip({placement: 'right', title: 'Parámetro b debe estar entre 0 y 1', trigger: 'manual', }).tooltip('show');
//            return false;
//        }
//        if (c < 0 || c > 1) {
//            Views.parameter_c.addClass("error").tooltip({placement: 'right', title: 'Parámetro c debe estar entre 0 y 1', trigger: 'manual', }).tooltip('show');
//            return false;
//        }
        return true;
    }
};

var Views = {
    parameter_a: $("#parameter_a"),
    parameter_b: $("#parameter_b"),
    parameter_F1: $("#parameter_F1"),
    parameter_F2: $("#parameter_F2"),
    parameter_C1: $("#parameter_C1"),
    parameter_C2: $("#parameter_C2"),
    ele_Q: $("#ele_Q"),
    ele_p: $('#ele_p'),
    ele_q1: $("#ele_q1"),
    ele_q1_part: $("#ele_q1_part"),
    ele_q2: $("#ele_q2"),
    ele_q2_part: $("#ele_q2_part"),
    update_params: function (a, b, F1, F2, C1, C2) {
        a = parseFloat(a);
        b = parseFloat(b);
        F1 = parseFloat(F1);
        F2 = parseFloat(F2);
        C1 = parseFloat(C1);
        C2 = parseFloat(C2);

        if (Controller.param_validate(a, b, F1, F2, C1, C2)) {
            Controller.update_params(a, b, F1, F2, C1, C2);
            Views.parameter_a.val(a);
            Views.parameter_b.val(b);
            Views.parameter_F1.val(F1);
            Views.parameter_F2.val(F2);
            Views.parameter_C1.val(C1);
            Views.parameter_C2.val(C2);
            Views.update_values();
        } else {

        }
    },
    param_costos_crecientes: $("#param_costos_crecientes"),
    parameters_changed: function () {
        Views.parameter_a.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F1.val(), Views.parameter_F2.val(), Views.parameter_C1.val(), Views.parameter_C2.val());
        });
        Views.parameter_b.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F1.val(), Views.parameter_F2.val(), Views.parameter_C1.val(), Views.parameter_C2.val());
        });
        Views.parameter_F1.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F1.val(), Views.parameter_F2.val(), Views.parameter_C1.val(), Views.parameter_C2.val());
        });
        Views.parameter_F2.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F1.val(), Views.parameter_F2.val(), Views.parameter_C1.val(), Views.parameter_C2.val());
        });
        Views.parameter_C1.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F1.val(), Views.parameter_F2.val(), Views.parameter_C1.val(), Views.parameter_C2.val());
        });
        Views.parameter_C2.change(function () {
            Views.update_params(Views.parameter_a.val(), Views.parameter_b.val(), Views.parameter_F1.val(), Views.parameter_F2.val(), Views.parameter_C1.val(), Views.parameter_C2.val());
        });
    },
    update_values: function () {
        /* Costos Crecientes */
        $("#ele_Q").val(formulas.ele_Q(Model.a, Model.b, Model.C1, Model.C2).toFixed(3));
        /*Siguiente fila */
        $("#ele_q2").val(formulas.ele_q2(Model.a, Model.b, Model.C1, Model.C2).toFixed(3));
        $("#ele_q2_part").val(formulas.ele_q2_part(Model.a, Model.b, Model.C1, Model.C2).toFixed(2));
        /*Siguiente fila */
        $("#ele_q1").val(formulas.ele_q1(Model.a, Model.b, Model.C1, Model.C2).toFixed(3));
        $("#ele_q1_part").val(formulas.ele_q1_part(Model.a, Model.b, Model.C1, Model.C2).toFixed(2));
        /*Siguiente fila */
        $("#ele_p").val(formulas.ele_p(Model.a, Model.b, Model.C1, Model.C2).toFixed(3));
        console.log(Views.ele_q1.val());
        build_graph(
                [
                    parseFloat(Views.ele_Q.val()),
                    parseFloat(Views.ele_q2.val()),
                    parseFloat(Views.ele_q1.val()),
                    parseFloat(Views.ele_p.val()),
                ],
                [
                    parseFloat(0),
                    parseFloat(Views.ele_q2_part.val()),
                    parseFloat(Views.ele_q1_part.val()),
                    parseFloat(0),
                ]);
    }
};

var formulas = {
    ele_Q: function (a, b, C1, C2) {
        var result = formulas.ele_q1(a, b, C1, C2) + formulas.ele_q2(a, b, C1, C2);
        return result;
    },
    ele_q2: function (a, b, C1, C2) {
        var result = (a / (3 * b)) + ((C1 - 2 * C2) / (3 * b))
        return result;
    },
    ele_q2_part: function (a, b, C1, C2) {
        var result = formulas.ele_q2(a, b, C1, C2) / formulas.ele_Q(a, b, C1, C2);
        return result * 100;
    },
    ele_q1: function (a, b, C1, C2) {
        var result = (a / (3 * b)) + ((C2 - 2 * C1) / (3 * b))
        return result;
    },
    ele_q1_part: function (a, b, C1, C2) {
        var result = 1 - (formulas.ele_q2(a, b, C1, C2) / formulas.ele_Q(a, b, C1, C2));
        return result * 100;
    },
    ele_p: function (a, b, C1, C2) {
        var result = a - b * formulas.ele_Q(a, b, C1, C2);
        return result;
    }
};

$(document).ready(function () {
    Views.update_params(10, 1, 4, 3, 0.75, 0.5);
    Views.parameters_changed();
    Views.update_values();
});