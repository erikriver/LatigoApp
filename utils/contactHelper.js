export const getPhonenumber = (contact) => {
    if (contact.phoneNumbers && contact.phoneNumbers.length){
        return contact.phoneNumbers[0].number
    }
    return '';
}