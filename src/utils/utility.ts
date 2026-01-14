import bcrypt from "bcrypt"

async function createHash(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, 15)
    return hashedPassword
}

export {createHash}