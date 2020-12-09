const User = require('../models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const maxAge = 60 * 60 * 1 * 1000;

exports.listUser = async (req, res) => {
    let { current_page, per_page } = req.query;
    current_page = current_page !== undefined ? current_page : 1;
    per_page = per_page !== undefined ? per_page : 20;

    const skip = (parseInt(current_page) - 1) * parseInt(per_page);
    const count = await User.countDocuments({});

    User.find({})
            .skip(skip)
                .limit(per_page)
                    .select('_id name phone firstname lastname status balance role ip')
                        .exec((err, resp) => {
                            if (resp) {
                                return res.status(200).json({
                                    total: count,
                                    per_page,
                                    current_page,
                                    users: resp
                                })
                            }
                            return res.status(400).json({
                                error: 1,
                                msg: 'Not Found'
                            })
                        })
}

exports.signUpUser = async (req, res) => {
    const { name, phone, password, firstname, lastname } = req.body;
    const ip = req.session.ip;
    const check = await User.find({ ip });
    if (check) {
        return res.status(400).json({
            error: 1,
            msg: 'Your IP address is already taken'
        })
    }
    const user = new User({ name, phone, password, firstname, lastname, ip })
    user.save((err, success) => {
        if(success) {

            const token = jwt.sign({ _id: success.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { maxAge });
            const { _id, name, phone, firstname, lastname, ip, balance, role } = success;
            return res.json({
                status: 1,
                token,
                user: { _id, name, phone, firstname, lastname, ip, balance, role  }
            })
        }
        return res.status(400).json({
            error: 1,
            msg: 'Signup Failed, try again'
        })
    })
}

exports.loginUser = (req, res) => {
    const { username, password } = req.body;
    const key = isNaN(username) ? 'name' : 'phone';

    User.findOne({ [key]: username}).exec( async (err, user) => {
        if (user) {
            console.log(password, user.name)
            const auth = await bcrypt.compare(password, user.password);

            if (auth) {
                const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('token', token, { maxAge });
                const { _id, name, phone, firstname, lastname, ip, balance, role } = user;
                return res.json({
                    status: 1,
                    token,
                    user: { _id, name, phone, firstname, lastname, ip, balance, role  }
                })
            }
            return res.status(400).json({
                error: 1,
                msg: 'Invalid username and password'
            })
        }
        return res.status(400).json({
            error: 1,
            msg: 'Invalid username and password'
        })
    })
}

// exports.loginUser = (req, res) => {
//     console.log(24114)
// }
exports.createUser = (req, res) => {
    let { name, phone, password, firstname, lastname, role, balance, ip, status } = req.body;
    firstname = firstname ? firstname : null;
    lastname = lastname ? lastname : null;
    role = role ? role : 'member';
    balance = balance ? balance : 0;
    status = status ? firststatusname : 'active';
    ip = ip ? ip : '0.0.0.0';
    const user = new User({ name, phone, password, firstname, lastname, role, balance, ip, status });
    user.save((err, success) => {
        if (success) {
            const { _id, name, phone, firstname, lastname, ip, balance, role, status } = success;
            return res.json({
                user: { _id, name, phone, firstname, lastname, ip, balance, role, status  }
            })

        }
        return res.status(400).json({
            error: 1,
            msg: 'name or phone already exist'
        })
    })
}
exports.updateUser = (req, res) => {
    const { id, password, balance, status, role, firstname, lastname, ip } = req.body;
    User.findById({ _id: '5fcf97ea24c7ad101c473642' }).exec((err, user) => {
        if (user) {
            if (password) user.password = password;
            if (balance) user.balance = balance;
            if (status) user.status = status;
            if (role) user.role = role;
            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;
            if (ip) user.ip = ip;
            user.save((err, newuser) => {
                if (newuser) {
                    const { _id, name, phone, firstname, lastname, status, role, ip, balance } = newuser;
                    return res.status(200).json({
                        user: { _id, name, phone, firstname, lastname, status, role, ip, balance }
                    })
                }
                return res.status(400).json({
                    error: 1,
                    msg: 'An error occur'
                })
            })
        }
        if (err) {
            return res.status(400).json({
                error: 1,
                msg: 'An error occur'
            })
        }
    })
}

exports.singleUser = (req, res) => {
    const { id } = req.params;
    User.findOne({ _id: id }).select('_id name phone firstname lastname status role balance ip').exec((err, user) => {
        if (user) {
            return res.status(200).json(user)
        }
        return res.status(400).json({
            error: 1,
            msg: 'Not Found user'
        })
    })
}

exports.chekLogin = (req, res) => {
    const _id = req.user._id;
    console.log(_id)
    User.findById({ _id }).select('_id name phone firstname lastname role status balance ip').exec((err, user) => {
        if (user) {
            const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { maxAge });
            return res.json({
                status: 1,
                token,
                user
            })
        }
        return res.status(400).json({
            error: 1,
            msg: 'Not Found user'
        })
    })
}
