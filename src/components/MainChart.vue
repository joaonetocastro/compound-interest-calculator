<template>
    <canvas id="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js';
export default {
    name: 'MainChart',
    props: { chartData: { type: Array, required: true } },
    watch: {
        chartData: function() {
            this.chart.data.labels = this.chartData.map((data, index) => index);
            this.chart.data.datasets[0].data = this.chartData.map(data => data[0]);
            this.chart.data.datasets[1].data = this.chartData.map(data => data[1]);
            this.chart.update();
        },
    },
    mounted() {
        this.renderChart();
    },
    methods: {
        renderChart() {
            console.log(this.chartData);
            var ctx = document.getElementById('myChart');
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.chartData.map((data, index) => index),
                    datasets: [
                        {
                            // one line graph
                            label: 'Total investido',
                            data: this.chartData.map(data => data[0]),
                            backgroundColor: '#66A9CA', // Blue
                            // borderColor: '#36495d',
                            //     ,
                            borderWidth: 3,
                        },
                        {
                            // another line graph
                            label: 'Recebido em juros compostos',
                            data: this.chartData.map(data => data[1]),
                            backgroundColor: '#FC8D65', // Green

                            // borderColor: ['#47b784'],
                            borderWidth: 3,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    lineTension: 1,
                    scales: {
                        yAxes: [
                            {
                                stacked: true,
                                ticks: {
                                    beginAtZero: true,
                                    padding: 25,
                                },
                            },
                        ],
                        xAxes: [{ stacked: true }],
                    },
                },
            });
        },
    },
};
</script>
<style scoped>
#myChart {
    width: 80%;
    height: auto;
}
</style>
