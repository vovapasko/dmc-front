import { ChartType } from './apex.model';

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
                },
                total: {
                    show: true,
                    label: 'Всего',
                    formatter(w) {
                        return 0;
                    }
                }
            }
        }
    },
    colors: ['#56c2d6', '#e36498', '#23b397', '#4a81d4'],
    series: [0, 0, 0, 0],
    labels: ['Месяц', 'Неделю', 'День', 'Час'],
};

export {multipleRadialBars};
