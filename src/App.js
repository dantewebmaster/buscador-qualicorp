import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";

// Date picker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom components
import Header from './components/Header';

// Services
import { getProfessions, getEntities, getPlans } from './services/qualicorp';
import { getUfs, getCities } from './services/ibge';

// import AsyncSelect from 'react-select/async';
import Select from 'react-select';

// Helpers
import formatProfessionOptions from './utils/formatProfessionOptions';
import formatEntitiesOptions from './utils/formatEntitiesOptions';
import formatUfOptions from './utils/formatUfOptions';
import formatCitiesOptions from './utils/formatCitiesOptions';
import PlansList from './components/PlansList';

registerLocale('pt-BR', ptBR);


export default function App() {
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);


  // Form values
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [selectedUf, setSelectedUf] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [birthDate, setBirthDate] = useState(null);


  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const [professions, setProfessions] = useState([]);
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    async function fetchUfs() {
      const response = await getUfs();
      const formattedUfs = formatUfOptions(response.data);
      setUfs(formattedUfs)
    }

    fetchUfs();
  }, []);

  async function handleSelectUf(selectedOption) {
    setSelectedUf(selectedOption);

    // reset next form values
    setSelectedCity(null);
    setSelectedProfession(null);
    setSelectedEntity(null);

    const cities = await getCities(selectedOption.value);
    const formattedCities = formatCitiesOptions(cities.data);

    setCities(formattedCities);
  }

  async function handleSelectCity(selectedOption) {
    setSelectedCity(selectedOption);

    // reset next form values
    setSelectedProfession(null);
    setSelectedEntity(null);
    
    const professions = await getProfessions(selectedUf.value, selectedOption.value);
    const formattedProfessions = formatProfessionOptions(professions);

    setProfessions(formattedProfessions);
  }

  async function handleSelectProfession(selectedOption) {
    setSelectedProfession(selectedOption);

    // reset next form values
    setSelectedEntity(null);

    const entities = await getEntities(selectedUf.value, selectedCity.value, selectedOption.value);
    const formattedEntities = formatEntitiesOptions(entities);

    setEntities(formattedEntities)
  }

  function handleSelectEntity(selectedOption) {
    setSelectedEntity(selectedOption);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);

      const formattedDate = format(birthDate, 'yyyy-MM-dd');

      const payload = {
        "entidade": selectedEntity.value,
        "uf": selectedUf.value,
        "cidade": selectedCity.value,
        "datanascimento": [formattedDate],
      }
  
      const response = await getPlans(payload);

      setPlans(response.planos);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="container">
      <Header />
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="uf">Estado</label>
          <Select 
            options={ufs}
            onChange={handleSelectUf}
            value={selectedUf}
            placeholder="Selecione o estado"
          />
        </div>
        <div className="form-field">
          <label htmlFor="city">Cidade</label>
          <Select
            options={cities}
            onChange={handleSelectCity}
            value={selectedCity}
            placeholder="Selecione a cidade"
          />
        </div>
        <div className="form-field">
          <label htmlFor="profession">Profissão</label>
          <Select
            options={professions}
            onChange={handleSelectProfession}
            value={selectedProfession}
            placeholder="Selecione a profissão"
          />
        </div>
        <div className="form-field half">
          <label htmlFor="entity">Entidade</label>
          <Select
            options={entities}
            onChange={handleSelectEntity}
            value={selectedEntity}
            placeholder="Selecione a entidade"
          />
        </div>
        <div className="form-field half">
          <label htmlFor="birthdate">Data de nascimento</label>
          <DatePicker
            selected={birthDate}
            onChange={date => setBirthDate(date)}
            dateFormat="dd/MM/yyyy"
            locale="pt-BR"
            maxDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Selecione data de nascimento"
          />
        </div>
        <button 
          className="btn btn-primary text-uppercase" 
          type="submit"
          disabled={
            !birthDate || !selectedUf || !selectedCity || !selectedProfession || !selectedEntity
          }
        >Listar melhores planos</button>
      </form>

      <PlansList 
        items={plans}
        loading={loading}
      />
    </div>
  );
}
