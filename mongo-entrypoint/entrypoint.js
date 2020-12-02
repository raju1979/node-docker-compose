var db = connect("mongodb://admin:pass@localhost:27017/admin");

db = db.getSiblingDB('natours'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "raju",
        pwd: "pass",
        roles: [ { role: "readWrite", db: "natours"} ],
        passwordDigestor: "server",
    }
)