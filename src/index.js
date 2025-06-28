import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"



import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start({
    onUnhandledRequest: "bypass", // You can also log unhandled ones
    quiet: false, // Set to true to suppress MSW logs
  });
}


const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <BrowserRouter>
         <QueryClientProvider client={queryClient}>
           <App />
         <ReactQueryDevtools initialIsOpen={false} />
         </QueryClientProvider>
        </BrowserRouter>
       <Toaster />
    </Provider>
);