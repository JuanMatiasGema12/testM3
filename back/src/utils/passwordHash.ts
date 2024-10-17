
import bcrypt from 'bcrypt';

export async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}