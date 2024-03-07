import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PageLogin from './pages/PageLogin';
import PageCadastro from './pages/PageCadastro';
import Produtos from './pages/PageProdutos';
import ProdutoDetalhe from './pages/PageProdutoDetalhes';
import PageHome from './pages/PageHome';
// const Rotas = createBrowserRouter([
//   {
//     path: "/",
//     element: <PageHome/>,
//   },
//   {
//     path: "/login",
//     element: <PageLogin/>,
//   },
//   {
//     path: "/cadastro",
//     element: <PageCadastro/>,
//   },
//   {
//     path: "/produtos",
//     element: <Produtos/>,
//   },
//   {
//     path: "/produtodetalhes/:id/:categoria",
//     element: <ProdutoDetalhe/>,
//   },
// ]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
       <App></App>
    </BrowserRouter>
    {/* <RouterProvider router={Rotas} /> */}
    {/* <Produtos></Produtos> */}
  </React.StrictMode>,
)
