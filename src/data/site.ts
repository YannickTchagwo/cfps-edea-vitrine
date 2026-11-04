export const site = {
  name: 'CFPS d’Édéa',
  city: 'Édéa, Cameroun',
  phone: null,
  email: null,
  address: null,
};
export const url = (path = '') =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
