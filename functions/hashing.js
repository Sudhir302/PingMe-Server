const bcrypt = require('bcrypt');

const saltFunction = async (num)=>{
    try {
        const salt = await bcrypt.genSalt(num);
        return salt
    } catch (error) {
        console.error(error);
        return;
    }
}

const hashFunction = async (password)=>{
    try {
        const salt = await saltFunction(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        return;
    }
}

module.exports = hashFunction;