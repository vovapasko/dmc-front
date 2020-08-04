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


// Revenue table data
export interface RevenueData {
    marketplaces: string;
    date: string;
    payout: string;
    status: string;
}

// Chart data
export interface ChartType {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    stroke?: any;
    fill?: any;
    labels?: any;
    markers?: any;
    legend?: any;
    xaxis?: any;
    yaxis?: any;
    tooltip?: any;
    grid?: any;
}


const revenueRadialChart: ChartType = {
    chart: {
        height: 200,
        type: 'radialBar',
    },
    plotOptions: {
        radialBar: {
            hollow: {
                size: '65%',
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    fontSize: '24px',
                    color: 'rgb(241, 85, 108)',
                    offsetY: 10,
                    formatter: (val) => {
                        return val + '%';
                    },
                },
            },
        },
    },
    colors: ['rgb(241, 85, 108)'],
    series: [0],
    stroke: {
        lineCap: 'round',
    },
};

export {multipleRadialBars, revenueRadialChart};
