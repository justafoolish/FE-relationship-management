import { createRoot } from 'react-dom/client';
// Axios
import { Chart, registerables } from 'chart.js';

// Redux
import store, { persistor } from 'app/reducers';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Apps
import { MetronicI18nProvider } from './_metronic/i18n/Metronici18n';

// import './_metronic/assets/sass/tailwind.css';
import 'app/assets/css/index.css';
import { AppRoutes } from 'app/routing/AppRoutes';
import './_metronic/assets/sass/plugins.scss';
import './_metronic/assets/sass/style.react.scss';
import './_metronic/assets/sass/style.scss';
import { LayoutSplashScreen } from '_metronic/layout/core';

Chart.register(...registerables);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <ReduxProvider store={store}>
      <PersistGate loading={<LayoutSplashScreen />} persistor={persistor}>
        <MetronicI18nProvider>
          <AppRoutes />
        </MetronicI18nProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
