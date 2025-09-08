import { customAlphabet } from 'nanoid';


const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 7);


export function generateShortcode() {
  return nanoid();
}


export function isValidShortcode(code) {
  return typeof code === 'string' && /^[A-Za-z0-9]{3,20}$/.test(code);
}
