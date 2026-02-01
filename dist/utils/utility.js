import bcrypt from "bcrypt";
async function createHash(password) {
    const hashedPassword = await bcrypt.hash(password, 15);
    return hashedPassword;
}
export { createHash };
//# sourceMappingURL=utility.js.map