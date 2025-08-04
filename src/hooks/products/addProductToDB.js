import { useForm, Controller } from "react-hook-form";
import { addProductToDBServices } from "../../services/products/addProductService";
import { useProductsContext } from "../../context/productContext";
// import { runHook } from "../plugins/registry";

export const addProductToDB = () => {
  const { addProduct } = useProductsContext();
  const methods = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    // const modifiedData = await runHook("onBeforeProductAdd", data);
    const { data: result, error } = await addProductToDBServices(data);
    // if (result?.success) methods.reset();
    // await runHook("onAfterProductAdd", result);
    if (!error) {
      addProduct(result.product);
    }
    return { result, error };
  };

  return {
    ...methods,
    Controller,
    onSubmit,
  };
};
