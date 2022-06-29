
import Catalog from '../Catalog';
import Header from '../layout/LOHeader';
import Footer from '../layout/LOFooter';

export default function PageCatalog(props) {
  return (
    <>
    <Header/>
    <hr/>
    <Catalog needShow={true}/>
    <Footer/>
    </>
  )
}
