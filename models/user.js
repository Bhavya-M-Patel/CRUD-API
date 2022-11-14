const md5 = require('md5');
const db = require('../utils/DBHelper');
const token_utils = require('../utils/token')
const utils = require('../utils/utils')

async function registerUser(userData) {
    let sqlStmt = 'INSERT INTO USERS(NAME,EMAIL,PASSWORD,PHONE) VALUES($1,$2,$3,$4)'
    let { name, password, email, phone } = userData;
    let params = [name, email, password, phone]
    if (utils.validate_inputs(params)) {
        password = md5(password);
        params = [name,email,password,phone];
        try {
            let result = await db.query(sqlStmt,params);
            if (result.rowCount > 0)
                return { status: true, msg: "Registration successful" };
        } catch (e) {
            return { status: false, msg: 'User already exsits' }
        }
    }
    else {
        return { status: false, msg: "All inputs are not provided" }
    }
}

async function validate_Credentials(userData) {
    let sqlStmt = "Select id,phone,password from users where email = $1 Limit 1"
    let { email } = userData;

    let data = await db.query(sqlStmt, [email]);

    if (data.rowCount > 0) {
        if (data.rows[0].password === md5(userData.password)) {
            let { id, phone } = data.rows[0];
            let dataToBeSigned = { id, phone }
            let token = token_utils.SignToken(dataToBeSigned);
            return { status: true, token }
        }
        else
            return { status: false, msg: 'Incorrect username or Password.' }
    }
    else
        return { status: false, msg: 'User not found.' }
}

module.exports = { registerUser, Login: validate_Credentials }