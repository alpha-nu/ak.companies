import { useSetRecoilState } from "recoil";
import { useAuth0 } from "../auth/auth0-spa";
import { useState } from "react";
import { errors, notification } from "../state/atoms";

export const useApi = ({ invoke, success, notifyMessage }) => {
  const [loading, setLoading] = useState(false);
  const setError = useSetRecoilState(errors);
  const setNotification = useSetRecoilState(notification);
  const { getTokenSilently } = useAuth0();

  const action = async () => {
    try {
      setLoading(true);
      const token = await getTokenSilently();
      const data = await invoke(token);

      if (success) success(data);

      setNotification(notifyMessage);
    } catch (e) {
      if (e.response.data.errors) {
        setError(e.response.data.errors);
      } else {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, action };
};
