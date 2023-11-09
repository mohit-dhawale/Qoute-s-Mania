const express = require("express");
const db = require("../Utils/db");
const utils = require("../Utils/utils");

const router = express.Router();

router.get("/:userId", (request, response) => {
  console.log(request.params);
  console.log(request.body.userId);
  const userId = request.params.userId
  let qry = `SELECT quotes.*, (SELECT COUNT(*) FROM fav_quotes WHERE userId = ? AND quoteId = quotes.id) AS likedByUser from quotes;`;
  db.query(qry, [userId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/fav-quotes/:userId", (request, response) => {
  console.log(request.params);
  console.log(request.body.userId);
  const userId = request.params.userId
  let qry = `SELECT quotes.*, COUNT(fav_quotes.userId) AS likedByUser FROM quotes LEFT JOIN fav_quotes ON quotes.id = fav_quotes.quoteId AND fav_quotes.userId = ? GROUP BY quotes.id HAVING likedByUser > 0;`;
  db.query(qry, [userId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.get("/user/:userId", (request, response) => {
  console.log(request.params);
  console.log(request.body.userId);
  const userId = request.params.userId
  let qry = `SELECT * from quotes WHERE userId=?;`;
  db.query(qry, [userId] ,(error, result) => {
    response.send(utils.createResult(error, result));
  });
});


router.post("/add-quote", (request, response) => {
  console.log(request.body);
  const { userId, title, author, quote } = request.body;
  let qry = `SELECT id FROM quotes WHERE quotes=? AND title=?`;
  let qry1 = `INSERT INTO quotes(userId, title, author, quotes) VALUES(?,?,?,?)`;
  db.query(qry, [quote, title], (error, result) => {
    if (result.length > 0) {
      response.send(utils.createResult("Same quote is already present"));
    } else {
      db.query(qry1, [userId, title, author, quote], (error, result) => {
        response.send(utils.createResult(error, result));
      });
    }
  });
});

router.delete("/remove-quote/:quoteId/user/:userId", (request, response) => {
  console.log(request.body)
  const { userId, quoteId } = request.params;
  let qry = `DELETE  FROM quotes WHERE userId = ? AND id=?`;
  db.query(qry, [userId, quoteId], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

router.post("/like-quote", (request, response) => {
  console.log(request.body)
  const { userId, quoteId } = request.body;
  db.query(
    "SELECT userId FROM quotes WHERE id=?",
    [quoteId],
    (error, result) => {
      if (error) {
        response.send(utils.createResult(error, result));
      } else {
        const quoteUserId = result[0].userId;
        if (quoteUserId == userId) {
          response.send(utils.createResult("cannot like own quote"));
        } else {
          db.query(
            "SELECT * FROM fav_quotes WHERE quoteId=? and userId=?",
            [quoteId, userId],
            (error, result) => {
              console.log(result);
              if (result.length > 0) {
                response.send(utils.createResult("already liked"));
              } else {
                db.query(
                  "UPDATE quotes SET likeCount=likeCount + 1 WHERE id=?",
                  [quoteId],
                  (error, result1) => {
                    console.log("INSERT" + result1.affectedRows);
                    console.log("INSERT" + result1.changedRows);
                  }
                );

                db.query(
                  "INSERT INTO fav_quotes VALUES(?,?)",
                  [userId, quoteId],
                  (error, result) => {
                    console.log(result);
                    response.send(utils.createResult(error, result));
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

router.post("/unlike-quote/:quoteId/user/:userId", (request, response) => {
  const { quoteId, userId } = request.params;
  let qry1 = `DELETE FROM fav_quotes WHERE userId=? AND quoteId=?`;
  let qry2 = `UPDATE quotes SET likeCount=likeCount-1 WHERE id=?`;
  db.query(qry1, [userId, quoteId], (error, result) => {
    console.log(result)
    if (result.affectedRows > 0) {
      db.query(qry2, [quoteId, userId], (error, result) => {
        response.send(utils.createResult(result));
      });
    } else {
      response.send(utils.createResult("not liked"));
    }
  });
});

router.put('/update-quote',(request,response)=>{
  const {title,quote,author,quoteId} = request.body
  let qry1 = `UPDATE quotes SET title=?, author=?, quotes=?, modifiedDate=NOW() WHERE id=?;`
  db.query(qry1,[title,author,quote,quoteId],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})

module.exports = router;
