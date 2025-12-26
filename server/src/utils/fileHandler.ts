import fs from 'fs-extra';
import path from 'path';

/** Resolve absolute file path */
const getFilePath = (fileName: string): string => {
  return path.join(process.cwd(), 'data', fileName);
};

/** Ensure file & directory exist */
export const ensureFileExists = async (fileName: string): Promise<void> => {
  const filePath = getFilePath(fileName);

  try {
    await fs.access(filePath);
  } catch {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify([], null, 2));
  }
};

/** Read data from file */
export const readFileData = async <T>(fileName: string): Promise<T[]> => {
  const filePath = getFilePath(fileName);

  await ensureFileExists(fileName);
  const data = await fs.readFile(filePath, 'utf-8');

  return JSON.parse(data) as T[];
};

/** Write data to file */
export const writeFileData = async <T>(
  fileName: string,
  data: T[],
): Promise<void> => {
  const filePath = getFilePath(fileName);

  await ensureFileExists(fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};
