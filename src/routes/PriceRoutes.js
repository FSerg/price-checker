import express from 'express';
import bearer from '../middlewares/bearer';
import Price from '../models/Price';
import Journal from '../models/Journal';
import log from '../services/Logging';

const router = express.Router();

router.get('/', (req, res) => {
  log.info('GET find Price');
  log.info(JSON.stringify(req.query));

  if (req.query === undefined) {
    const errMsg = 'В запросе отсутствует штрих-код';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  if (!req.query.barcode) {
    const errMsg = 'В параметре запроса не заполнен штрих-код';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  const barcodeNumber = req.query.barcode;
  Price.findOne({ Barcode: barcodeNumber }, (err, result) => {
    if (err) {
      const errMsg = 'Ошибка при выполнении запроса поиска штрих-кода';
      log.error(errMsg);
      log.error(err);
      return res.status(400).send({ result: errMsg });
    }
    if (!result) {
      const errMsg = `Штрих-код ${barcodeNumber} не найден`;
      log.error(errMsg);
      // Journal
      JouranlRegistration({ Barcode: barcodeNumber }, 'Fail');
      return res.status(400).send({ result: errMsg });
    }
    // Journal
    JouranlRegistration(result._doc, 'Ok');
    return res.status(200).send({ result });
  });
});

router.get('/journal', bearer, (req, res) => {
  log.info('GET Journal');
  log.info(JSON.stringify(req.query));

  if (req.query === undefined) {
    const errMsg = 'Пустой запрос периода журнала';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }

  if (!req.query.date_begin) {
    const errMsg = 'В параметре запроса не заполнено начало периода';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }
  if (!req.query.date_end) {
    const errMsg = 'В параметре запроса не заполнено окончание периода';
    log.error(errMsg);
    return res.status(400).send({ result: errMsg });
  }
  const data1 = new Date(req.query.date_begin);
  const data2 = new Date(req.query.date_end);

  Journal.find({ createdAt: { $gte: data1, $lt: data2 } }, (err, result) => {
    if (err) {
      const errMsg = 'Ошибка при выполнении запроса журнала';
      log.error(errMsg);
      log.error(err);
      return res.status(400).send({ result: errMsg });
    }
    if (!result) {
      const errMsg = 'Записей журнала не найдено!';
      log.error(errMsg);
      return res.status(400).send({ result: errMsg });
    }
    return res.status(200).send({ result });
  });
});

const JouranlRegistration = (data, status) => {
  const newData = { ...data, status };
  if (status === 'Ok') {
    delete newData.createdAt;
    delete newData.updatedAt;
    delete newData._id;
    delete newData.__v;
  }
  Journal.create(newData);
};

router.delete('/', bearer, (req, res) => {
  log.info('DELETE prices');

  Price.deleteMany({}, err => {
    if (err) {
      log.error(err);
      return res.status(400).send({ result: 'error' });
    }
    log.info('Prices DELETED!');
    return res.status(200).send({ result: 'success' });
  });
});

router.post('/', bearer, (req, res) => {
  log.info('POST Prices');
  log.info(JSON.stringify(req.body));
  const DataArray = req.body;
  // we must get array
  if (!Array.isArray(DataArray)) {
    const errorMessage = 'Prices from 1C must be Array!';
    log.error(errorMessage);
    return res.status(400).send({ result: errorMessage });
  }

  // write array to DB
  Price.insertMany(DataArray, err => {
    if (err) {
      log.error(err);
      return res.status(400).send({ result: 'error' });
    }
    log.info('Barcodes Added!');
    return res.status(200).send({ result: 'success' });
  });
});

export default router;
