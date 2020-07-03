import { useSetRecoilState } from "recoil";
import { useAuth0 } from "../auth/auth0-spa";
import { useState } from "react";
import { errors, notification } from "../state/atoms";

export const useApi = ({ invoke, success, notifyMessage }) => {
  const [loading, setLoading] = useState(true);
  const setError = useSetRecoilState(errors);
  const setNotification = useSetRecoilState(notification);
  const { getTokenSilently } = useAuth0();

    const action = async () => {
      try {
        const token = await getTokenSilently();
        const data = await invoke(token);
        success(data);
        setNotification(notifyMessage);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };


  return { loading, action };
};
