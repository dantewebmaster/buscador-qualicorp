import axios from 'axios';

const qualicorpApi = axios.create({
  baseURL: 'https://apisimulador.qualicorp.com.br',
});

async function getProfessions(uf, city) {
  const response = await qualicorpApi.get(`/profissao/${uf}/${city}`, { 
    params: { 'api-key': 'eebc059d-6838-4762-8e28-d2f726753866' },
  });
  
  return response.data;
}

async function getEntities(uf, city, profession) {
  const response = await qualicorpApi.get(`/entidade/${profession}/${uf}/${city}`, { 
    params: { 'api-key': 'f1e6c49a-ca38-45d7-984a-616ff4fb458a' } 
  });
  
  return response.data;
}

async function getPlans(payload) {
  const { entidade, uf, cidade, datanascimento } = payload;

  const data = {
    entidade, 
    uf, 
    cidade, 
    datanascimento, 
  }

  const response = await qualicorpApi.post('/plano', data, {
    headers: {
      'x-gravitee-transaction-id': '69705fe6-8380-4886-b05f-e6838018869d'
    },
    params: { 'api-key': '47acfdec-048b-40a1-b826-d867199ac786' },
  });

  return response.data;
}

export {
  getProfessions,
  getEntities,
  getPlans,
}
