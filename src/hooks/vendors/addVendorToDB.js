import { useForm, Controller } from "react-hook-form";
// import { addProductToDBServices } from "../../services/products/addProductService";
// import { useProductsContext } from "../../context/productContext";
import { useVendorContext } from "../../context/vendorContext";
import { addVendorToDBServices } from "../../services/vendors/addVendorService";
// import { runHook } from "../plugins/registry";

export const addVendorToDB = () => {
  const { addVendor } = useVendorContext();
  const methods = useForm({ mode: "onSubmit" });

  const onSubmit = async (data) => {
    // const modifiedData = await runHook("onBeforeProductAdd", data);
    const { data: result, error } = await addVendorToDBServices(data);
    // if (result?.success) methods.reset();
    // await runHook("onAfterProductAdd", result);
    if (!error) {
      addVendor(result.vendor);
    }
    return { result, error };
  };

  return {
    ...methods,
    Controller,
    onSubmit,
  };
};
