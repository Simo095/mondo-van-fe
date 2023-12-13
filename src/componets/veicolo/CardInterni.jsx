import { useState } from "react";
import "../../assets/style/card-interni.css";
import { Card } from "react-bootstrap";
const CardInterni = ({ vehicle }) => {
  return (
    <>
      <div className="cardInterni">
        <div className="d-flex flex-column">
          <span>Cucina</span>
          <div>
            <h6>Cucina: {vehicle.vehiclesArrangement.kitchen ? "Si" : "No"}</h6>
            <h6>Frigo: {vehicle.vehiclesArrangement.fridge ? "Si" : "No"}</h6>
            <h6>Gas: {vehicle.vehiclesArrangement.gas ? "Si" : "No"}</h6>
            <p color="white">{vehicle.vehiclesArrangement.descriptionKitchen}</p>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column">
            <span>Bagno</span>
            <div>
              <h6>Bagno: {vehicle.vehiclesArrangement.bathroom ? "Si" : "No"}</h6>
              <h6>Acqua potabile: {vehicle.vehiclesArrangement.water ? "Si" : "No"}</h6>
              <h6>Acqua Calda: {vehicle.vehiclesArrangement.hotWater ? "Si" : "No"}</h6>
              <h6>WC: {vehicle.vehiclesArrangement.wc ? "Si" : "No"}</h6>
              <p>{vehicle.vehiclesArrangement.descriptionBathroom}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex flex-column">
            <span>HOVER ME</span>
            <div>
              <h6>Bagno: {vehicle.vehiclesArrangement.bathroom ? "Si" : "No"}</h6>
              <h6>Acqua potabile: {vehicle.vehiclesArrangement.water ? "Si" : "No"}</h6>
              <h6>Acqua Calda: {vehicle.vehiclesArrangement.hotWater ? "Si" : "No"}</h6>
              <h6>WC: {vehicle.vehiclesArrangement.wc ? "Si" : "No"}</h6>
              <p>{vehicle.vehiclesArrangement.descriptionBathroom}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardInterni;
