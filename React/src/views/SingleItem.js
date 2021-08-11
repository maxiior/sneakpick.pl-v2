import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "axios/axios";

const SingleItem = () => {
  const { slug } = useParams();
  const [data, setData] = useState({ product: [] });

  useEffect(() => {
    axiosInstance.get(slug).then((res) => {
      setData({ product: res.data });
      console.log(res.data);
    });
  }, []);

  return <div></div>;
};

export default SingleItem;
