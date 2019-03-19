const express = require('express');
const PORT = process.env.PORT || 8000
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const cors = require('cors')
app.use(cors())
const http = require('http').Server(app);
var fs = require("fs");
app.use('/locker', (req, res) => {
    fs.readFile(__dirname + "/" + "tb_locker.json", 'utf8', function (err, data) {
        user = JSON.parse(data);
        var item = [];
        for (let index = 0; index < 12; index++) {
            if (user[index].state == 0)
                item.push({ size: user[index].size, state: user[index].state, class: "btn-secondary" });
            else if (user[index].state == 2) {
                var time = new Date().getTime();
                if (time - user[index].time >= 180000) {
                    console.log("TimeOut" + index);
                    user[index].state = 0;
                    item.push({ size: user[index].size, state: user[index].state, class: "btn-secondary" });
                }
                else
                    item.push({ size: user[index].size, state: user[index].state, class: "btn-danger" });
            }
            else
                item.push({ size: user[index].size, state: user[index].state, class: "btn-danger" });
        }
        if (req.method == "POST") {
            if (user[req.body.id - 1].state == 0) {
                user[req.body.id - 1].state = 2;
                user[req.body.id - 1].time = new Date().getTime();;
                var json = JSON.stringify(user);
                fs.writeFile(__dirname + "/" + "tb_locker.json", json, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        }
        res.send(item);
    });
});
app.post('/register', (req, res) => {
    // console.log(req.body);
    fs.readFile(__dirname + "/" + "tb_user.json", 'utf8', function (err, data) {
        var user = {}
        user = JSON.parse(data);
        user[req.body.id - 1].user = req.body.user;
        user[req.body.id - 1].time = new Date().getTime();;
        var json = JSON.stringify(user);
        fs.writeFile(__dirname + "/" + "tb_user.json", json, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            res.send("register");
        });
    });
});
app.post('/price', (req, res) => {
    fs.readFile(__dirname + "/" + "tb_price.json", 'utf8', function (err, data) {
        var user = JSON.parse(data);
        if (req.body.size == "S") {
            res.send(user.S);
        }
        if (req.body.size == "M") {
            res.send(user.M);
        }
        if (req.body.size == "L") {
            res.send(user.L);
        }
    });
});
app.post('/confirm', (req, res) => {
    console.log(req.body)
    fs.readFile(__dirname + "/" + "tb_user.json", 'utf8', (err, data) => {
        var user = JSON.parse(data);
        user[req.body.id - 1].money = req.body.money;
        user[req.body.id - 1].pin = req.body.pin;
        var json = JSON.stringify(user);
        fs.writeFile(__dirname + "/" + "tb_user.json", json, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            fs.readFile(__dirname + "/" + "tb_locker.json", 'utf8', (err, data) => {
                var user = JSON.parse(data);
                user[req.body.id - 1].state = 1;
                var json = JSON.stringify(user);
                fs.writeFile(__dirname + "/" + "tb_locker.json", json, 'utf8', function (err) {
                    res.send("confirm");
                });
            });

        });
    });
});
app.post('/receipt', (req, res) => {
    var id = req.body.id;
    fs.readFile(__dirname + "/" + "tb_user.json", 'utf8', function (err, data) {
        var user = JSON.parse(data); // user time money
        fs.readFile(__dirname + "/" + "tb_locker.json", 'utf8', function (err, data) {
            user = user[id - 1];
            var date = new Date(user.time);
            date = new Date(date).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
            var locker = JSON.parse(data);
            fs.readFile(__dirname + "/" + "tb_price.json", 'utf8', function (err, data) {
                locker = locker[id - 1];
                var price = JSON.parse(data);
                if (locker.size == "S")
                    price = price.S;
                if (locker.size == "M")
                    price = price.M;
                if (locker.size == "L")
                    price = price.L;
                // console.log({ user: user.user, id: locker.size, money: user.money, time: date, price: price })
                res.send({ user: user.user, id: locker.size + '' + id, money: user.money, time: date, price: price })
            });
        });
    });
});
app.post('/cancel', (req, res) => {
    fs.readFile(__dirname + "/" + "tb_locker.json", 'utf8', function (err, data) {
        user = JSON.parse(data);
        user[req.body.id - 1].state = 0;
        user[req.body.id - 1].time = 0;
        var json = JSON.stringify(user);
        fs.writeFile(__dirname + "/" + "tb_locker.json", json, 'utf8', function (err) {
            if (err) {
                return console.log(err);
            }
            fs.readFile(__dirname + "/" + "tb_user.json", 'utf8', function (err, data) {
                user = JSON.parse(data);
                user[req.body.id - 1].user = "";
                user[req.body.id - 1].time = 0;
                json = JSON.stringify(user);
                fs.writeFile(__dirname + "/" + "tb_user.json", json, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    res.send("Cancel");
                });
            });
        });
    });
});
app.post('/takeout', (req, res) => {
    var id = req.body.id - 1
    fs.readFile(__dirname + "/" + "tb_user.json", 'utf8', (err, data) => {
        var user = JSON.parse(data);
        if (user[id].pin == req.body.pin) {
            res.send({ state: true });
        }
        else {
            res.send({ state: false });
        }
    });
});
app.post('/last', (req, res) => {
    var id = req.body.id - 1;
    var username;
    fs.readFile(__dirname + "/" + "tb_user.json", 'utf8', function (err, data) {
        var users = JSON.parse(data); // user time money
        fs.readFile(__dirname + "/" + "tb_locker.json", 'utf8', function (err, data) {
            user = users[id];
            username = user.user;
            var date = new Date(user.time);
            date3 = (new Date() - user.time) / 3600000
            date3 = Math.ceil(date3);
            date = new Date(date).toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
            date2 = new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
            // console.log(date3);
            var lockers = JSON.parse(data);
            fs.readFile(__dirname + "/" + "tb_price.json", 'utf8', function (err, data) {
                locker = lockers[id];
                var price = JSON.parse(data);
                if (locker.size == "S")
                    price = price.S;
                if (locker.size == "M")
                    price = price.M;
                if (locker.size == "L")
                    price = price.L;
                total = (date3 - 1) * price[1] + price[0];
                charge = total - user.money;
                change = 0;
                if (charge < 0) {
                    change = charge * -1;
                    charge = 0;
                }
                money1000 = Math.floor(change / 1000);
                if (money1000 < 0)
                    money1000 = 0;
                money500 = Math.floor((change - money1000 * 1000) / 500)
                if (money500 < 0)
                    money500 = 0;
                money100 = Math.floor((change - money1000 * 1000 - money500 * 500) / 100)
                if (money100 < 0)
                    money100 = 0;
                money50 = Math.floor((change - money1000 * 1000 - money500 * 500 - money100 * 100) / 50)
                if (money50 < 0)
                    money50 = 0;
                money20 = Math.floor((change - money1000 * 1000 - money500 * 500 - money100 * 100 - money50 * 50) / 20)
                if (money20 < 0)
                    money20 = 0;
                money10 = Math.floor((change - money1000 * 1000 - money500 * 500 - money100 * 100 - money50 * 50 - money20 * 20) / 10)
                if (money10 < 0)
                    money10 = 0;
                money5 = Math.floor((change - money1000 * 1000 - money500 * 500 - money100 * 100 - money50 * 50 - money20 * 20 - money10 * 10) / 5)
                if (money5 < 0)
                    money5 = 0;
                money2 = Math.floor((change - money1000 * 1000 - money500 * 500 - money100 * 100 - money50 * 50 - money20 * 20 - money10 * 10 - money5 * 5) / 2)
                if (money2 < 0)
                    money2 = 0;
                money1 = Math.floor((change - money1000 * 1000 - money500 * 500 - money100 * 100 - money50 * 50 - money20 * 20 - money10 * 10 - money5 * 5 - money2 * 2))
                if (money1 < 0)
                    money1 = 0;
                changes = "1000x" + money1000 + ", 500x" + money500 + ", 100x" + money100 + ", 50x" + money50 + ", 20x" + money20 + ", 10x" + money10 + ", 5x" + money5 + ", 2x" + money2 + ", 1x" + money1
                // console.log(changes)
                // console.log({ user: user.user, id: locker.size, money: user.money, time: date, price: price })
                users[id].user = "";
                users[id].pin = "";
                users[id].time = 0;
                users[id].money = 0;
                json = JSON.stringify(users);
                fs.writeFile(__dirname + "/" + "tb_user.json", json, 'utf8', function (err) {
                    lockers[id].state = 0;
                    lockers[id].time = 0;
                    json = JSON.stringify(lockers);
                    fs.writeFile(__dirname + "/" + "tb_locker.json", json, 'utf8', function (err) {
                        fs.readFile(__dirname + "/" + "tb_log.json", 'utf8', function (err, data) {
                            var log = []
                            log = JSON.parse(data);
                            moneyZ = total + change - charge;
                            id2 = id + 1;
                            datasend = {
                                user: username, id: locker.size + '' + id2, money: moneyZ,
                                time: date, time2: date2, time3: date3, price: price, total: total,
                                change: change, charge: charge, changes: changes
                            }
                            log.push(datasend);
                            json = JSON.stringify(log);
                            fs.writeFile(__dirname + "/" + "tb_log.json", json, 'utf8', function (err) {
                                res.send(datasend)
                            });
                        });
                    });
                });

            });
        });
    });
});

var server = http.listen(PORT, function () {
    console.log("Server is Running... At: http://localhost:%s", server.address().port);
});