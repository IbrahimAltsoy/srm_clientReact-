import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = "https://localhost:8080/api/Customers";

interface Customer {
  id: number;
  identityNumber: string;
  companyName: string;
}

const ShowForm = ({ customer }: { customer?: Customer }) => {
  const [id, setId] = useState<number | null>(null);
  const [identityNumber, setIdentityNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (customer) {
      setId(customer.id);
      setIdentityNumber(customer.identityNumber);
      setCompanyName(customer.companyName);
    }
  }, [customer]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id && id > 0) {
      axios
        .put(`${apiUrl}`, {
          id: id,
          identityNumber: identityNumber,
          companyName: companyName,
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
          identityNumber: identityNumber,
          companyName: companyName,
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
        <input type="hidden" value={customer?.id} />{" "}
        {/* Müşteri ID'sini hidden input ile gönderiyoruz */}
        <div className="row">
          <div className="col-md-4">
            <label>Identity No</label>
            <input
              type="text"
              className="form-control"
              placeholder="Identity Number"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Şirket Adı</label>
            <input
              type="text"
              className="form-control"
              placeholder="Şirket Adı"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
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

const Customers = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >(undefined);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?page=${currentPage}&pageSize=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [currentPage]);

  // const handlePageChange = (pageNumber: number) => {
  //   setCurrentPage(pageNumber);
  // };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteCustomer = (customerId: number) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu müşteriyi silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Sil",
      cancelButtonText: "İptal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/${customerId}`)
          .then((response) => {
            Swal.fire({
              title: "Silindi!",
              text: "Müşteri başarıyla silindi.",
              icon: "success",
            });
            // Silinen müşteriyi listeden kaldırma
            setCustomers(
              customers.filter((customer) => customer.id !== customerId)
            );
          })
          .catch((error) => {
            Swal.fire({
              title: "Hata!",
              text: "Müşteri silinirken bir hata oluştu.",
              icon: "error",
            });
            console.error("Silme işlemi başarısız:", error);
          });
      }
    });
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?page=${currentPage}&pageSize=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch customers");
        }
        const data = await response.json();
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [currentPage, showForm]); // showForm değiştiğinde de verileri güncelle

  return (
    <div>
      <div className="form-group float-left">
        <button
          className="btn btn-outline-success"
          title="Müşteri Ekle"
          onClick={() => {
            setSelectedCustomer(undefined);
            setShowForm(!showForm);
          }}
        >
          <i className="fa fa-plus" />
        </button>
      </div>
      <div className="form-group float-right col-md-3">
        <input
          type="search"
          placeholder="Şirket ara"
          className="form-control"
        />
      </div>
      {showForm && <ShowForm customer={selectedCustomer} />}
      <div className="form-group">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Idenetity No</th>
              <th>Şirket Adı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * 5 + index + 1}</td>
                <td>{customer.identityNumber}</td>
                <td>{customer.companyName}</td>
                <td>
                  <div>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      title="Güncelle"
                      onClick={() => handleEditCustomer(customer)}
                    >
                      <i className="fa fa-edit" />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm mx-3"
                      title="Sil"
                      onClick={() => handleDeleteCustomer(customer.id)}
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

export default Customers;
