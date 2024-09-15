import mongoose from "mongoose";

const authQrSchema = new mongoose.Schema({
  token: { type: String, required: true },
  ok: { type: Boolean, required: true },
  userId: { type: String },
});

const AuthQr = mongoose.model("authQR", authQrSchema);

export default AuthQr;
