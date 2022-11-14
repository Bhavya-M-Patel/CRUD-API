const db = require('../utils/DBHelper');
const utils = require('../utils/utils');
async function addContact(ContactData) {

    let { name, phone, email, user_id } = ContactData;
    let params = [name, phone, email, user_id];
    if (utils.validate_inputs(params)) {
        let sqlstmt = "INSERT INTO CONTACTS(NAME,PHONE,EMAIL,user_id) VALUES($1,$2,$3,$4)"
        return await resolveQuery(sqlstmt, params, "Contact added successfully", "Error occured")
    }
    else {
        return { status: false, msg: 'All inputs are not provided' }
    }
}

async function deleteContact(ContactData) {
    let { contact_id } = ContactData
    let params = [contact_id];
    if (utils.validate_inputs(params)) {
        let sqlstmt = "DELETE FROM CONTACTS WHERE CONTACT_ID = $1";
        return await resolveQuery(sqlstmt, params, "Contact deleted successfully", "Record not found")
    }
    else {
        return { status: false, msg: 'All inputs are not provided' }
    }
}

async function updateContact(ContactData) {
    let { contact_id } = ContactData
    let { name, email, phone } = ContactData.updates;
    let params = [name, email, phone, contact_id]
    if (utils.validate_inputs(params)) {
        let sqlstmt = "UPDATE CONTACTS SET NAME=$1,EMAIL=$2,PHONE=$3 where CONTACT_ID = $4";
        return await resolveQuery(sqlstmt, params, "Record Updated", "Record not found");
    }
    else {
        return { status: false, msg: 'All inputs are not provided' }
    }
}

async function getContact(UserData) {
    let { contact_id } = UserData;
    let params = [contact_id];
    if (utils.validate_inputs(params)) {
        let sqlstmt = "SELECT NAME, PHONE, EMAIL FROM CONTACTS WHERE CONTACT_ID = $1"
        let result = await db.query(sqlstmt, [contact_id]);
        return result.rows;
    }
    else {
        return { status: false, msg: 'All inputs are not provided' }
    }
}

async function getAllContact(UserData) {
    let { user_id } = UserData;
    let params = [user_id];
    if (utils.validate_inputs(params)) {
        let sqlstmt = "SELECT NAME, PHONE, EMAIL, USER_ID FROM CONTACTS WHERE USER_ID = $1"
        let result = await db.query(sqlstmt, [user_id]);
        return result.rows;
    }
    else {
        return { status: false, msg: 'All inputs are not provided' }
    }
}

async function resolveQuery(query, params, successMessage, errorMessage) {
    try {
        let result = await db.query(query, params);

        if (result.rowCount > 0) {
            return { status: true, msg: successMessage }
        }
        else return { status: false, msg: errorMessage }

    } catch (e) {
        return { status: false, msg: "Error occured " + e.message }
    }
}

// Checking if any parameter is undefiend from Parameters


module.exports = { deleteContact, getAllContact, addContact, getContact, updateContact }