import R from 'ramda';
import moment from 'moment';

/**
 * 
 * @param {*} transactions 
 * @param {*} accId Account Id (empty for total)
 * @param {*} exceptId Not included to total
 * @param {*} maxDate Calculate sum to that date (moment object)
 */
export const accountTransactionsSum = (transactions, accId, exceptId, maxDate) => R.reduce(
    (sum, transaction) => {
        let delta = 0;

        if (!accId || R.propEq('account', accId, transaction)) {
            if (transaction.id != exceptId && (!maxDate || moment(transaction.date).isBefore(maxDate, 'day'))){
                delta = transaction.value;
            }
        }
        return sum + delta;
    }, 0, R.values(transactions.list),
);

export const accountTotalSpend= (transactions, accId) => R.reduce(
    (sum, transaction) => {
        let delta = 0;

        if (transaction.account == accId && transaction.value < 0) {
            delta = transaction.value;
        }
        return sum + delta;
    }, 0, R.values(transactions.list),
);

export const accountTotalIncome= (transactions, accId) => R.reduce(
    (sum, transaction) => {
        let delta = 0;

        if (transaction.account == accId && transaction.value > 0) {
            delta = transaction.value;
        }
        return sum + delta;
    }, 0, R.values(transactions.list),
);

export const eqAccount = accountId => R.propEq('account', accountId);

export const inDateRange = period => ({ date }) => {
    const dt = new Date(date);

    return R.and(
        R.gte(dt.getTime(), period.from.getTime()),
        R.lt(dt.getTime(), period.to.getTime()),
    );
};

export const filterByAccountAndDate = (transactions, accountId, period) => {
    let check = eqAccount(accountId);

    if (period) {
        check = R.both(check, inDateRange(period));
    }

    return R.filter(check, R.values(transactions.list));
};

export const filterByDate = (transactions, period) => {
    check = inDateRange(period);

    return R.filter(check, R.values(transactions.list));
};

export const sortByDate = (transactions) => {
    return R.sort((a, b)=>{
        return a.date < b.date
    }, transactions);
}

export const getContactTransactions = (transactions, contactId) => {
    return R.filter(({ contacts, value, isDebtLoan })=>{
        isValid = false;
        if (isDebtLoan && contacts){
            contacts.forEach(contact => {
                if (contact.id == contactId){
                    isValid = true;
                };
            });
        }
        return isValid;
    }, R.values(transactions.list));
}

export const getContactBalance = (transactions, contactId) => {
    let total = 0;
    R.filter(({ contacts, value, isDebtLoan })=>{
        if (isDebtLoan && contacts){
            contacts.forEach(contact => {
                if (contact.id == contactId){
                    total += value;
                };
            });
        }
    }, R.values(transactions.list));
    return total;
}

/**
 * 
 * @param {*} transactions 
 * @param {Number} startBalance Set true for get only income
 * @param {moment} fromDate Calculate from date
 * @param {moment} toDate Calculate to date
 * @param {Boolean} isIncome Set true for get only income, false for expense, null for all
 */
export const getTransactionByDay = (transactions, startBalance = 0, fromDate  = null, toDate = null, isIncome = null)=>{
    let results = [];
    let nextBalance = startBalance;
    let min = startBalance;
    let max = 0;
    let runTime = 0;

    let runDate= fromDate.clone();

    while (runTime <= 31 && runDate.isSameOrBefore(toDate)){
        let dayResult = {
            name: runDate.format('D'),
            date: runDate.format('YYYY/MM/DD'),
            total: nextBalance
        }
        R.map((transaction) => {
            if (moment(transaction.date).isSame(runDate, 'day')) {
                if (isIncome == null || (isIncome ? transaction.value > 0 : transaction.value < 0)) {
                    dayResult.total += Math.abs(transaction.value);
                }
            }
        }, transactions);

        results.push(dayResult);

        if (dayResult.total < min) {
            min = dayResult.total;
        }

        if (dayResult.total > max) {
            max = dayResult.total;
        }
        nextBalance = dayResult.total;
        runDate = runDate.subtract(-1, 'day');
        runTime ++;
    }
    return { results: results, min: min, max: max };
}

export const mapDebtLoanWithContacts = (transactions) =>{
    let total = 0;
    let results = [];
    R.map((transaction) => {
        let isExisted = false;
        R.map((loan) => {
            if(loan.contact && transaction.contacts && transaction.contacts.length && loan.contact.id == transaction.contacts[0].id){
                loan.total += transaction.value;
                loan.transactions.push(transaction.id);
                isExisted = true;
            }
        } ,results);
        if(!isExisted){
            results.push({
                contact: transaction.contacts && transaction.contacts.length ? transaction.contacts[0] : null,
                transaction: transaction.contacts && transaction.contacts.length ? null : transaction,
                total: transaction.value,
                transactions: [
                    transaction.id
                ]
            });
        }
        total += transaction.value;
    },transactions)

    return {total: total, results: results};
}

/**
 * 
 * @param {*} transactions 
 */
export const getListLoan = (transactions) =>{
    let loanTransactions = R.filter((transaction) => R.propEq('isDebtLoan', true,transaction) && transaction.value > 0, R.values(transactions.list));

    return mapDebtLoanWithContacts(loanTransactions);
}

/**
 * 
 * @param {*} transactions 
 */
export const getListDebt = (transactions) =>{
    let debtTransactions = R.filter((transaction) => R.propEq('isDebtLoan', true,transaction) && transaction.value < 0, R.values(transactions.list));

    return mapDebtLoanWithContacts(debtTransactions);
}