import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MENU_ROUTES from "../../../utils/constants/menu.constant";

interface IUseDashboardLayout {
  handleMenuChange: (data: { key: string }) => void;
  findSelectedMenu: () => string[] | undefined;
}

const useDashboardLayout = (): IUseDashboardLayout => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuChange = (data: { key: string }) => {
    navigate(data.key);
  };

  const findSelectedMenu = useCallback(() => {
    const pathName: string = location.pathname;
    const routes = Object.values(MENU_ROUTES);
    let selectedRoute = "";
    for (let i = 0; i < routes.length; i++) {
      if (pathName === "/" || (i !== 0 && pathName.includes(routes[i]))) {
        selectedRoute = routes[i];
        break;
      }
    }
    return [selectedRoute];
  }, [location.pathname]);

  return { handleMenuChange, findSelectedMenu };
};

export default useDashboardLayout;
