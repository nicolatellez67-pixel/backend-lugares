import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import passport from "passport";
import "./passport/localStrategy";
import "./passport/jwtStrategy";
import { errorHandler } from "./middlewares/errorHandler";
const app = express();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Passport
app.use(passport.initialize());


// Routes
console.log("RUTAS CARGADAS");
app.use("/", routes);

app.post("/auth/signin", (req, res) => {
  res.json({
    mensaje: "La ruta directa funciona"
  });
});


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});


// Error Handler
// ⚠️ SIEMPRE AL FINAL
app.use(errorHandler);
export default app;
