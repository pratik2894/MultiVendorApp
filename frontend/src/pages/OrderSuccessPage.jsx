import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import Lottie from 'react-lottie';
import animationData from '../Assests/animations/107043-success.json';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      {/* <Footer /> */}
    </div>
  );
};

const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      alert('Order status can be found on profile page. Thanks!');
      navigate('/');
    }, 2000);
  }, []);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="mt-10">
      <Lottie options={defaultOptions} width={300} height={150} />
      <h5 className="text-center mb-10 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
