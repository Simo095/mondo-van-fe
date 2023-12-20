import {
  Button,
  Card,
  CardHeader,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormSelect,
  Image,
  ListGroup,
  ListGroupItem,
  ProgressBar,
  Row
} from "react-bootstrap";

const CardAccountUser = () => {
  return (
    <Card
      small
      className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">TITOLO</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Card
                small
                className="mb-4 pt-3">
                <CardHeader className="border-bottom text-center">
                  <div className="mb-3 mx-auto">
                    <Image
                      className="rounded-circle"
                      //src={userDetails.avatar}
                      alt="immagine profilo utente"
                      width="110"
                    />
                  </div>
                  <h4 className="mb-0">NOME UTENT</h4>
                  <span className="text-muted d-block mb-2">DETTAGLIO</span>
                  <Button
                    pill
                    outline
                    size="sm"
                    className="mb-2">
                    <i className="material-icons mr-1">person_add</i> Follow
                  </Button>
                </CardHeader>
                <ListGroup flush>
                  <ListGroupItem className="px-4">
                    <div className="progress-wrapper">
                      <strong className="text-muted d-block mb-2">Altro dettaglio</strong>
                      <ProgressBar
                        className="progress-sm"
                        value="{userDetails.performanceReportValue}">
                        <span className="progress-value">PERCENTUALE%</span>
                      </ProgressBar>
                    </div>
                  </ListGroupItem>
                  <ListGroupItem className="p-4">
                    <strong className="text-muted d-block mb-2">ALTRO</strong>
                    <span>"ALTRO"</span>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
            <Col>
              <Form>
                <Row form>
                  {/* First Name */}
                  <Col
                    md="6"
                    className="form-group">
                    <label htmlFor="feFirstName">First Name</label>
                    <FormControl
                      id="feFirstName"
                      placeholder="First Name"
                      value="Sierra"
                      onChange={() => {}}
                    />
                  </Col>
                  {/* Last Name */}
                  <Col
                    md="6"
                    className="form-group">
                    <label htmlFor="feLastName">Last Name</label>
                    <FormControl
                      id="feLastName"
                      placeholder="Last Name"
                      value="Brooks"
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Email */}
                  <Col
                    md="6"
                    className="form-group">
                    <label htmlFor="feEmail">Email</label>
                    <FormControl
                      type="email"
                      id="feEmail"
                      placeholder="Email Address"
                      value="sierra@example.com"
                      onChange={() => {}}
                      autoComplete="email"
                    />
                  </Col>
                  {/* Password */}
                  <Col
                    md="6"
                    className="form-group">
                    <label htmlFor="fePassword">Password</label>
                    <FormControl
                      type="password"
                      id="fePassword"
                      placeholder="Password"
                      value="EX@MPL#P@$$w0RD"
                      onChange={() => {}}
                      autoComplete="current-password"
                    />
                  </Col>
                </Row>
                <FormGroup>
                  <label htmlFor="feAddress">Address</label>
                  <FormControl
                    id="feAddress"
                    placeholder="Address"
                    value="1234 Main St."
                    onChange={() => {}}
                  />
                </FormGroup>
                <Row form>
                  {/* City */}
                  <Col
                    md="6"
                    className="form-group">
                    <label htmlFor="feCity">City</label>
                    <FormControl
                      id="feCity"
                      placeholder="City"
                      onChange={() => {}}
                    />
                  </Col>
                  {/* State */}
                  <Col
                    md="4"
                    className="form-group">
                    <label htmlFor="feInputState">State</label>
                    <FormSelect id="feInputState">
                      <option>Choose...</option>
                      <option>...</option>
                    </FormSelect>
                  </Col>
                  {/* Zip Code */}
                  <Col
                    md="2"
                    className="form-group">
                    <label htmlFor="feZipCode">Zip</label>
                    <FormControl
                      id="feZipCode"
                      placeholder="Zip"
                      onChange={() => {}}
                    />
                  </Col>
                </Row>
                <Row form>
                  {/* Description */}
                  <Col
                    md="12"
                    className="form-group">
                    <label htmlFor="feDescription">Description</label>
                    <textarea
                      id="feDescription"
                      rows="5"
                    />
                  </Col>
                </Row>
                <Button theme="accent">Update Account</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
};
export default CardAccountUser;
