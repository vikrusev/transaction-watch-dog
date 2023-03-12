module.exports = {
    // Regex if the string is a correct hexademical hash
    hexHash: new RegExp(/(0[x])?[0-9a-f]/i),

    // Regex if the string is a valid 32 bytes hexademical hash
    // Transaction hash is 32 bytes, which is 64 characters, excluding '0x', which is optional
    // Example: 0x0123456789abcdef, case insensitive
    hexHash32Bytes: new RegExp(/(0[x])?[0-9a-f]{64}/i),

    // Regex if the string is a valid number
    // Cannot start w/ a '0'
    stringNumber: new RegExp(/^[1-9][0-9]*/)
}