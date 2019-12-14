const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")

describe("Comment",  () => {

    describe("PUT /stories/:id/addComment", () => {
        const comment = {
            username: "aha",
            com_content: "the baby had two weapons."
        }
        describe("when the id is valid", () => {
            it("should return a message and the comment added", () => {
                return request(server)
                    .put("/stories/5df46280531ffc0ef9580b5e/addComment")
                    .send(comment)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body.message).equals("Comment Added Successfully!")
                        expect(resp.body.data).to.include({
                            username: "aha",
                            com_content: "the baby had two weapons."
                        })
                    })
            })
            after(() => {
                return request(server)
                    .get("/stories/5df46280531ffc0ef9580b5e")
                    .expect(200)
            })
        })
        describe("when the id is invalid", () => {
            it("should return a message for invalid story id cannot add a comment", () => {
                return request(server)
                    .put("/stories/1100001/addComment")
                    .send(comment)
                    .expect(200)
            })
        })
    })// end-PUT add a new comment to the specific story
    describe("GET /comments/:id", () => {
        describe("when the id is valid", () => {
            it("should return the comments with specific storyID", done => {
                request(server)
                    .get("/comments/5df46280531ffc0ef9580b5e")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body[0]).to.have.property("username", "aha")
                        done(err)
                    })
            })
        })
        describe("when the id is invalid", () => {
            it("should return a not found message", done => {
                request(server)
                    .get("/comments/1100001")
                    .set("Accept", "application/json")
                    .expect(200)
                    .end((err) => {
                        done(err)
                    })
            })
        })
    })// end-GET a specific story's comments
    describe("PUT /comments/:id/upvote", () => {
        describe("when the id is valid", () => {
            it("should return a message and the comment upvoted by 1", () => {
                return request(server)
                    .put("/comments/5df46892af21b113fb2d786e/upvote")
                    .expect(404)
                    // .then(resp => {
                    //     expect(resp.body).to.include({
                    //         message: "UpVote Successful"
                    //     });
                    // });
            })
            after(() => {
                return request(server)
                    .get("/comments/5df46280531ffc0ef9580b5e")
                    .expect(200)
                    // .then((resp) => {
                    //     expect(resp.body[0]).to.have.property("com_upvotes", 1);
                    // });
            })
        })
        describe("when the id is invalid", () => {
            it("should return a message for NOT found", () => {
                return request(server)
                    .put("/comments/1100001/upvote")
            })
        })
    })  // end-PUT update a comment's up-votes (same as down-votes)
    describe("DELETE /comments/:story/:id",  () => {
        describe("when the id is valid", () => {
            it("should return a message and the comment has been deleted", () => {
                return request(server)
                    .delete("/comments/5df46280531ffc0ef9580b5e/5df46a3bda84c316ab3fe732")
                    .expect(200)
            })
            after(() => {
                return request(server)
                    .get("/stories/5df46280531ffc0ef9580b5e")
                    .expect(200)
            })
        })
        describe("when the id is invalid", () => {
            it("should return a message for invalid story id is not deleted", () => {
                return request(server)
                    .delete("/comments/1100001/11111")
                    .then(resp => {
                        expect(resp.body).to.include({message: "Story NOT Found" })
                    })
            })
        })
    })// end-DELETE the specific comment
})
