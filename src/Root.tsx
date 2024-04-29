import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ProductCategories } from './types';
import {
  HomePage,
  CategoryPage,
  ProductDetailsPage,
  CartPage,
  FavouritesPage,
} from './pages';
import { NotFoundPage } from './ui/components';
import { App } from './App';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." />} />
        <Route path={ProductCategories.phones}>
          <Route
            index
            element={<CategoryPage category={ProductCategories.phones} />}
          />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>
        <Route path={ProductCategories.tablets}>
          <Route
            index
            element={<CategoryPage category={ProductCategories.tablets} />}
          />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>
        <Route path={ProductCategories.accessories}>
          <Route
            index
            element={<CategoryPage category={ProductCategories.accessories} />}
          />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="favorites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        {/* <Route path="*" element={<Navigate replace to="/404" />} /> */}
      </Route>
    </Routes>
  </Router>
);
