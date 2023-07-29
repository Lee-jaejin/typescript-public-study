import fs from 'fs';

export const fileExists = (filePath: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) =>
        fs.access(filePath, (error) =>
            resolve(!error)
        )
    );
}