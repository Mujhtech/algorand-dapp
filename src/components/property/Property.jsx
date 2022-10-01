import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Stack,
  FloatingLabel,
} from "react-bootstrap";
import { microAlgosToString, truncateAddress } from "../../utils/conversions";
import Identicon from "../utils/Identicon";

const Property = ({
  address,
  property,
  buyProperty,
  deleteProperty,
  rateProperty,
}) => {
  const { title, image, location, price, bought, appId, owner, buyer, rate } = property;

  const [propertyRating, setRate] = useState(rate)

  const addr = bought === 1 ? buyer : owner

  const ratedIcon = () => {
    if (propertyRating > 5) {
      return "bi bi-star-fill";
    } else if (propertyRating > 0) {
      return "bi bi-star-half";
    } else {
      return "bi bi-star";
    }
  };

  return (
    <Col key={appId}>
      <Card className="h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <Identicon size={28} address={addr} />
            <span className="font-monospace text-secondary">
              Owner: {" "}
              <a
                  href={`https://testnet.algoexplorer.io/address/${addr}`}
                  target="_blank"
                  rel="noreferrer"
                >
                   {truncateAddress(addr)}
                </a>
            </span>
          
            <Badge
              bg={bought === 1 ? "success" : "secondary"}
              className="ms-auto"
            >
              {bought === 1 ? "Bought" : "Available"}
            </Badge>
          </Stack>
        </Card.Header>
        <div className="ratio ratio-4x3">
          <img src={image} alt={title} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex flex-column text-center">
          <Card.Title>{title}</Card.Title>
          <Card.Text className="flex-grow-1">{location}</Card.Text>
          <Form className="d-flex align-content-stretch flex-row gap-2">
            <Button
              variant={bought === 1 ? "outline-success" : "outline-dark"}
              onClick={() => buyProperty(property)}
              className={bought === 1 ? "w-75 py-3" : "btn w-75 py-3"}
              disabled={bought === 1}
            >
              {bought === 1
                ? "Bought"
                : `Buy for ${microAlgosToString(price)} ALGO`}
            </Button>
            {owner === address && bought !== 1 && (
              <Button
                variant="outline-danger"
                onClick={() => deleteProperty(property)}
                className="btn"
              >
                <i className="bi bi-trash"></i>
              </Button>
            )}
            {bought === 1 && (
              <>
                <FloatingLabel
                  controlId="inputCount"
                  label={propertyRating > 0 ? "Rated" : "Rate"}
                  className="w-25"
                >
                  <Form.Control
                    type="number"
                    value={propertyRating}
                    min="1"
                    max="10"
                    readOnly={rate > 0 || buyer !== address}
                    onChange={(e) => {
                      setRate(Number(e.target.value));
                    }}
                  />
                </FloatingLabel>
                <Button
                  variant="outline-secondary"
                  onClick={() => rateProperty(property, propertyRating)}
                  disabled={rate > 0 || buyer !== address}
                >
                  <i className={ratedIcon()}></i>
                </Button>
              </>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

Property.propTypes = {
  address: PropTypes.string.isRequired,
  property: PropTypes.instanceOf(Object).isRequired,
  buyProperty: PropTypes.func.isRequired,
  deleteProperty: PropTypes.func.isRequired,
  rateProperty: PropTypes.func.isRequired,
};

export default Property;
