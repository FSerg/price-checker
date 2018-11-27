import React from "react";
import { Card } from "semantic-ui-react";

import { getUpdateStr } from "./Utils";

const PriceCard = ({ PriceItem }) => {
  const {
    Barcode,
    ProductCode,
    ProductName,
    ProducerName,
    UnitName,
    FeatureName,
    Price,
    PriceDiscount,
    updatedAt
  } = PriceItem;

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{ProductName}</Card.Header>
        <Card.Meta>
          [Код: {ProductCode}] {getUpdateStr(updatedAt)}
        </Card.Meta>
        <Card.Description>{Price}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default PriceCard;
