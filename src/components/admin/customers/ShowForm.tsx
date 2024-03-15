import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../../config";
const apiUrl = API_URL + "/Customers";

const ShowForm = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  function addCustomer(event) {
    event.preventDefault();

    axios
      .post(apiUrl, {
        identityNumber: identityNumber,
        companyName: companyName,
      })
      .then((response) => {
        console.log("Ekleme işlemi başarılı");
      })
      .catch((error) => {
        console.error("Ekleme işlemi başarısız:", error);
      });
  }

  return (
    <div>
      <form onSubmit={addCustomer}>
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

export default ShowForm;
