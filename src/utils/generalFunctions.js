export const dateHandler = (date, locale = 'en') => (new Date(date)).toLocaleString(locale);

export const isEmpty = item => (((!item || item === null) || (Array.isArray(item) && !item.length)
  || (typeof item === 'string' && !item.length) || (typeof item === 'object' && !Object.keys(item).length)));

export const genId = () => Math.random().toString().replace('0.', '');
