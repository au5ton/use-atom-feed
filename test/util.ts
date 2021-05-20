import fs from 'fs';
import path from 'path';
import util from 'util';

/** cross-platform shortcut to get the contents of a file */
export function readFileSync(...paths: string[]): string {
  return fs.readFileSync(path.resolve(__dirname, path.join(...paths)), { encoding: 'utf-8' });
}

/** cross-platform shortcut to get the contents of a file */
export async function readFile(...paths: string[]): Promise<string> {
  const readFile = util.promisify(fs.readFile);
  return await readFile(path.resolve(__dirname, path.join(...paths)), { encoding: 'utf-8' });
}