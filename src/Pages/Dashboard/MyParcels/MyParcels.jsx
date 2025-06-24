import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaMoneyBill, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/parcels?email=${user.email}`);
      return data;
    },
  });

  console.log(parcels);

  const handleView = (parcel) => {
    alert(`Tracking ID: ${parcel.tracking_id}\nTitle: ${parcel.title}`);
  };

  const handlePay = (parcel) => {
    // Replace this with real payment logic
    alert(`Paying ৳${parcel.cost} for ${parcel.title}`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data?.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });
            
          }
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 My Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full text-sm md:text-base">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost (৳)</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td className="capitalize">{parcel.parcelType}</td>
                <td>{new Date(parcel.creation_date).toLocaleString()}</td>
                <td>৳{parcel.cost}</td>
                <td>
                  <span
                    className={`badge px-4 py-1 font-semibold text-white ${
                      parcel.payment_status === "paid"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {parcel.payment_status}
                  </span>
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info text-white"
                    onClick={() => handleView(parcel)}
                  >
                    <FaEye />
                  </button>
                  <button
                    className="btn btn-sm btn-success text-white"
                    disabled={parcel.payment_status === "paid"}
                    onClick={() => handlePay(parcel)}
                  >
                    <FaMoneyBill />
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(parcel._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
