"use client";

import { createFullFlowOrderService } from "../../services/shiprocket/fullFowOrderServices";
import { retryFullFlowOrderService } from "../../services/shiprocket/retryFlowServices";

// import { updateOrderServices } from "../../services/orders/updateOrderServices";
// import { assignAWBServices } from "../../services/shiprocket/assignAWBServices";
// import { assignPickupServices } from "../../services/shiprocket/assignPickupServices";
// import { createOrderServices } from "../../services/shiprocket/createOrderServices";

// const SHIPROCKET_STATUS_MAP = {
//   1: "New",
//   2: "In Progress",
//   3: "Shipped",
//   4: "Out for Delivery",
//   5: "Delivered",
//   6: "RTO Initiated",
//   7: "Returned",
//   8: "Cancelled",
// };
export const useShiprocketActions = () => {
  // const { user } = useUserContext();
  const createOrder = async ({ data, pickup_date }) => {
    const { data: result, error } = await createFullFlowOrderService({
      data,
      pickup_date,
    });
    // console.log(result, error);

    if (error) {
      throw new Error(error);
    }

    return {
      data: result,
      success: true,
    };
  };
  const retryOrder = async ({ order_id, courier_id, pickup_date }) => {
    const { data: result, error } = await retryFullFlowOrderService({
      order_id,
      courier_id,
      pickup_date,
    });
    // console.log(result, error);

    if (error) {
      throw new Error(error);
    }

    return {
      data: result,
      success: true,
    };
  };

  //   const createOrder = async ({ data, pickup_date }) => {
  //     // console.log("in");
  //     // console.log(data);

  //     // console.log(user);
  //     const { data: da, error } = await createOrderServices({
  //       data,
  //     });
  //     if (error) {
  //       throw new Error(error || "Failed to create shiprocket order");
  //     }
  //     const { error: updateError } = await updateOrderServices({
  //       order_id: data.order_id,
  //       updated_data: {
  //         shipment_order_id: da.order_id,
  //         shipment_id: da.shipment_id,
  //         // courier_company_id: data.courier_company_id,
  //       },
  //     });

  //     if (updateError) {
  //       throw new Error(updateError || "Failed to update order");
  //     }
  //     let shipmentId = da.shipment_id;
  //     let orderId = da.order_id;
  //     let awbCode = da.awb_code || null;
  //     let shippingStatusCode = da.status_code || 1;
  //     let shippingStatus = SHIPROCKET_STATUS_MAP[shippingStatusCode];

  //     // Step 2: If awb_code is null, call assignAWBServices
  //     if (!awbCode) {
  //       const { data: assignData, error: assignError } = await assignAWBServices({
  //         shipment_id: shipmentId,
  //         courier_id: data.courier_company_id,
  //       });

  //       if (assignError) {
  //         throw new Error(assignError || "Failed to assign AWB");
  //       }

  //       awbCode = assignData?.data?.awb_code || null;
  //       shippingStatusCode = assignData?.data?.status_code || shippingStatusCode;
  //       shippingStatus = SHIPROCKET_STATUS_MAP[shippingStatusCode];
  //     }
  //     const { data: updatedData, error: updateawberror } =
  //       await updateOrderServices({
  //         order_id: data.order_id,
  //         updated_data: {
  //           awb_code: awbCode,
  //           shipping_status: shippingStatus,
  //         },
  //       });
  //     // console.log(updateError);

  //     if (updateawberror) {
  //       throw new Error(updateawberror || "Failed to update order");
  //     }
  //     if (pickup_date) {
  //       const { data: pickupData, error: pickupError } =
  //         await assignPickupServices({
  //           shipment_id: shipmentId,
  //           pickup_date,
  //         });

  //       if (pickupError) {
  //         throw new Error(pickupError || "Pickup assignment failed");
  //         // console.warn("Pickup assignment failed:", pickupError);
  //       }
  //     }
  //     // if (updatedData.success) {
  //     // }
  //     return {
  //       data: {
  //         shiprocket: {
  //           ...da,
  //           awb_code: awbCode,
  //           status: shippingStatus,
  //           status_code: shippingStatusCode,
  //           pickupData: pickupData || null,
  //         },
  //         order_data: updatedData,
  //       },
  //       success: true,
  //     };
  //   };

  return {
    createOrder,
    retryOrder,
  };
};
