import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const apiUrl = "https://localhost:8080/api/Employies";

interface Employee {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  identityNumber: string;
  genderId: string;
  departmentId: string;
  startDate: string;
  photoPath: string;
}

const ShowForm = ({ employee }: { employee?: Employee }) => {
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [photoPath, setPhotoPath] = useState("");

  useEffect(() => {
    if (employee) {
      setId(employee.id);
      setName(employee.name);
      setSurname(employee.surname);
      setPhone(employee.phone);
      setEmail(employee.email);
      setIdentityNumber(employee.identityNumber);
      setDepartmentId(employee.departmentId);
      setPhotoPath(employee.photoPath);
    }
  }, [employee]);

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (id && id > 0) {
      axios
        .put(`${apiUrl}`, {
          id: id,
          phone: phone,
          email: email,
          departmentId: departmentId,
          photoPath: photoPath,
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
          name: name,
          surname: surname,
          phone: phone,
          email: email,
          identityNumber: identityNumber,
          photoPath: photoPath,
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
        <input type="hidden" value={employee?.id} />{" "}
        {/* Çalışan ID'sini hidden input ile gönderiyoruz */}
        <div className="row">
          <div className="col-md-4">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Surname</label>
            <input
              type="text"
              className="form-control"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Identity Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Identity Number"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label>Photo</label>
            <input
              type="text"
              className="form-control"
              placeholder="Photo Path"
              value={photoPath}
              onChange={(e) => setPhotoPath(e.target.value)}
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

const Employies = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [employies, setEmployies] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<
    Employee | undefined
  >(undefined);

  useEffect(() => {
    const fetchEmployies = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?page=${currentPage}&pageSize=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employies");
        }
        const data = await response.json();
        setEmployies(data.employies);
      } catch (error) {
        console.error("Error fetching employies:", error);
      }
    };

    fetchEmployies();
  }, [currentPage]);

  //   const handlePageChange = (pageNumber: number) => {
  //     setCurrentPage(pageNumber);
  //   };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Bu çalışanı silmek istediğinizden emin misiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, Sil",
      cancelButtonText: "İptal",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${apiUrl}/${employeeId}`)
          .then((response) => {
            Swal.fire({
              title: "Silindi!",
              text: "Çalışan başarıyla silindi.",
              icon: "success",
            });
            // Silinen müşteriyi listeden kaldırma
            setEmployies(
              employies.filter((employee) => employee.id !== employeeId)
            );
          })
          .catch((error) => {
            Swal.fire({
              title: "Hata!",
              text: "Çalışan silinirken bir hata oluştu.",
              icon: "error",
            });
            console.error("Silme işlemi başarısız:", error);
          });
      }
    });
  };
  useEffect(() => {
    const fetchEmpleyies = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?page=${currentPage}&pageSize=5`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch employies");
        }
        const data = await response.json();
        setEmployies(data.employies);
      } catch (error) {
        console.error("Error fetching employies:", error);
      }
    };

    fetchEmpleyies();
  }, [currentPage, showForm]); // showForm değiştiğinde de verileri güncelle

  return (
    <div>
      <div className="form-group float-left">
        <button
          className="btn btn-outline-success"
          title="Çalışan Ekle"
          onClick={() => {
            setSelectedEmployee(undefined);
            setShowForm(!showForm);
          }}
        >
          <i className="fa fa-plus" />
        </button>
      </div>
      <div className="form-group float-right col-md-3">
        <input
          type="search"
          placeholder="Çalışan ara"
          className="form-control"
        />
      </div>
      {showForm && <ShowForm employee={selectedEmployee} />}
      <div className="form-group">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Identity Number</th>
              <th>Photo</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {employies.map((employee, index) => (
              <tr key={index}>
                <td>{(currentPage - 1) * 5 + index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.phone}</td>
                <td>{employee.email.toLowerCase()}</td>
                <td>{employee.identityNumber}</td>
                <td>
                  <img
                    src={employee.photoPath}
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>
                  <div>
                    <button
                      className="btn btn-outline-warning btn-sm"
                      title="Güncelle"
                      onClick={() => handleEditEmployee(employee)}
                    >
                      <i className="fa fa-edit" />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm mx-3"
                      title="Sil"
                      onClick={() => handleDeleteEmployee(employee.id)}
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

export default Employies;
