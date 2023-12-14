import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { MdEventAvailable } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { VscSaveAs } from "react-icons/vsc";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Calendario = ({ array, idDispo }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const token = useSelector(state => state.login.token);
  const navigate = useNavigate();

  const DateClick = date => {
    setSelectedDate(date);
  };

  const CreateEvent = () => {
    const event = array.map((elem, i) => {
      const split = elem.split(",");
      const newEvent = {
        id: idDispo[i],
        date: split[1],
        title: split[0]
      };
      return newEvent;
    });
    setEvents(event);
  };

  const UpdateEvent = eventId => {
    const updated_Events = events.map(event => {
      if (event.id === eventId) {
        const change = {
          ...event,
          title: event.title === "AVAILABLE" ? "NOT_AVAILABLE" : "AVAILABLE"
        };
        return change;
      }
      return event;
    });
    setEvents(updated_Events);
  };

  const ModifyFetch = async e => {
    const idEventi = [];
    array.map((elem, i) => {
      const split = elem.split(",");
      console.log(split[1] === events[i].date && split[0] !== events[i].title);
      if (split[1] === events[i].date && split[0] !== events[i].title) {
        console.log(events[i].id);
        return idEventi.push(events[i].id);
      }
    });
    for (let i = 0; i < idEventi.length; i++) {
      const modifica = await fetch("http://localhost:8080/availability/" + idEventi[i], {
        method: "PATCH",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (modifica.ok) {
        navigate("/change_calendar");
      }
    }
  };

  useEffect(() => {
    CreateEvent();
  }, []);

  return (
    <Container>
      <Row className="row-cols-1 d-flex">
        <Col className="flex-grow-1">
          <Calendar
            value={selectedDate}
            onClickDay={DateClick}
            tileClassName={({ date }) =>
              selectedDate && date.toDateString() === selectedDate.toDateString()
                ? "selected"
                : events.some(event => event.date === date.toLocaleDateString("fr-CA"))
                ? "event-marked"
                : ""
            }
            tileContent={({ date, view }) => {
              return (
                view === "month" &&
                events.map((event, i) => {
                  return date.toLocaleDateString("fr-CA") === event.date ? (
                    event.title === "AVAILABLE" ? (
                      <p
                        key={event.id}
                        style={{ fontSize: "0.8em", color: "green" }}>
                        Disponibile
                      </p>
                    ) : (
                      <p
                        key={event.id}
                        style={{ fontSize: "0.8em", color: "red" }}>
                        Occupato
                      </p>
                    )
                  ) : null;
                })
              );
            }}
          />
        </Col>
      </Row>
      <div className="event-container">
        {events.length > 0 && selectedDate && (
          <>
            <div className="event-list">
              <div className="event-cards">
                {events.map(event =>
                  event.date === selectedDate.toLocaleDateString("fr-CA") ? (
                    <Row
                      key={event.id}
                      className="event-card d-flex flex-column gap-3">
                      <Col className="event-card-header">
                        <Row className="d-flex flex-column gap-2">
                          <Col>
                            <span className="event-date"> {new Date(event.date).toString().substr(0, 15)} </span>
                          </Col>
                          <Col className="event-card-body">
                            {event.title === "AVAILABLE" ? (
                              <p style={{ fontSize: "1.4em", color: "green" }}> DISPONIBILE </p>
                            ) : event.title === "NOT_AVAILABLE" ? (
                              <p style={{ fontSize: "1.4em", color: "red" }}> OCCUPATO </p>
                            ) : null}
                          </Col>
                          <Col className="d-flex justify-content-between">
                            {event.title === "AVAILABLE" ? (
                              <CgUnavailable
                                className="update-btn"
                                onClick={() => UpdateEvent(event.id)}
                              />
                            ) : event.title === "NOT_AVAILABLE" ? (
                              <MdEventAvailable
                                className="update-btn"
                                onClick={() => UpdateEvent(event.id)}
                              />
                            ) : null}
                            <VscSaveAs
                              className="update-btn"
                              onClick={e => ModifyFetch(e)}
                            />
                          </Col>
                          <Col></Col>
                        </Row>
                      </Col>
                    </Row>
                  ) : null
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};
export default Calendario;
