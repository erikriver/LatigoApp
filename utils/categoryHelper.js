import R from 'ramda';

export const getCategoryById = (categories, id) => {
    var result = null;
    if(id >= 0){
        R.map((category) => {
            if (category.id == id) {
                result = category;
            }
        }, categories.list);
    }
    
    return result;
}

export const getMostUsedCategories = (categories) =>{
    let resuslts= R.sort((a,b)=>{
        return a.usedTimes <= b.usedTimes 
    },R.values(categories.list))
    return resuslts;
}