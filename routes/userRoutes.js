//Hiển thị database 
const express = require('express');
const { db } = require('../models/Sanpham');
const Sanpham = require("../models/Sanpham");
const app = express();


app.get('/', (req, res) => {

    var search = '';
    if (req.query.search) {
        search = req.query.search;
    }
    Sanpham.find({ Tensanpham: { '$regex': search, '$options': 'i' } }).then(sanphams => {
        res.render('xem', {
            sanphams: sanphams.map(sanpham => sanpham.toJSON()).sort()
        });
    })
});

module.exports = app;

