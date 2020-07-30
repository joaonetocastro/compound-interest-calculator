<template>
    <v-container>
        <v-row no-gutters class="text-center mainForm">
            <template>
                <v-col>
                    Quanto você tem hoje para investir?
                    <v-text-field
                        autofocus
                        :rules="[validateNumber]"
                        v-model="presentValue"
                        type="number"
                        prefix="R$"
                        placeholder="00.00"
                        outlined
                    ></v-text-field>
                    Aplicação mensal
                    <v-text-field
                        type="number"
                        :rules="[validateNumber]"
                        v-model="monthlyInvestiment"
                        prefix="R$"
                        placeholder="00.00"
                        outlined
                    ></v-text-field>
                    Por quantos meses?
                    <v-text-field
                        type="number"
                        :rules="[validateNumber]"
                        v-model="time"
                        prepend-inner-icon="mdi-calendar-month"
                        placeholder="12 Meses"
                        outlined
                    ></v-text-field>
                    Rentabilidade(% ao ano)
                    <v-text-field
                        type="number"
                        :rules="[validateNumber]"
                        v-model="interest"
                        prepend-inner-icon="mdi-percent-outline"
                        placeholder="0.00%"
                        step="0.01"
                        outlined
                    ></v-text-field>
                </v-col>
            </template>
            <template>
                <v-col>
                    <MainChart :chart-data="chartData" />
                    <h4>Valor total investido: {{ currencyFormater.format(totalInvested) }}</h4>
                    <h4>Valor recebido em juros compostos: {{ currencyFormater.format(totalCompoundInterest) }}</h4>
                    <h4>Total acumulado antes do IR: {{ currencyFormater.format(totalAccumulatedBeforeTaxes) }}</h4>
                    <h4>Total de impostos a pagar ({{ IOF * 100 }}%): {{ currencyFormater.format(totalInTaxes) }}</h4>
                    <h4>total a receber após IR: {{ currencyFormater.format(totalAccumulatedAfterTaxes) }}</h4>
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import * as FinancialMath from '../utils/FinancialMath';
import MainChart from './MainChart';

export default {
    name: 'HelloWorld',
    components: { MainChart },
    data: () => ({
        presentValue: 10000,
        time: 120,
        monthlyInvestiment: 250,
        interest: 15,
        errorMessages: ['Hello'],
        currencyFormater: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }),
    }),
    computed: {
        totalInvested() {
            return FinancialMath.totalInvested(this.props);
        },
        IOF() {
            return FinancialMath.IOF(this.props.time);
        },
        totalInTaxes() {
            return FinancialMath.totalInTaxes(this.props);
        },
        totalCompoundInterest() {
            return FinancialMath.totalCompoundInterest(this.props);
        },
        totalAccumulatedBeforeTaxes() {
            return FinancialMath.totalAccumulatedBeforeTaxes(this.props);
        },
        totalAccumulatedAfterTaxes() {
            return FinancialMath.totalAccumulatedAfterTaxes(this.props);
        },
        props() {
            return {
                presentValue: Number(this.presentValue),
                time: Number(this.time),
                monthlyInvestiment: Number(this.monthlyInvestiment),
                interest: FinancialMath.yearlyInterestToMonthly(Number(this.interest) / 100.0),
            };
        },
        chartData() {
            const data = [];
            console.log('calculating chartDatsa');
            for (let i = 0; i < this.time; i++) {
                data.push([
                    FinancialMath.totalInvested({ ...this.props, time: i }),
                    FinancialMath.totalCompoundInterest({ ...this.props, time: i }),
                ]);
            }
            return data;
        },
    },
    methods: {
        validateNumber(number) {
            return /^\d+$/.test(number);
        },
    },
};
</script>

<style scoped>
/* .mainForm {
    display: flex;
    flex-direction: column;
    align-items: center;
} */
</style>
