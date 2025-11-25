import "@/styles/globals.css";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import type { AppProps } from "next/app";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registrado'))
        .catch((error) => console.log('Erro ao registrar Service Worker:', error));
    }
  }, []);

  return <Component {...pageProps} />;
}
