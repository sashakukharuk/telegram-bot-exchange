const ChartJsImage = require('chartjs-to-image');
const {differentDay} = require('../helpers/differntDate')
const moment = require("moment")

module.exports.generateChart = async (data) => {

    const currencyFirstValue = []
    let currencyNameFirst = null
    const labels = []

    for (let i = 9; i >= 1; i--) {
        const date = differentDay(i)
        const objCurrency = data[date]
        if (objCurrency) {
            labels.push(moment(date).format('MM-DD'))
            const currencies = Object.entries(objCurrency)
            currencyFirstValue.push(currencies[0][1])
            currencyNameFirst = currencies[0][0]
        }
    }

    const myChart = new ChartJsImage();

    myChart.setConfig({
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: currencyNameFirst,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgb(255, 99, 132)",
                    data: currencyFirstValue
                }
            ]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return Number(tooltipItem.yLabel).toFixed(4);
                    }
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                        stepSize: 0.0900
                    },
                }]
            },
            legend: {
                display: true,
            },
            responsive: true,
            title: {
                display: true,
                text: `Chart rates ${currencyNameFirst}`
            }
        }

    });

    return await myChart.getShortUrl()
}
