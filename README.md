[![pipeline status](https://gitlab.com/ShaelynSun/cicd-dst/badges/master/pipeline.svg)](https://gitlab.com/ShaelynSun/cicd-dst/commits/master)

[![coverage report](https://gitlab.com/ShaelynSun/cicd-dst/badges/master/coverage.svg)](https://gitlab.com/ShaelynSun/cicd-dst/badges/master/coverage.svg?job=coverage)

Name: Xinyue Sun (Shaelyn)

Student Number: 20086486

Description:
This is a dynamic storytelling website. Everyone can post their own story, of course the story can be incomplete.
When uploaded, other users will see your incomplete story, and if he is interested, he will help you continue this story.
(p.s. The main part means the original story uploaded. And the comments mean the continuation of the story.)
The project has been deployed on heroku.

Web

>http://dst-staging-api.herokuapp.com

>http://dst-prod-api.herokuapp.com

Client:

>http://dstvue-prod.surge.sh

>http://dstvue-prod-api.herokuapp.com


Assignment1: https://youtu.be/A5uRIsin0Zc

Assignment2: https://youtu.be/Qv-1EhkNcw0

Features:
1.1 app.get('/stories', stories.findAll);
    It can get all the uploaded stories (main part) on the website.

1.2 app.get('/stories/:id', stories.findOne);
    It can get a specific story (main part)

1.3 app.get('/stories/find/:keyword', stories.fuzzySearch);
    Complete the fuzzy search. Search for the title and content of all stories about keywords.

1.4 app.get('/comments/:id', comments.findCommentWithStory);
    Get all the comments in a story.

1.5 app.get('/mystories/:username', stories.findMyStory);
    Get stories by a specific username.

2.1 app.put('/stories/:id/upvote', stories.incrementUpvotes);
    Update the number of up votes for the story (the main part).

2.2 app.put('/stories/:id/downvote', stories.incrementDownvotes); // the same test as up-vote
    Update the number of down votes for the story (the main part).

2.3 app.put('/stories/:id/addComment', comments.addComment);
    A story that continues to be written by other users.

3.1 app.post('/stories', stories.addStory);
    Upload a new story。

3.2 app.post('/edit/:id', stories.editStory); // not test
    Edit the title and content of the story.

3.3 app.post('/reg', indexRouter.register_user);
    Register a new user for the site.

3.4 app.post('/login', indexRouter.login_user);
    User login.

4.1 app.delete('/stories/:id', stories.deleteStory);
    Delete a story.

4.2 app.delete('/comments/:story_id/:comment_id', comments.deleteComment); // not test
    Delete a certain comment in a determined story.

Reference:
1. <Node.js入门教程>, https://www.bookstack.cn/books/node-abc
2. <MongoDB's multi-table association query>, https://blog.csdn.net/WaterSprite_ct/article/details/78500997
3. <MongoDB tutorial>, 'yingchiajun', https://www.w3cschool.cn/mongodb/mongodb-databases-documents-collections.html
