import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = async (companyId) => {
    const dispatch = useDispatch();
    useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v2/company/get/${companyId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId , dispatch]);
};

export default useGetCompanyById;
