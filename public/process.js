$(document).ready(function () {


    //Kết nối SmartContract
    const abi = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "_vi",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                }
            ],
            "name": "SM_gui_data",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_id",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Tensanpham",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Thoigiantrong",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Phanbon",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Thuonghieu",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "Loaichungnhan",
                    "type": "string"
                }
            ],
            "name": "KHDangKy",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "arrSanpham",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "_ID",
                    "type": "string"
                },
                {
                    "internalType": "address",
                    "name": "_VI",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "TENSANPHAM",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "THOIGIANTRONG",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "PHANBON",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "THUONGHIEU",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "LOAICHUNGNHAN",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];

    //Địa chỉ SmartContract
    const addressSM = "0x7c90a1A67E52c15bA79B36C7CA0523DeF3132FB8";

    //Kiểm tra xem máy khách hàng đã cài MetaMask chưa
    checkMetaMask();

    const web3 = new Web3(window.ethereum);
    window.ethereum.enable();


    //Tạo contract kết nối MetaMask
    var contract_MM = new web3.eth.Contract(abi, addressSM);
    console.log(contract_MM);

    //Tạo contract cho Infura listen
    var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/0773416edd8b4a6a93dfa5fbc2a63688");
    var web3_infura = new Web3(provider);
    var contract_Infura = web3_infura.eth.Contract(abi, addressSM);

    console.log(contract_Infura);
    contract_Infura.events.SM_gui_data({ filter: {}, fromBlock: "latest" }, function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            console.log(data);
            $("#tbDS").append(`
                <tr id="dong1">
                    <td>`+ data.returnValues[0] + `</td>
                    <td>`+ data.returnValues[1] + `</td>
                </tr>
            `);
        }
    });

    var currentAcc = "";

    //Bắt event khi click vào Metamask
    $("#connectMM").on("click", function () {
        connectMM().then((data) => {
            currentAcc = data[0];
            console.log(currentAcc);

            // chào mừng TK
            $('.wellcome').toggleClass('show');
            $('.account-name').text(currentAcc.toString());
            $('#txtDiachiVi').val(currentAcc.toString());
            $(this).toggleClass('show');

        }).catch((err) => {
            console.log(err);
        });
    })


    //Bấm đăng ký gửi Email, HoTen, SDT lên MongoDB --> Trả về data --> Gửi data lên Smart Contract 
    //--> Smart Contract xử lý, lưu thông tin vào Ethereum Blockchain đồng thời trả về NodeJS ID và địa chỉ Ví.
    $("#btnDangKy").on("click", function () {
        if (currentAcc.length == 0) {
            alert("Vui lòng đăng nhập vào MetaMask");
            return;
        }
        else {
            $.post("./dangky", {
                DiachiVi: $("#txtDiachiVi").val(),
                Tensanpham: $("#txtTensanpham").val(),
                Thoigiantrong: $("#txtThoigiantrong").val(),
                PhanBon: $("#txtPhanBon").val(),
                Soluong: $("#txtSoluong").val(),
                Gia: $("#txtGia").val(),
                Mota: $("#txtMota").val(),
                Thuonghieu: $("#txtThuonghieu").val(),
                Loaichungnhan: $("#txtLoaichungnhan").val(),
                images: $("#images").val(),
                Xacnhan: $("#txtXacnhan").val()
            }, function (data) {
                if (data.ketqua == 1) {
                    contract_MM.methods.KHDangKy(data.maloi._id, data.maloi.Tensanpham, data.maloi.Thoigiantrong, data.maloi.PhanBon
                        , data.maloi.Thuonghieu, data.maloi.Loaichungnhan).send({
                            from: currentAcc
                        });
                }
            });
        }

    });
});

//Kết nối Metamask
async function connectMM() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    return accounts;
}

async function disconnectMM() {

}

//Viết function để kiểm tra MetaMask đã được cài hay chưa
function checkMetaMask() {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask đã được cài!');
        return;
    } else {
        console.log('Bạn chưa cài MetaMask kìa !!!');
        alert("Bạn chưa cài MetaMask kìa !!! Vui lòng truy cập theo link sau để cài đặt: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn ")
        return;
    }
}