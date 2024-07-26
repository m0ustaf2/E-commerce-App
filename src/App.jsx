import { Toaster } from "react-hot-toast";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { ToastContainer } from "react-toastify";
import AllOrders from "./Components/AllOrders/AllOrders";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import CheckOut from "./Components/CheckOut/CheckOut";
import Disconnected from "./Components/Disconnected/Disconnected";
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Notfound from "./Components/Notfound/Notfound";
import ProductDetailes from "./Components/ProductDetailes/ProductDetailes";
import Profile from "./Components/Profile/Profile";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Register from "./Components/Register/Register";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import CartContextProvider from "./Context/CartContext";

export default function App() {
  const Routes = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "E-commerce-App",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "brandproducts/:id",
          element: (
            <ProtectedRoute>
              <BrandProducts />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <CheckOut />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        {
          path: "product-details/:id",
          element: (
            <ProtectedRoute>
              <ProductDetailes/>
            </ProtectedRoute>
          ),
        },

        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <Offline>
        <Disconnected />
      </Offline>
      <ToastContainer theme="colored" style={{ marginTop: 50 }} />

      <CartContextProvider>
        <Toaster
          toastOptions={{
            style: {
              background: "#363636",
              color: "#fff",
              marginTop: 50,
            },
          }}
        />
        <RouterProvider router={Routes} />
      </CartContextProvider>
    </>
  );
}
