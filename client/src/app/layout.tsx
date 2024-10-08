import React, { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import ReduxProvider from "../components/redux/ReduxProvider";
import theme from "./theme";
import styles from '../styles/Layout.module.css';
import '../styles/global.css';

export const metadata = {
  title: 'User Management',
  description: 'User Management App',
};

interface LayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <ReduxProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <div className={styles.appWrapper}>
                {children}
              </div>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
