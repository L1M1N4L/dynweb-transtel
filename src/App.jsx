import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import ProductCategories from './components/product/ProductCategories';
import ProductList from './components/product/ProductList';
import ProductDetail from './components/product/ProductDetail';
import SolutionPage from './pages/SolutionPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="product" element={<ProductPage />}>
            <Route index element={<ProductCategories />} />
            <Route path=":category" element={<ProductList />} />
            <Route path=":category/:productId" element={<ProductDetail />} />
          </Route>
          <Route path="solution" element={<SolutionPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
        <Route path="/secure-dashboard" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}