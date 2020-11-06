module.exports = function(unsafe) {
    return "'"+unsafe.replace("'", "''")+"'";
}
