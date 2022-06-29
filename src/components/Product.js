
export default function Product(props) {

  return (
  <main className="container">
  <div className="row">
    <div className="col">
      <section className="catalog-item">
        <h2 className="text-center">{props.prod.title}</h2>
        <div className="row">
            <div className="col-5">
              <img src={props.prod.images[0]} className="img-fluid" alt=""/>
            </div>
            <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{props.prod.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{props.prod.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{props.prod.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{props.prod.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{props.prod.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{props.prod.reason}</td>
                    </tr>
                    <tr>
                      <td>Высота каблука</td>
                      <td>{props.prod.heelSize}</td>
                    </tr>
                    <tr>
                      <td>Цена за 1 шт.</td>
                      <td>{props.prod.price}р.</td>
                    </tr>                    
                  </tbody>
                </table>
                <div className="text-center">
                    <p>Размеры в наличии: 
                      { props.prod.sizes.map( (item) => {
                        return <span key={item.size} 
                          className={ (item.size === props.purchaseSize) ? "catalog-item-size selected" : "catalog-item-size" } 
                          onClick={ () => { props.handlePickSize(item.size) }}
                          > {item.size} 
                          </span>
                      }) }
                    </p>

                    <p>Количество: 
                      <span className="btn-group btn-group-sm pl-2">
                        <button className="btn btn-secondary" onClick={props.handleMinus}>-</button>
                        <span className="btn btn-outline-primary">{props.purchaseCnt}</span>
                        <button className="btn btn-secondary" onClick={props.handlePlus}>+</button>
                      </span>
                    </p>
                </div>
                <button className="btn btn-danger btn-block btn-lg" onClick={props.handleAddToCart}>В корзину</button>
            </div>
        </div>
      </section>
    </div>
  </div>
  </main>     
  )
}


