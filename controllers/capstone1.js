var Sanpham = require("../models/Sanpham");
module.exports = function (app) {
    app.get("/", function (req, res) {
        res.render("layout.ejs");
    });

    app.post("/dangky", function (req, res) {
        if (!req.body.Tensanpham || !req.body.Thoigiantrong || !req.body.PhanBon || !req.body.Soluong || !req.body.Gia || !req.body.Mota || !req.body.Thuonghieu || !req.body.Loaichungnhan) {
            res.json({ ketqua: 0, maloi: "Thieu tham so !" });
        } else {
            var sanphamMoi = new Sanpham({
                Tensanpham: req.body.Tensanpham,
                Thoigiantrong: req.body.Thoigiantrong,
                PhanBon: req.body.PhanBon,
                Soluong: req.body.Soluong,
                Gia: req.body.Gia,
                Mota: req.body.Mota,
                Thuonghieu: req.body.Thuonghieu,
                Loaichungnhan: req.body.Loaichungnhan,
                images: req.body.images,
                Xacnhan: true,
                DiachiVi: req.body.DiachiVi,
                NgayUpload: Date.now()
            });

            //Lưu vào database MongoDB
            sanphamMoi.save(function (err) {
                if (err) {
                    res.json({ ketqua: 0, maloi: "MongoDB save error !" });
                }
                else {
                    res.json({ ketqua: 1, maloi: sanphamMoi });
                }
            });
        }
    });
};