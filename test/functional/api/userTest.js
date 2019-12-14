const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")


describe("User",  () => {

    describe("POST /reg", () => {
        describe("when the user hasn't been existed", () =>{
            it("should return confirmation message and user added", () => {
                const usr = {
                    username: "555",
                    password: "321"
                }
                return request(server)
                    .post("/reg")
                    .send(usr)
                    .expect(200)
            })
        })
        describe("when the user has been existed", () =>{
            it("should return confirmation message the user not added", () => {
                const usr = {
                    username: "sxy",
                    password: "123"
                }
                return request(server)
                    .post("/reg")
                    .send(usr)
                    .expect(200)
                    .then(res => {
                        expect(res.body.message).equals("the user has already existed")
                        expect(res.body.data).to.have.property("username", "sxy")
                    })
            })
        })

    })//end-POST a new user added
    describe("POST /login", () => {
        describe("when the user existed and password is right", () =>{
            it("should return confirmation message and login", () => {
                const usr = {
                    username: "sxy",
                    password: "123"
                }
                return request(server)
                    .post("/login")
                    .send(usr)
                    .expect(200)
                    .then(res => {
                        expect(res.body.message).equals("login successfully")
                    })
            })
        })
        describe("when the user existed but password is wrong", () =>{
            it("should return message that password is wrong", () => {
                const usr = {
                    username: "sxy",
                    password: "3333333"
                }
                return request(server)
                    .post("/login")
                    .send(usr)
                    .expect(200)
                    .then(res => {
                        expect(res.body.message).equals("the password is wrong")
                    })
            })
        })
        describe("when the user not existed", () =>{
            it("should return message to advice register", () => {
                const usr = {
                    username: "123",
                    password: "123"
                }
                return request(server)
                    .post("/login")
                    .send(usr)
                    .expect(200)
                    .then(res => {
                        expect(res.body.message).equals("the user is not existed")
                    })
            })
        })

    })
})
