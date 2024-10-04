
import bcrypt from 'bcrypt';

// Función para hashear una contraseña
export async function hashPassword(plainPassword: string): Promise<string> {
  const saltRounds = 10; // Número de veces que se aplica el algoritmo de hashing
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}
export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}