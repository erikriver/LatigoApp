import R from 'ramda';

export const getSummaryAccount=(accounts) => {
    var total = 0;
    R.map(account => {
        if (!account.excludedFromTotal) {
            total += account.balance;
        }
    }, accounts); 
    return total;
}

export const getAccountById = (accounts, activeId) => {
    var result = null;
    R.map((account) => {
        if (account.id == activeId) {
            result = account;
        }
    }, accounts.list);
    
    if(result){
        return result;
    }
    return {name: 'All Account', balance: getSummaryAccount(accounts), icon:'002molecular'}
}

export const getAccountList = (accounts) =>{
    return R.values(accounts.list);
}

export const updateAccountBalance = (account) => {
    
}