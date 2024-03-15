import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import API_URL from "../../../config";
import ShowForm from "./ShowForm.tsx";

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

const Requests = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<Request | undefined>(
    undefined
  );

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${apiUrl}?page=${currentPage}&pageSize=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch requests");
      }
      const data = await response.json();
      setRequests(data.requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [currentPage, showForm]);
  const handleChangeStatus = async (request: Request) => {
    try {
      await axios.put(`${apiUrl}/request-status`, request);
      fetchRequests();
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleEditRequest = (request: Request) => {
    setSelectedRequest(request);
    setShowForm(true);
  };

  const handleDeleteRequest = (requestId: number) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu isteği silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Sil",
      cancelButtonText: "İptal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/${requestId}`)
          .then((response) => {
            Swal.fire({
              title: "Silindi!",
              text: "İstek başarıyla silindi.",
              icon: "success",
            });
            setRequests(requests.filter((request) => request.id !== requestId));
          })
          .catch((error) => {
            Swal.fire({
              title: "Hata!",
              text: "İstek silinirken bir hata oluştu.",
              icon: "error",
            });
            console.error("Silme işlemi başarısız:", error);
          });
      }
    });
  };

  return (
    <div>
      <div className="form-group float-left">
        <button
          className="btn btn-outline-success"
          title="İstek Ekle"
          onClick={() => {
            setSelectedRequest(undefined);
            setShowForm(!showForm);
          }}
        >
          <i className="fa fa-plus" />
        </button>
      </div>
      <div className="form-group float-right col-md-3">
        <input type="search" placeholder="İstek ara" className="form-control" />
      </div>
      {showForm && <ShowForm request={selectedRequest} />}
      <div className="form-group">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Açıklama</th>
              <th>İstek Durumu</th>
              <th>Müsteri Temsilcisi</th>
              <th>Müsteri</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * 5 + index + 1}</td>
                <td>
                  <button
                    className={
                      request.requestStatusId === 1
                        ? "btn btn-success btn-sm"
                        : "btn btn-warning btn-sm"
                    }
                    onClick={() => handleChangeStatus(request)}
                    style={{ borderRadius: "30%" }}
                    title="Değiştir"
                  >
                    {request.requestStatusId === 1 ? "True" : "False"}
                  </button>
                </td>
                <td>
                  {request.description.length > 20
                    ? request.description.slice(0, 20) + "..."
                    : request.description}
                </td>
                <td>{request.employeeName}</td>
                <td>{request.customerName}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      title="Güncelle"
                      onClick={() => handleEditRequest(request)}
                    >
                      <i className="fa fa-edit" />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm mx-3"
                      title="Sil"
                      onClick={() => handleDeleteRequest(request.id)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        {[...Array(10)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)}>Sonraki</button>
      </div>
    </div>
  );
};

export default Requests;
