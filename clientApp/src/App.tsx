import { useEffect, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom';
import './custom.scss'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from './AppRoutes';
import { GlobalUIStore, GlobalUIStoreContext } from "./common/stores/GlobalUIStore.ts";
import { GlobalDialog } from "./common/components/GlobalDialog.tsx";
import { FullScreenOverlay } from './common/components/FullScreenOverlay.tsx';


const queryClient = new QueryClient();
queryClient.setDefaultOptions({
  queries: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  },
});

const App = () => {
  const globalUIStore = useMemo(() => new GlobalUIStore(), []);

  useEffect(() => {
    const initializeEnvironment = async () => {
      const environmentWatermark = await globalUIStore.loadEnvironmentWatermark();
      document.body.style.backgroundImage = environmentWatermark ? `url("${environmentWatermark}")` : '';
    };

    void initializeEnvironment();
  }, [globalUIStore]);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer/>
      <GlobalUIStoreContext.Provider value={globalUIStore}>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />
          })}
        </Routes>
        <GlobalDialog/>
        <FullScreenOverlay/>
      </GlobalUIStoreContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
