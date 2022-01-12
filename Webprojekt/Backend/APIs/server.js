const express = require("express");
const app = express();
const cors = require("cors");


app.get("/test", (req, res) => {
        res.status(200).json({ success: true});
});

app.put()

app.delete()

app.use()

app.listen(1337, () => console.log("server is running on port 1337"));