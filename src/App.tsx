import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./routes";
import { ThemeConfig } from "./utils/config/theme.config";
import en_US from "antd/locale/en_US";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={en_US} theme={ThemeConfig.light}>
        <RouterProvider router={AppRouter} />
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
