function validate_inputs(items) {
    for (let i = 0; i < items.length; i++) {
        if (items[i] == undefined)
            return false;
    }
    return true;
}

module.exports = {validate_inputs}