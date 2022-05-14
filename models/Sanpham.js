//Khai báo thư viện mongoose
const mongoose = require("mongoose");
const sanphamSchema = new mongoose.Schema({
    Tensanpham: String,
    Thoigiantrong: Date,
    PhanBon: String,
    Soluong: Number,
    Gia: Number,
    Mota: String,
    Thuonghieu: String,
    Loaichungnhan: String,
    Xacnhan: Boolean,
    DiachiVi: String,
    NgayUpload: Date,
    images: String
});
module.exports = mongoose.model("Sanpham", sanphamSchema);


