import React from 'react';
import './styles.scss';
import { formatMoney } from '../../utils/formatMoney';

export default function PlansList({
  items,
  loading,
}) {
  return (
    <div className="plans-list">
      {loading && (
        <p className="text-center">Carregando...</p>
      )}

      {!loading && (items || []).length > 0 && (
        <>
          <div className="plans-list-header">
            <p className="col-small">Agência</p>
            <p className="col-large">Plano</p>
            <p className="col-small">Abrangência</p>
            <p className="col-thin">Preço</p>
          </div>
          <ul className="plans-list">
            {items.map((plan, index) => (
              <div className="panel" key={plan.id + index.toString()}>
                <li className="plan-item">
                  <div className="col-small plan-logo">
                    <img src={plan.operadoraLogo} alt={plan.nome_plano_ans} />
                  </div>
                  <div className="col-large plan-name">
                    <h3>{plan.nome_plano_ans}</h3>
                    <small>{plan.segmentacao} | {plan.tipo_acomodacao}</small>
                  </div>
                  <h4 className="plan-coverage col-small">{plan.abrangencia}</h4>
                  <h4 className="plan-prices col-thin">{formatMoney(plan.precos.total)}</h4>
                </li>
                <div className="hidden panel-details">
                  <p>Mais detalhes do item...</p>                  
                </div>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
