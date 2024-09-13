import bcrypt from 'bcrypt';

/*export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    return await bcrypt.hash(password, salt);
}*/

export const hashPassword = async (password) => {
    try {
        console.log("Password received for hashing:", password); // Debugging line

        if (!password) {
            throw new Error("Password is undefined or null");
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("Hashed Password:", hashedPassword); // Debugging line
        return hashedPassword;
    } catch (error) {
        console.log("Error in hashPassword function:", error.message);
        throw error;
    }
};

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password,hash);
}


export const newpassword = async (newPassword) => {
    try {
        if (!newPassword){
            console.log('new password is undefined or null');
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        return hashedPassword;
    } catch (error) {
        console.log("Error in hashPassword function:", error.message);
        throw error;
    }
}