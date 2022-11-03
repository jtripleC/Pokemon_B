
Highcharts.chart('container', {
    chart: {
      type: 'variablepie'
    },
    title: {
      text: 'últimas Transacciones Realizadas Recientemente'
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        'Area (square km): <b>{point.y}</b><br/>' +
        'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    series: [{
      minPointSize: 10,
      innerSize: '20%',
      zMin: 0,
      name: 'Retiros',
      data: [{
        name: 'Cobros',
        y: 505992,
        z: 92
      }, {
        name: 'Transferencias',
        y: 551695,
        z: 119
      }, {
        name: 'Pagos',
        y: 312679,
        z: 121
      }, {
        name: 'Depositos',
        y: 78865,
        z: 136
      }, {
        name: 'Consultas de Saldo',
        y: 301336,
        z: 200
      
      }]
    }]
  });