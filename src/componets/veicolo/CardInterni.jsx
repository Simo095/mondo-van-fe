import "../../assets/style/card-interni.css";
const CardInterni = ({ vehicle }) => {
  return (
    <div className="cardInterni">
      <div className="d-flex flex-column">
        <span>Cucina</span>
        <div className="overflow-y-scroll oV">
          <h6>Cucina: {vehicle.vehiclesArrangement.kitchen ? "Si" : "No"}</h6>
          <h6>Frigo: {vehicle.vehiclesArrangement.fridge ? "Si" : "No"}</h6>
          <h6>Gas: {vehicle.vehiclesArrangement.gas ? "Si" : "No"}</h6>
          <p style={{ width: "200px" }}>{vehicle.vehiclesArrangement.descriptionKitchen}</p>
        </div>
      </div>
      <div>
        <div className="d-flex flex-column">
          <span>Bagno</span>
          <div className="overflow-y-scroll oV">
            <h6>Bagno: {vehicle.vehiclesArrangement.bathroom ? "Si" : "No"}</h6>
            <h6>Acqua potabile: {vehicle.vehiclesArrangement.water ? "Si" : "No"}</h6>
            <h6>Acqua Calda: {vehicle.vehiclesArrangement.hotWater ? "Si" : "No"}</h6>
            <h6>WC: {vehicle.vehiclesArrangement.wc ? "Si" : "No"}</h6>
            <p style={{ width: "200px" }}>{vehicle.vehiclesArrangement.descriptionBathroom}</p>
          </div>
        </div>
      </div>
      <div>
        <div className="d-flex flex-column">
          <span>Accessori</span>
          <div className="overflow-y-scroll oV">
            <p style={{ width: "200px" }}>{vehicle.vehiclesArrangement.accessoriesDescription}</p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="d-flex flex-column overflow-y-scroll">
          <span>Letti</span>
          <div className="overflow-y-scroll oV">
            <p style={{ width: "200px" }}>
              Posti letto: {vehicle.vehiclesArrangement.bads}
              <br></br>
              <br></br>
              {vehicle.vehiclesArrangement.descriptionBeds}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardInterni;
