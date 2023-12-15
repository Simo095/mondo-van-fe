export const fetchProvince = setProvinces => {
  return async dispatch => {
    try {
      const risposta = await fetch("http://localhost:8080/sign_in/prov", {
        method: "GET"
      });
      if (risposta.ok) {
        const data = await risposta.json();
        setProvinces(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchTown = (province, setTowns) => {
  return async dispatch => {
    try {
      const risposta = await fetch("http://localhost:8080/sign_in/towns/" + province, {
        method: "GET"
      });
      if (risposta.ok) {
        const data = await risposta.json();
        console.log(data.content);
        setTowns(data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
