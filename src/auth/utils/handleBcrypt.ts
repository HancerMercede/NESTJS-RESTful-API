/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcryptjs';


const saltOfArounds = 10;

async function GenerateHash(plainPasswordText: string): Promise<string> {
    const hash = await bcrypt.hash(plainPasswordText, saltOfArounds);
    return hash;
}
async function CompareHash(plain: string, hash: string): Promise<string> {
    return await bcrypt.compare(plain, hash);
}
export { GenerateHash, CompareHash }