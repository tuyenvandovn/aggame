const Admin = require("../models/admin");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const maxAge = 60 * 60 * 1 * 1000;

exports.listAdmin = async (req, res) => {
    let { current_page, per_page } = req.query;
    current_page = current_page !== undefined ? current_page : 1;
    per_page = per_page !== undefined ? per_page : 20;

    const skip = (parseInt(current_page) - 1) * parseInt(per_page);
    const count = await Admin.countDocuments({});

    Admin.find({})
        .skip(skip)
        .limit(per_page)
        .select("_id name phone firstname lastname status balance role ip")
        .exec((err, resp) => {
            if (resp) {
                return res.status(200).json({
                    total: count,
                    per_page,
                    current_page,
                    admins: resp
                });
            }
            return res.status(400).json({
                error: 1,
                msg: "Not Found"
            });
        });
};

exports.signUpAdmin = async (req, res) => {
    const { name, phone, password, firstname, lastname } = req.body;
    const ip = req.session.ip;
    const check = await Admin.find({ ip });
    if (check) {
        return res.status(400).json({
            error: 1,
            msg: "Your IP address is already taken"
        });
    }
    const admin = new Admin({ name, phone, password, firstname, lastname, ip });
    admin.save((err, success) => {
        if (success) {
            const token = jwt.sign(
                { _id: success.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            res.cookie("token", token, { maxAge });
            const {
                _id,
                name,
                phone,
                firstname,
                lastname,
                ip,
                balance,
                role
            } = success;
            return res.json({
                status: 1,
                token,
                admin: {
                    _id,
                    name,
                    phone,
                    firstname,
                    lastname,
                    ip,
                    balance,
                    role
                }
            });
        }
        return res.status(400).json({
            error: 1,
            msg: "Signup Failed, try again"
        });
    });
};

exports.loginAdmin = (req, res) => {
    const { adminname, password } = req.body;
    const key = isNaN(adminname) ? "name" : "phone";

    Admin.findOne({ [key]: adminname }).exec(async (err, admin) => {
        if (admin) {
            console.log(password, admin.name);
            const auth = await bcrypt.compare(password, admin.password);

            if (auth) {
                const token = jwt.sign(
                    { _id: admin.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.cookie("token", token, { maxAge });
                const {
                    _id,
                    name,
                    phone,
                    firstname,
                    lastname,
                    ip,
                    balance,
                    role
                } = admin;
                return res.json({
                    status: 1,
                    token,
                    admin: {
                        _id,
                        name,
                        phone,
                        firstname,
                        lastname,
                        ip,
                        balance,
                        role
                    }
                });
            }
            return res.status(400).json({
                error: 1,
                msg: "Invalid adminname and password"
            });
        }
        return res.status(400).json({
            error: 1,
            msg: "Invalid adminname and password"
        });
    });
};

// exports.loginAdmin = (req, res) => {
//     console.log(24114)
// }
exports.createAdmin = (req, res) => {
    let {
        username,
        password,
        status
    } = req.body;
   
    status = status ? status : "active";
    const admin = new Admin({
        username,
        password,
        status
    });
    admin.save((err, success) => {
        if (success) {
            const {
                _id,
                username,
                status
            } = success;
            return res.json({
                admin: {
                    _id,
                    username,
                    status
                }
            });
        }
        return res.status(400).json({
            error: 1,
            msg: "username already exist"
        });
    });
};
exports.updateAdmin = (req, res) => {
    const {
        id,
        password,
        balance,
        status,
        role,
        firstname,
        lastname,
        ip
    } = req.body;
    Admin.findById({ _id: "5fcf97ea24c7ad101c473642" }).exec((err, admin) => {
        if (admin) {
            if (password) admin.password = password;
            if (balance) admin.balance = balance;
            if (status) admin.status = status;
            if (role) admin.role = role;
            if (firstname) admin.firstname = firstname;
            if (lastname) admin.lastname = lastname;
            if (ip) admin.ip = ip;
            admin.save((err, newadmin) => {
                if (newadmin) {
                    const {
                        _id,
                        name,
                        phone,
                        firstname,
                        lastname,
                        status,
                        role,
                        ip,
                        balance
                    } = newadmin;
                    return res.status(200).json({
                        admin: {
                            _id,
                            name,
                            phone,
                            firstname,
                            lastname,
                            status,
                            role,
                            ip,
                            balance
                        }
                    });
                }
                return res.status(400).json({
                    error: 1,
                    msg: "An error occur"
                });
            });
        }
        if (err) {
            return res.status(400).json({
                error: 1,
                msg: "An error occur"
            });
        }
    });
};

exports.singleAdmin = (req, res) => {
    const { id } = req.params;
    Admin.findOne({ _id: id })
        .select("_id name phone firstname lastname status role balance ip")
        .exec((err, admin) => {
            if (admin) {
                return res.status(200).json(admin);
            }
            return res.status(400).json({
                error: 1,
                msg: "Not Found admin"
            });
        });
};

exports.chekLogin = (req, res) => {
    const _id = req.admin._id;
    console.log(_id);
    Admin.findById({ _id })
        .select("_id name phone firstname lastname role status balance ip")
        .exec((err, admin) => {
            if (admin) {
                const token = jwt.sign(
                    { _id: admin.id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );
                res.cookie("token", token, { maxAge });
                return res.json({
                    status: 1,
                    token,
                    admin
                });
            }
            return res.status(400).json({
                error: 1,
                msg: "Not Found admin"
            });
        });
};
