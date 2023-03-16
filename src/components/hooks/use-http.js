import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const useHttp = () => {
  const dispatch = useDispatch();

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    dispatch(uiActions.setLoading(true));
    dispatch(uiActions.hideNotification());

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      dispatch(uiActions.setLoading(false));

      return data;
    } catch (err) {
      dispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: err.message || 'Something went wrong!'
      }));
    }
  }, [dispatch]);

  return sendRequest;
};

export default useHttp;