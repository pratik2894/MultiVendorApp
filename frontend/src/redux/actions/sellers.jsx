import axios from 'axios';
import { server } from '../../server';
import Cookies from 'js-cookie';

export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllSellersRequest',
    });

    const token = Cookies.get('token');
    const { data } = await axios.get(`${server}/shop/admin-all-sellers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: 'getAllSellersSuccess',
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: 'getAllSellerFailed',
      //   payload: error.response.data.message,
    });
  }
};
