import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path: any) => () => navigate(path);

  return { goTo };
};
