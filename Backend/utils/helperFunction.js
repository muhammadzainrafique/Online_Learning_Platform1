const bcrypt = require("bcrypt");

const getHashedPassword = async (password)=>{
    const hashedPassword = await bcrypt.hash(password, 10);

    return hashedPassword;
}




module.exports = {
    getHashedPassword,
    
}