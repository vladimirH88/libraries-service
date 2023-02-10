import { hash, compare } from 'bcryptjs';

export class Encryption {
  async encrypt(string: string) {
    if (!string) return;
    const value = await hash(string, 5);
    return value;
  }
  async compare(data: string, encrypted: string) {
    return await compare(data, encrypted);
  }
}

export default new Encryption();
