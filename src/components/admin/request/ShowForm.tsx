import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../../../config";
const apiUrl = API_URL + "/Requests";
interface Request {
  id: number;
  customerName: string;
  employeeName: string;
  description: string;
  requestStatusId: number;
  customerUserId: number;
  employeeUserId: number;
}

const ShowForm = ({ request }: { request?: Request }) => {
  const [id, setId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [requestStatusId, setRequestStatusId] = useState<number | undefined>(
    undefined
  );
  const [customerUserId, setCustomerUserId] = useState<number | undefined>(
    undefined
  );
  const [employeeUserId, setEmployeeUserId] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (request) {
      setId(request.id);
      setDescription(request.description);
      setRequestStatusId(request.requestStatusId);
      setCustomerUserId(request.customerUserId);
      setEmployeeUserId(request.employeeUserId);
    }
  }, [request]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id && id > 0) {
      axios
        .put(`${apiUrl}`, {
          id: id,
          customerUserId: customerUserId,
          employeeUserId: employeeUserId,
          requestStatusId: requestStatusId,
          description: description,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Başarılı!",
            text: "Güncelleme işlemi başarıyla tamamlandı.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "Güncelleme işlemi sırasında bir hata oluştu.",
          });
        });
    } else {
      axios
        .post(apiUrl, {
          customerUserId: customerUserId,
          employeeUserId: employeeUserId,
          requestStatusId: requestStatusId,
          description: description,
        })
        .then((response) => {
          Swal.fire({
            icon: "success",
            title: "Başarılı!",
            text: "Ekleme işlemi başarıyla tamamlandı.",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Hata!",
            text: "Ekleme işlemi sırasında bir hata oluştu.",
          });
        });
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="hidden" value={request?.id} />{" "}
        <div className="row">
          <div className="col-md-4">
            <label>Customer User Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Customer User Id"
              value={customerUserId}
              onChange={(e) => setCustomerUserId(Number(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <label>Employee User Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Employee User Id"
              value={employeeUserId}
              onChange={(e) => setEmployeeUserId(Number(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <label>Request Status Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="Request Status Id"
              value={requestStatusId}
              onChange={(e) => setRequestStatusId(Number(e.target.value))}
            />
          </div>
          <div className="col-md-4">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <br />
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShowForm;
