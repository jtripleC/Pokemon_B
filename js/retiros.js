function monto(cantidad=0) {
    $('#monto_retiro').val(null);
    $('#monto_retiro').val(cantidad);
    return cantidad;
}

$(function() {
    var app = new ATM();
    app.balance = 120;
    let monto = app.obtenerBalance();
    $('#montoTotal').html(monto);
});