import { FaRegPenToSquare } from "react-icons/fa6";
import "../../assets/style/card-interni.css";
import cucina from "../../assets/img/cucinaVan.avif";
import letti from "../../assets/img/letti.avif";
import accessori from "../../assets/img/accessori.avif";
import wc from "../../assets/img/wc.avif";
const CardInterni = ({ vehicle }) => {
  return (
    <div className="cardInterni">
      <div
        className="d-flex flex-column position-relative "
        style={{
          backgroundImage: `url(${cucina})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}>
        <span
          className="text-white rounded"
          style={{ backgroundColor: "#00000050" }}>
          {/* <FaRegPenToSquare
            className="m-0"
            style={{
              cursor: "pointer",
              fontSize: "1.3em",
              position: "relative",
              left: "135px"
            }}
          /> */}
          Cucina
        </span>
        <div
          className="overflow-y-scroll oV rounded text-center text-white"
          style={{ backgroundColor: "#00000099", fontWeight: "bold" }}>
          <p>Cucina: {vehicle.vehiclesArrangement.kitchen ? "E` presente" : "Non è presente"}</p>
          <p>Frigo: {vehicle.vehiclesArrangement.fridge ? "E` presente" : "Non è presente"}</p>
          <p>Gas: {vehicle.vehiclesArrangement.gas ? "E` presente" : "Non è presente"}</p>
          <p style={{ width: "200px" }}>{vehicle.vehiclesArrangement.descriptionKitchen}</p>
        </div>
      </div>
      <div>
        <div
          className="d-flex flex-column position-relative"
          style={{
            backgroundImage: `url(${wc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          <span
            className="text-white rounded"
            style={{ backgroundColor: "#00000050" }}>
            {/* <FaRegPenToSquare
              className="m-0"
              style={{
                cursor: "pointer",
                fontSize: "1.3em",
                position: "relative",
                left: "135px"
              }}
            /> */}
            Bagno
          </span>
          <div
            className="overflow-y-scroll oV rounded text-center text-white"
            style={{ backgroundColor: "#00000099", fontWeight: "bold" }}>
            <p>Bagno: {vehicle.vehiclesArrangement.bathroom ? "E` presente" : "Non è presente"}</p>
            <p>Acqua potabile: {vehicle.vehiclesArrangement.water ? "E` presente" : "Non è presente"}</p>
            <p>Acqua Calda: {vehicle.vehiclesArrangement.hotWater ? "E` presente" : "Non è presente"}</p>
            <p>WC: {vehicle.vehiclesArrangement.wc ? "E` presente" : "Non è presente"}</p>
            <p style={{ width: "200px" }}>{vehicle.vehiclesArrangement.descriptionBathroom}</p>
          </div>
        </div>
      </div>
      <div>
        <div
          className="d-flex flex-column position-relative"
          style={{
            backgroundImage: `url(${accessori})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          <span
            className="text-white rounded"
            style={{ backgroundColor: "#00000050" }}>
            {/* <FaRegPenToSquare
              className="m-0"
              style={{
                cursor: "pointer",
                fontSize: "1.3em",
                position: "relative",
                left: "135px"
              }}
            /> */}
            Accessori
          </span>
          <div className="overflow-y-scroll oV">
            <p
              className="rounded text-center text-white"
              style={{ width: "200px", backgroundColor: "#00000099", fontWeight: "bold" }}>
              {vehicle.vehiclesArrangement.accessoriesDescription}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div
          className="d-flex flex-column overflow-y-scroll"
          style={{
            backgroundImage: `url(${letti})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}>
          <span
            className="text-white rounded"
            style={{ backgroundColor: "#00000050" }}>
            {/* <FaRegPenToSquare
              className="m-0"
              style={{
                cursor: "pointer",
                fontSize: "1.3em",
                position: "relative",
                left: "135px"
              }}
            /> */}
            Letti
          </span>
          <div className="overflow-y-scroll oV">
            <p
              className="rounded text-center text-white"
              style={{ width: "200px", backgroundColor: "#00000099", fontWeight: "bold" }}>
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
