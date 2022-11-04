"use strict";
var ATM = (function () {
    function ATM() {
        this.balance = 0;
        this.deposito = 0;
        this.retiro = 0;
        this.url_base = "localhost/ATM/default";
    }
    ATM.prototype.obtenerBalance = function () {
        return this.balance;
    };
    ATM.prototype.montoRetiro = function (retiro) {
        if (retiro === void 0) { retiro = 0; }
        if (retiro > 0) {
            this.retiro -= Number(retiro);
        }
        this.verEstado();
    };
    ATM.prototype.montoDeposito = function (deposito) {
        if (deposito === void 0) { deposito = 0; }
        if (deposito > 0) {
            this.deposito += Number(deposito);
        }
        this.verEstado();
    };
    ATM.prototype.verEstado = function () { };

    ATM.prototype.crearNombreUsuario = function () {
        var rString = randomString(4, '0123456789')+randomString(2, '9876543210');
        return rString.toUpperCase();
    }
    return ATM;

    
}());

(function () {
    var app = new ATM();

    $('#crearNombreUsuario').click(function(event) {
        event.preventDefault();
       let nombre = app.crearNombreUsuario();
       $('#nombreUsuario').val(nombre);
    })

    $('#btnRegistrarme').click(function(event) {
        event.preventDefault();
        let nombre = $('#nombreUsuario').val();
        let clave = $('#clave').val();
        add({id:nombre,nombre:nombre, clave: clave ,balance: 0 , transacciones : [] });
        setTimeout(()=>{window.location.href = app.url_base+'/login.html';}, 4000);
    })
})();