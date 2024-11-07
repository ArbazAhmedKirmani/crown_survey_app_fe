import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes";
import { ThemeConfig } from "./utils/theme-config";
import frFR from "antd/locale/fr_FR";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={frFR} theme={ThemeConfig.light}>
        <RouterProvider router={AppRouter} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
