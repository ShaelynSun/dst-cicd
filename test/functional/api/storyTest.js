const chai = require("chai")
const server = require("../../../bin/www")
const expect = chai.expect
const request = require("supertest")
const _ = require("lodash")

// let datastore = require("../../../models/stories");
// describe('a suite of tests', function() {
//     beforeEach(function(done) {
//         this.timeout(5000); // A very long environment setup.
//         setTimeout(done, 5000);
//     });
// });
describe("Stories",  () => {
    describe("GET /stories", () => {
        it("should return all the stories", done => {
            request(server)
                .get("/stories")
                .set("Accept", "application/json")
                .expect("Content-Type", /json/)
                .expect(200)
                .end((err, res) => {
                    _.map(res.body, story => {
                        return {_id: story._id, title: story.title}
                    })
                    done(err)
                })
        })
    }) // end-GET all stories
    describe("GET /stories/:id", () => {
        describe("when the id is valid", () => {
            it("should return the matching story", done => {
                request(server)
                    .get("/stories/5db37093d325820d812e9f77")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err) => {
                        done(err)
                    })
            })
        })
        describe("when the id is invalid", () => {
            it("should return the NOT found message", done => {
                request(server)
                    .get("/stories/9999")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .expect({ message: "Story NOT Found!" }, (err) => {
                        done(err)
                    })
            })
        })
    }) // end-GET a specific story
    describe("GET /stories/find/:keyword", () => {
        describe("when the stories contain the keyword", () => {
            it("should return the matching stories", done => {
                request(server)
                    .get("/stories/find/baby")
                    .set("Accept", "application/json")
                    .expect("Content-Type", /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body[0]).to.have.property("title", "a weird baby")
                        done(err)
                    })
            })
        })
        // describe("when the stories not contain the keyword", () => {
        //     it("should return the NOT found message", done => {
        //         request(server)
        //             .get("/stories/find/zzzz")
        //             .set("Accept", "application/json")
        //             .expect("Content-Type", /json/)
        //             .expect(404)
        //     });
        // });
    }) // end-GET fuzzy search
    describe("POST /stories", () => {
        it("should return confirmation message and update datastore", () => {
            const story = {
                username:"shaelyn",
                title:"66",
                type:"song",
                class:"Chinese",
                content:"1234"
            }
            return request(server)
                .post("/stories")
                .send(story)
                .expect(200)
        })
        after(() => {
            return request(server)
                .get("/stories")
                .expect(200)
                .then(res => {
                    const result = _.map(res.body, story => {
                        return {title: story.title, username: story.username}
                    })
                    expect(result).to.deep.include({title: "66", username: "shaelyn"})
                })
        })
    }) // end-POST a new story
    describe("PUT /stories/:id/upvote", () => {
        describe("when the id is valid", () => {
            it("should return a message and the story upvoted by 1", () => {
                return request(server)
                    .put("/stories/5df46280531ffc0ef9580b5e/upvote")
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "UpVote Successful"
                        })
                    })
            })
            after(() => {
                return request(server)
                    .get("/stories/5db37093d325820d812e9f77")
                    .expect(200)
                    .then((res) => {
                        expect(res.body).to.be.a("array")
                        _.map(res.body, story => {
                            return {title: story.title, upvotes: story.upvotes}
                        })
                    })
            })
        })
        describe("when the id is invalid", () => {
            it("should return a 404 for invalid donation id", () => {
                return request(server)
                    .put("/stories/1100001/upvote")
                    .then(res => {
                        expect(res.body).to.include({ message: "Story NOT Found - UpVote NOT Successful!!"})
                    })
            })
        })
    })  // end-PUT update a story's up-votes (same as down-votes)
    describe("DELETE /stories/:id",  () => {
        describe("when the id is valid", () => {
            it("should return a message and the donation has been deleted", () => {
                return request(server)
                    .delete("/stories/5db38c1b86b5970f5e03ddb4")
                    .expect(200)
            })
            after(() => {
                return request(server)
                    .get("/stories")
                    .expect(200)
                    .then((res) => {
                        const result = _.map(res.body, story => {
                            return {title: story.title, content: story.content}
                        })
                        expect(result).to.deep.include({title: "66", content: "1234"})
                    })
            })
        })
        describe("when the id is invalid", () => {
            it("should return a message for invalid donation id is not deleted", () => {
                return request(server)
                    .delete("/stories/1100001")
                    .then(resp => {
                        expect(resp.body).to.include({message: "Story NOT Deleted!" })
                    })
            })
        })
    })// end-DELETE the specific story
    describe("PUT /stories/:id/addComment", () => {
        const comment = {
            username: "aha",
            com_content: "the family has a weird baby."
        }
        describe("when the id is valid", () => {
            it("should return a message and the comment added", () => {
                return request(server)
                    .put("/stories/5df46280531ffc0ef9580b5e/addComment")
                    .send(comment)
                    .expect(200)
                    .then(resp => {
                        expect(resp.body).to.include({
                            message: "Comment Added Successfully!"
                        })
                        expect(resp.body.data).to.include({
                            username: "aha",
                            com_content: "the family has a weird baby."
                        })
                    })
            })
            after(() => {
                return request(server)
                    .get("/stories/5df46280531ffc0ef9580b5e")
                    .expect(200)
                    .then((res) => {
                        expect(res.body).to.be.a("array")
                        _.map(res.body, story => {
                            return {title: story.title, written_times: story.written_times}
                        })
                    })
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
    describe("POST /edit/:id", () => {
        it("should return confirmation message and update the previous story", () => {
            const story = {
                title:"not for delete",
                content:"the demo's been edited."
            }
            return request(server)
                .post("/edit/5df46280531ffc0ef9580b5f")
                .send(story)
                .expect(200)
                .then(res => {
                    expect(res.body.message).equals("Story Successfully Edited!")
                })
        })
        after(() => {
            return request(server)
                .get("/stories/5df46280531ffc0ef9580b5f")
                .expect(200)
                .then(res => {
                    expect(res.body[0]).to.have.property("title", "not for delete")
                    expect(res.body[0]).to.have.property("content", "the demo's been edited.")
                })
        })
    }) // end-POST edit a previous story
})
