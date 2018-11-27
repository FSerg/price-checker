import React from "react";
import { Segment, Grid, Header, Label } from "semantic-ui-react";

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
    <div>
      <Segment.Group>
        <Segment padded secondary>
          <Header size="huge">{ProductName}</Header>
        </Segment>
        <Segment size="big">
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <p>Производитель: {ProducerName}</p>

                <p>Ед.измерения: {UnitName}</p>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Label size="massive" color="blue">
                  {Price} р.
                </Label>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment.Group>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Label size="big">Код товара: {ProductCode}</Label>
            <Label size="big" color="grey">
              Штрих-код: {Barcode}
            </Label>
          </Grid.Column>
          <Grid.Column textAlign="right">{getUpdateStr(updatedAt)}</Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default PriceCard;
