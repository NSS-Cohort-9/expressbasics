var express = require('express');
var moment = require('moment');

var Order = require('../models/ChickenNuggets');

var router = express.Router();

router.get('/', function (req, res) {
  Order.findAll(function (err, orders) {
    res.render('templates/chicken-index', {orders: formatAllOrders(orders)});
  });

  function formatAllOrders(orders) {
    return orders.map(function (order) {
      order.flavor = order.style;
      order.createdAt = moment(order._id.getTimestamp()).fromNow();
      delete order.style;
      return order;
    });
  }
});

router.get('/order', function (req, res) {
  res.render('templates/chicken-new');
});

router.post('/order', function (req, res) {
  Order.create(req.body, function () {
    res.redirect('/chickennuggets');
  });
});

router.post('/order/:id/complete', function (req, res) {
  Order.findById(req.params.id, function (err, order) {
    order.complete(function () {
      res.redirect('/chickennuggets');
    });
  });
});

module.exports = router;
