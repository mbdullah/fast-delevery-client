import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const generateTrackingID = () => {
  const now = new Date();
  const datePart = now.toISOString().split("T")[0].replace(/-/g, "");
  const timePart = now.getTime().toString().slice(-5);
  const letters = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `PCL-${letters}-${datePart}-${timePart}`;
};

const SendParcel = () => {
  // --- State for region data loaded from public/service-center.json ---
  const [regionData, setRegionData] = useState([]);

  // --- Sender and receiver selected region for filtering service centers ---
  const [senderRegion, setSenderRegion] = useState("");
  const [receiverRegion, setReceiverRegion] = useState("");

  // --- React Hook Form setup ---
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  // Watch parcel type to conditionally require weight
  const parcelType = watch("parcelType");

  useEffect(() => {
    fetch("/service-center.json")
      .then((res) => res.json())
      .then((data) => setRegionData(data))
      .catch((err) => console.error("Error loading service-center data:", err));
  }, []);

  // Extract unique regions from regionData for selects
  const uniqueRegions = Array.from(
    new Set(regionData.map((item) => item.region))
  );

  // Filter service centers by selected region
  const senderServiceCenters = regionData.filter(
    (item) => item.region === senderRegion
  );
  const receiverServiceCenters = regionData.filter(
    (item) => item.region === receiverRegion
  );

  const onSubmit = (data) => {
    const { parcelType, weight, senderServiceCenter, receiverServiceCenter } =
      data;

    const isWithinCity = senderServiceCenter === receiverServiceCenter;
    const parsedWeight = parseFloat(weight);
    let baseCost = 0;
    let extraWeightCost = 0;
    let outsideExtraCharge = 0;

    if (parcelType === "document") {
      baseCost = isWithinCity ? 60 : 80;
    } else if (parcelType === "non-document") {
      if (parsedWeight <= 3) {
        baseCost = isWithinCity ? 110 : 150;
      } else {
        const extraKg = parsedWeight - 3;
        extraWeightCost = extraKg * 40;
        if (!isWithinCity) {
          outsideExtraCharge = 40;
        }
        baseCost = isWithinCity
          ? 110 + extraWeightCost
          : 150 + extraWeightCost + outsideExtraCharge;
      }
    }

    const breakdownHTML = `
    <div style="text-align: left; font-size: 16px;">
      <p><strong>Parcel Type:</strong> ${parcelType}</p>
      <p><strong>Within City:</strong> ${isWithinCity ? "Yes" : "No"}</p>
      <p><strong>Base Price:</strong> ৳${
        parcelType === "document"
          ? isWithinCity
            ? 60
            : 80
          : isWithinCity
          ? 110
          : 150
      }</p>
      ${
        parcelType === "non-document" && parsedWeight > 3
          ? `<p><strong>Extra Weight Charge:</strong> ৳${extraWeightCost}</p>`
          : ""
      }
      ${
        !isWithinCity && parcelType === "non-document" && parsedWeight > 3
          ? `<p><strong>Outside City Extra Charge:</strong> ৳${outsideExtraCharge}</p>`
          : ""
      }
      <hr style="margin: 10px 0;" />
      <p style="font-size: 18px;"><strong>Total Cost: <span style="color: green;">৳${baseCost}</span></strong></p>
    </div>
  `;

    const totalCost = baseCost + extraWeightCost;

    Swal.fire({
      title: "Confirm Pricing Breakdown",
      html: breakdownHTML,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "💳 Proceed to Payment",
      cancelButtonText: "✏️ Edit Info",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...data,
          cost: totalCost,
          created_by: user.email,
          delivery_status: "not_collected",
          payment_status: "unpaid",
          creation_date: new Date().toISOString(),
          tracking_id: generateTrackingID(),
        };
        console.log("Parcel Final Submitted Data:", parcelData);

        // send data to db
        axiosSecure.post("/parcels", parcelData).then((res) => {
          if (res?.data?.insertedId) {
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel booking confirm.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  return (
    <div className="w-full mx-auto bg-gray-50 p-5 sm:p-8 md:p-12 lg:p-18 xl:p-24 my-10 rounded-3xl">
      <h1 className="text-3xl lg:text-5xl font-extrabold text-secondary mb-2">
        Add Parcel
      </h1>
      {/* divider */}
      <div className="divider"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Parcel Info */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-secondary">
            Enter your parcel details
          </h2>

          {/* Parcel Type as radio buttons */}
          <div className="mb-4">
            <label className="mr-4">
              <input
                type="radio"
                value="document"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
                className="mr-1"
              />
              Document
            </label>
            <label>
              <input
                type="radio"
                value="non-document"
                {...register("parcelType", {
                  required: "Parcel type is required",
                })}
                className="mr-1"
              />
              Non-Document
            </label>
            {errors.parcelType && (
              <p className="text-red-600 text-sm mt-1">
                {errors.parcelType.message}
              </p>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-0 lg:gap-6">
            {/* Title */}
            <div className="mb-4 w-full">
              <label className="block font-medium mb-1" htmlFor="title">
                Parcel Name
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter parcel title"
                {...register("title", { required: "Title is required" })}
                className="input input-bordered w-full"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>
            {/* Weight (only required if non-document) */}
            <div className="mb-4 w-full">
              <label className="block font-medium mb-1" htmlFor="weight">
                Parcel Weight (kg)
              </label>
              <input
                id="weight"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter weight if non-document"
                {...register("weight", {
                  required:
                    parcelType === "non-document"
                      ? "Weight is required for non-document parcels"
                      : false,
                  min: {
                    value: 0,
                    message: "Weight cannot be negative",
                  },
                })}
                className="input input-bordered w-full"
                disabled={parcelType === "document"}
              />
              {errors.weight && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.weight.message}
                </p>
              )}
            </div>
          </div>
        </section>
        {/* divider */}
        <div className="divider"></div>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-10">
          {/* Sender Info */}
          <section className="w-full">
            <h2 className="text-lg font-extrabold mb-4 text-secondary">
              Sender Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block font-medium mb-1" htmlFor="senderName">
                  Sender Name
                </label>
                <input
                  id="senderName"
                  type="text"
                  placeholder="Sender Name"
                  {...register("senderName", {
                    required: "Sender name is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.senderName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="senderContact"
                >
                  Sender Contact No
                </label>
                <input
                  id="senderContact"
                  type="tel"
                  placeholder="Sender Contact No"
                  {...register("senderContact", {
                    required: "Sender contact is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.senderContact && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>

              {/* Region */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="senderRegion"
                >
                  Your Region
                </label>
                <select
                  id="senderRegion"
                  {...register("senderRegion", {
                    required: "Sender region is required",
                    onChange: (e) => setSenderRegion(e.target.value),
                  })}
                  className="select select-bordered w-full"
                  value={senderRegion}
                  onChange={(e) => {
                    setSenderRegion(e.target.value);
                  }}
                >
                  <option value="">Select Your Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.senderRegion.message}
                  </p>
                )}
              </div>

              {/* Service Center (District) */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="senderServiceCenter"
                >
                  Sender Pickup Wire house
                </label>
                <select
                  id="senderServiceCenter"
                  {...register("senderServiceCenter", {
                    required: "Sender service center is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Wire house</option>
                  {senderServiceCenters.map((center) => (
                    <option key={center.city} value={center.city}>
                      {center.city}
                    </option>
                  ))}
                </select>
                {errors.senderServiceCenter && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.senderServiceCenter.message}
                  </p>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="mt-6">
              <label className="block font-medium mb-1" htmlFor="senderAddress">
                Address
              </label>
              <input
                id="senderAddress"
                type="text"
                placeholder="Sender Address"
                {...register("senderAddress", {
                  required: "Sender address is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.senderAddress && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.senderAddress.message}
                </p>
              )}
            </div>

            {/* Pick Up Instruction */}
            <div className="mt-6">
              <label
                className="block font-medium mb-1"
                htmlFor="pickupInstruction"
              >
                Pick Up Instruction
              </label>
              <textarea
                id="pickupInstruction"
                placeholder="Pick Up Instruction"
                rows={3}
                {...register("pickupInstruction", {
                  required: "Pick up instruction is required",
                })}
                className="textarea textarea-bordered w-full"
              />
              {errors.pickupInstruction && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.pickupInstruction.message}
                </p>
              )}
            </div>
          </section>

          {/* Receiver Info */}
          <section className="w-full">
            <h2 className="text-lg font-extrabold mb-4 text-secondary">
              Receiver Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="receiverName"
                >
                  Receiver Name
                </label>
                <input
                  id="receiverName"
                  type="text"
                  placeholder="Receiver Name"
                  {...register("receiverName", {
                    required: "Receiver name is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.receiverName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="receiverContact"
                >
                  Receiver Contact No
                </label>
                <input
                  id="receiverContact"
                  type="tel"
                  placeholder="Receiver Contact No"
                  {...register("receiverContact", {
                    required: "Receiver contact is required",
                  })}
                  className="input input-bordered w-full"
                />
                {errors.receiverContact && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>

              {/* Region */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="receiverRegion"
                >
                  Receiver Region
                </label>
                <select
                  id="receiverRegion"
                  {...register("receiverRegion", {
                    required: "Receiver region is required",
                    onChange: (e) => setReceiverRegion(e.target.value),
                  })}
                  className="select select-bordered w-full"
                  value={receiverRegion}
                  onChange={(e) => {
                    setReceiverRegion(e.target.value);
                  }}
                >
                  <option value="">Select Your Region</option>
                  {uniqueRegions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.receiverRegion.message}
                  </p>
                )}
              </div>

              {/* Service Center (District) */}
              <div>
                <label
                  className="block font-medium mb-1"
                  htmlFor="receiverServiceCenter"
                >
                  Receiver Delivery Wire house
                </label>
                <select
                  id="receiverServiceCenter"
                  {...register("receiverServiceCenter", {
                    required: "Receiver service center is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Wire house</option>
                  {receiverServiceCenters.map((center) => (
                    <option key={center.city} value={center.city}>
                      {center.city}
                    </option>
                  ))}
                </select>
                {errors.receiverServiceCenter && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.receiverServiceCenter.message}
                  </p>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="mt-6">
              <label
                className="block font-medium mb-1"
                htmlFor="receiverAddress"
              >
                Address
              </label>
              <input
                id="receiverAddress"
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", {
                  required: "Receiver address is required",
                })}
                className="input input-bordered w-full"
              />
              {errors.receiverAddress && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.receiverAddress.message}
                </p>
              )}
            </div>

            {/* Delivery Instruction */}
            <div className="mt-6">
              <label
                className="block font-medium mb-1"
                htmlFor="deliveryInstruction"
              >
                Delivery Instruction
              </label>
              <textarea
                id="deliveryInstruction"
                placeholder="Delivery Instruction"
                rows={3}
                {...register("deliveryInstruction", {
                  required: "Delivery instruction is required",
                })}
                className="textarea textarea-bordered w-full"
              />
              {errors.deliveryInstruction && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.deliveryInstruction.message}
                </p>
              )}
            </div>
          </section>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black text-lg font-semibold mt-4 lg:px-10"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
