import { useContext } from 'react';
import { CreateProduct } from './components/CreateProduct';
import { ErrorMessage } from './components/ErrorMessage';
import { Loader } from './components/Loader';
import { Modal } from './components/Modal';
import { Product } from './components/Product';
import { useProducts } from './hooks/products';
import { IProduct } from './models';
import { ModalContext } from './context/ModalContext';

function App() {

  const { loading, error, products, addProduct } = useProducts()
  // const [modal, setModal] = useState(false)
  const { modal, open: openModal, close: closeModal } = useContext(ModalContext)

  const createHandler = (product: IProduct) => {
    closeModal()
    addProduct(product)
  }

  return (
    <div className='container pt-5 mx-auto max-w-2xl'>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map(product => <Product product={product} key={product.id} />)}

      {modal && <Modal title='Create new product' onClose={closeModal}>
        <CreateProduct onCreate={createHandler} />
      </Modal>}
      <button
        className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'
        onClick={openModal}
      >+</button>
    </div>
  )
}

export default App;
