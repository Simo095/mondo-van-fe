import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Calendar from "react-calendar";
import { MdEventAvailable } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { VscSaveAs } from "react-icons/vsc";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { addEventCalendar } from "../../redux/actions";

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const token = useSelector(state => state.login.token);
  const events = useSelector(state => state.login.eventCalendar);
  const array = useSelector(state => state.login.calendarArray);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const DateClick = date => {
    setSelectedDate(date);
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
    dispatch(addEventCalendar(updated_Events));
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

  return (
    <Container
      fluid
      className="p-0">
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
                              onClick={ModifyFetch}
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
