import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { getProducts } from "@/redux/product/productSlice";

export default function Home () {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []) 
  
  return (
    <div className="max-w-7xl m-auto ">
      {products && products.map((product) => (
        <div key={product._id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
