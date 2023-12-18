import {
  addArrayCalendar,
  addAvailability,
  addAvailabilityId,
  addEventCalendar,
  addFriends,
  addUser,
  addVehicle,
  addVehicleCustomerProfile
} from ".";

export const fetchUser = (token, navigate) => {
  return async dispatch => {
    try {
      const respSucces = await fetch("http://localhost:8080/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (respSucces.ok) {
        const user = await respSucces.json();
        dispatch(addUser(user));
        if (user.role === "CUSTOMER") {
          navigate("/profile_customer");
        }
        if (user.role === "OWNER") {
          dispatch(fetchVehicle(token));
          navigate("/profile_owner");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAddFriend = (token, idFriend) => {
  return async dispatch => {
    try {
      const respSucces = await fetch(`http://localhost:8080/users/${idFriend}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (respSucces.ok) {
        const user = await respSucces.json();
        console.log("meseriome");
        console.log(user);
        dispatch(addFriends(user.friends));
        dispatch(addUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchDeleteFriend = (token, idFriend) => {
  return async dispatch => {
    try {
      const respSucces = await fetch(`http://localhost:8080/users/${idFriend}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (respSucces.ok) {
        const user = await respSucces.json();
        console.log("meseriome");
        console.log(user);
        dispatch(addFriends(user.friends));
        dispatch(addUser(user));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchVehicle = token => {
  return async dispatch => {
    try {
      const objVehicle = await fetch("http://localhost:8080/vehicles/my_vehicle", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (objVehicle.ok) {
        const vehicle = await objVehicle.json();
        dispatch(addVehicle(vehicle));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchVehicleCustomerPage = token => {
  return async dispatch => {
    try {
      const objVehicle = await fetch("http://localhost:8080/vehicles/customer_page", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (objVehicle.ok) {
        const vehicles = await objVehicle.json();
        dispatch(addVehicleCustomerProfile(vehicles.content));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchAnnouncement = (token, announcement) => {
  return async dispatch => {
    try {
      const request = await fetch("http://localhost:8080/vehicles/announcement", {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "application/json"
        },
        body: JSON.stringify({ announcement: announcement })
      });
      if (request.ok) {
        const vehicle = await request.json();
        dispatch(addVehicle(vehicle));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchNotifiche = (token, setNotifiche) => {
  return async dispatch => {
    try {
      const risp = await fetch("http://localhost:8080/notifications", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        const notifiche = await risp.json();
        setNotifiche(notifiche);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCancellaNotifica = (token, setNotifiche, id) => {
  return async dispatch => {
    try {
      const cancella = await fetch(`http://localhost:8080/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (cancella.ok) {
        dispatch(fetchNotifiche(token, setNotifiche));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchReadNotifica = (token, id, handleClose, setNotifiche) => {
  return async dispatch => {
    try {
      handleClose();
      const modifica = await fetch(`http://localhost:8080/notifications/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (modifica.ok) {
        const risp = await fetch("http://localhost:8080/notifications", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token
          }
        });
        if (risp.ok) {
          const notifiche = await risp.json();
          setNotifiche(notifiche);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPrenotazioni = (token, setPrenotazioni, setLoadingPre) => {
  return async dispatch => {
    setLoadingPre(true);
    try {
      const risp = await fetch("http://localhost:8080/reservations/my_reservations", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        const pre = await risp.json();
        setPrenotazioni(pre.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPre(false);
    }
  };
};
export const fetchPrenotazioniOwner = (token, setPrenotazioni, setLoadingPre) => {
  return async dispatch => {
    setLoadingPre(true);
    try {
      const risp = await fetch("http://localhost:8080/reservations", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (risp.ok) {
        const pre = await risp.json();
        setPrenotazioni(pre.content);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPre(false);
    }
  };
};
export const fetchDeleteReservation = (token, idPre, setPrenotazioni, setLoadingPre, navigate) => {
  return async dispatch => {
    try {
      const cancella = await fetch(`http://localhost:8080/reservations/${idPre}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (cancella.ok) {
        dispatch(fetchPrenotazioniOwner(token, setPrenotazioni, setLoadingPre));
        dispatch(fetchDisponibilita(token));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDisponibilita = token => {
  return async dispatch => {
    try {
      const disponibilita = await fetch("http://localhost:8080/availability/my_availability", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      if (disponibilita.status === 200) {
        const obj = await disponibilita.json();
        const key = Object.keys(obj);
        const array = key.map(k => obj[k]);
        const event = array.map((elem, i) => {
          const split = elem.split(",");
          const newEvent = {
            id: key[i],
            date: split[1],
            title: split[0]
          };
          return newEvent;
        });
        dispatch(addEventCalendar(event));
        dispatch(addArrayCalendar(array));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
