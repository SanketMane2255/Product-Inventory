import { useAppSelector } from './hooks/redux';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const currentView = useAppSelector(state => state.app.currentView);

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'list' && <ProductList />}
      {(currentView === 'add' || currentView === 'edit') && <ProductForm />}
    </div>
  );
}

export default App;
