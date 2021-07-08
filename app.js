const express = require("express");
const app = express();
const cors = require("cors");

const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

const usersRoutes = require("./routes/usersRoutes");
const gymRoutes = require("./routes/gymRoutes");
const classRoutes = require("./routes/classRoutes");

app.use(cors());
app.use(express.json());
app.use("/media", express.static("media"));

app.use("/", usersRoutes);
app.use("/gym", gymRoutes);
app.use("/class", classRoutes);

// Path not Found Middleware
app.use((req, res, next) => {
  next({ status: 404, message: "Path Not Found" });
});

// Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});

app.listen(8000);
