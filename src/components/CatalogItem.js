import { Link } from 'react-router-dom';

export default function CatalogItem(props) {

  return (
    <div className="col-4">
    <div className="card catalog-item-card">
      <img src={props.image}
        className="card-img-top img-fluid" alt={props.title}/>
      <div className="card-body">
        <p className="card-text">{props.title}</p>
        <p className="card-text">{props.price}р.</p>
        { (props.prodLink !== undefined) 
        ? <>
        <Link to={props.prodLink} className="btn btn-outline-primary">Заказать</Link>
        </> 
        : <></>
        }
        
      </div>
    </div>
    </div>
  )
}
