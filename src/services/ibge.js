import axios from 'axios';

const ibgApi = axios.create({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
});

export function getUfs() {
  return ibgApi.get('/estados')
}

export function getCities(uf) {
  return ibgApi.get(`/estados/${uf}/municipios`);
}

