import { addBeds, addProvince, addResult } from ".";

export const fetchResultDate = (startForm, endForm, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(`http://localhost:8080/results/date?start=${startForm}&end=${endForm}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndSupply = (startForm, endForm, supply, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_supply?start=${startForm}&end=${endForm}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndSupplyAndType = (startForm, endForm, supply, type, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_supply_type?start=${startForm}&end=${endForm}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndType = (startForm, endForm, type, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_type?start=${startForm}&end=${endForm}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndPrice = (startForm, endForm, prezzo, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_price?start=${startForm}&end=${endForm}&price=${prezzo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        dispatch(addProvince("Tutte le province"));
        dispatch(addBeds(null));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndSupply = (startForm, endForm, prezzo, supply, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_price_supply?start=${startForm}&end=${endForm}&price=${prezzo}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        dispatch(addProvince("Tutte le province"));
        dispatch(addBeds(null));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndType = (startForm, endForm, prezzo, type, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_price_type?start=${startForm}&end=${endForm}&price=${prezzo}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        dispatch(addProvince("Tutte le province"));
        dispatch(addBeds(null));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndSupplyAndType = (
  startForm,
  endForm,
  prezzo,
  type,
  supply,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_price_supply_type?start=${startForm}&end=${endForm}&price=${prezzo}&type=${type}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        dispatch(addProvince("Tutte le province"));
        dispatch(addBeds(null));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndPriceAndBedsAndProvince = (
  startForm,
  endForm,
  prezzo,
  province,
  newBeds,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_beds_price?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}&price=${prezzo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndBedsAndProvinceAndSupply = (
  startForm,
  endForm,
  prezzo,
  province,
  newBeds,
  supply,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price_supply_prov?start=${startForm}&end=${endForm}&beds=${newBeds}&prov=${province}&price=${prezzo}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndBedsAndProvinceAndType = (
  startForm,
  endForm,
  prezzo,
  province,
  newBeds,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price_type_prov?start=${startForm}&end=${endForm}&beds=${newBeds}&prov=${province}&price=${prezzo}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndBedsAndProvinceAndSupplyAndType = (
  startForm,
  endForm,
  prezzo,
  province,
  newBeds,
  supply,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price_supply_type_prov?start=${startForm}&end=${endForm}&beds=${newBeds}&prov=${province}&price=${prezzo}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndPriceAndProvince = (startForm, endForm, prezzo, province, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_province_price?start=${startForm}&end=${endForm}&province=${province}&price=${prezzo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndProvinceAndSupply = (
  startForm,
  endForm,
  prezzo,
  province,
  supply,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_price_supply?start=${startForm}&end=${endForm}&province=${province}&price=${prezzo}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndProvinceAndType = (
  startForm,
  endForm,
  prezzo,
  province,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_price_type?start=${startForm}&end=${endForm}&province=${province}&price=${prezzo}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndProvinceAndSupplyAndType = (
  startForm,
  endForm,
  prezzo,
  province,
  supply,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_price_supply?start=${startForm}&end=${endForm}&province=${province}&price=${prezzo}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndPriceAndBeds = (startForm, endForm, prezzo, newBeds, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price?start=${startForm}&end=${endForm}&beds=${newBeds}&price=${prezzo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndBedsAndSupply = (
  startForm,
  endForm,
  prezzo,
  newBeds,
  supply,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price_supply?start=${startForm}&end=${endForm}&beds=${newBeds}&price=${prezzo}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndBedsAndType = (
  startForm,
  endForm,
  prezzo,
  newBeds,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price_type?start=${startForm}&end=${endForm}&beds=${newBeds}&price=${prezzo}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndPriceAndBedsAndSupplyAndType = (
  startForm,
  endForm,
  prezzo,
  newBeds,
  supply,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_price_supply_type?start=${startForm}&end=${endForm}&beds=${newBeds}&price=${prezzo}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndProvinceAndBeds = (startForm, endForm, newBeds, province, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_beds?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndProvinceAndBedsAndSupply = (
  startForm,
  endForm,
  newBeds,
  province,
  supply,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_beds_supply?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndProvinceAndBedsAndType = (
  startForm,
  endForm,
  newBeds,
  province,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_beds_type?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndProvinceAndBedsAndSupplyAndType = (
  startForm,
  endForm,
  newBeds,
  province,
  supply,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_beds_supply_type?start=${startForm}&end=${endForm}&beds=${newBeds}&province=${province}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndProvince = (startForm, endForm, province, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_province?start=${startForm}&end=${endForm}&province=${province}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndProvinceAndSupply = (
  startForm,
  endForm,
  province,
  supply,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_supply?start=${startForm}&end=${endForm}&prov=${province}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndProvinceAndType = (startForm, endForm, province, type, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_type?start=${startForm}&end=${endForm}&prov=${province}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndProvinceAndSupplyAndType = (
  startForm,
  endForm,
  province,
  supply,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_prov_supply_type?start=${startForm}&end=${endForm}&prov=${province}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const fetchResultDateAndBeds = (startForm, endForm, newBeds, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds?start=${startForm}&end=${endForm}&beds=${newBeds}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndBedsAndSupply = (startForm, endForm, newBeds, supply, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_supply?start=${startForm}&end=${endForm}&beds=${newBeds}&supply=${supply}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndBedsAndType = (startForm, endForm, newBeds, type, token, navigate, setError) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_type?start=${startForm}&end=${endForm}&beds=${newBeds}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
export const fetchResultDateAndBedsAndSupplyAndType = (
  startForm,
  endForm,
  newBeds,
  supply,
  type,
  token,
  navigate,
  setError
) => {
  return async dispatch => {
    try {
      const pageble = await fetch(
        `http://localhost:8080/results/date_beds_supply_type?start=${startForm}&end=${endForm}&beds=${newBeds}&supply=${supply}&type=${type}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      if (pageble.status === 401) {
        navigate(`/register`);
      }
      if (pageble.ok) {
        const content = await pageble.json();
        dispatch(addResult(content.content));
        navigate(`/results_page`);
      } else {
        setError(true);
      }
    } catch (error) {
      throw new Error(error);
    }
  };
};
