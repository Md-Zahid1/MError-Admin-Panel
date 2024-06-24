/* eslint-disable perfectionist/sort-imports */
import { Toaster } from 'react-hot-toast';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

// ----------------------------------------------------------------------


export default function App() {

  useScrollToTop();

  return (
    <ThemeProvider>
      <Toaster />
      <Router />
    </ThemeProvider>
  );
}
