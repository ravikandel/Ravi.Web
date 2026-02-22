declare const __APP_MODE__: string | undefined;

const environmentName =
    (typeof __APP_MODE__ !== 'undefined' && __APP_MODE__)
    || (typeof process !== 'undefined' && (process.env.MODE || process.env.NODE_ENV))
    || 'development';

export const isDevelopment = environmentName === 'development';
export { environmentName };