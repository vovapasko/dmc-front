const multipleRadialBars = {
    chart: {
        height: 350,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                    formatter(val) {
                        return val + '$';
                    }
                },
                total: {
                    show: false
                }
            }
        }
    },
    colors: ['#56c2d6', '#e36498', '#23b397', '#23b397'],
    series: [0, 0, 0, 0],
    labels: ['Месяц', 'Неделю', 'День', 'Час'],
};

export {multipleRadialBars};
