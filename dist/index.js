"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const connectDB_1 = __importDefault(require("./config/connectDB"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use("/api/v1", authRouter_1.default);
(0, connectDB_1.default)()
    .then(() => {
    console.log("DB Connected ✅");
    app.listen(PORT, () => {
        console.log("App is Listening ✅");
    });
})
    .catch((err) => {
    console.log(err);
    console.log("DB Not Connected ❌");
});
