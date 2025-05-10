import { useEffect, useState } from 'react';
import { getPaymentsReceived, Payment } from '../../services/getPaymentsReceivedService';


const usePaymentReceived = () => {
  const [students, setStudents] = useState<Payment[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error] = useState(null);
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getPaymentsReceived(); 
      setStudents(data); 
    } catch (err) {
      console.error(error); 
    } finally {
      setLoading(false); 
    }
  };

  const refreshPayments = () => {
    fetchData(); 
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  return { students, loading, refreshPayments }; 
};

export default usePaymentReceived;

