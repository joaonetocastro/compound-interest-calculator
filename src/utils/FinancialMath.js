export function IOF(time) {
    if (time > 24) return 0.15;
    if (time > 12) return 0.175;
    if (time > 6) return 0.2;
    return 0.225;
}

export function totalInTaxes(props) {
    const { time } = props;
    return (IOF(time) * totalCompoundInterest(props)).toFixed(2);
}

export function totalCompoundInterest(props) {
    return (totalAccumulatedBeforeTaxes(props) - totalInvested(props)).toFixed(2);
}

export function totalInvested(props) {
    const { presentValue, time, monthlyInvestiment } = props;
    return (presentValue + time * monthlyInvestiment).toFixed(2);
}

export function totalAccumulatedBeforeTaxes(props) {
    const { presentValue, time, monthlyInvestiment, interest } = props;
    return (
        presentValue * Math.pow(1 + interest, time) +
        (monthlyInvestiment * (Math.pow(1 + interest, time) - 1)) / interest
    ).toFixed(2);
}

export function totalAccumulatedAfterTaxes(props) {
    return (totalAccumulatedBeforeTaxes(props) - totalInTaxes(props)).toFixed(2);
}

export function yearlyInterestToMonthly(interest) {
    return Math.pow(1 + interest, 1 / 12) - 1;
}
