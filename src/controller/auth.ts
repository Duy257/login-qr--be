import { sha256 } from "../plugin/sha256";
import { Token } from "../plugin/token";
import User from "../model/user";
import AuthQr from "../model/authQr";
import QRCode from "qrcode";

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

class AuthController {
  register = async (req, res) => {
    try {
      let { email, name, password } = req.body;
      if (!email || !password || !name)
        return res.status(500).send({
          error: "Thiếu thông tin",
        });

      const checkUsername = await User.findOne({ email });
      if (checkUsername) {
        return res.status(500).send({
          error: "Tài khoản đã tồn tại!",
        });
      } else {
        const hashPassword = await sha256(password);
        const data = {
          password: hashPassword,
          name,
          email,
          role: "user",
        };
        await User.create(data);
        return res.status(200).json({ success: true });
      }
    } catch (error) {
      return res.status(400).send({
        error,
      });
    }
  };

  async login(req, res) {
    let { email, password } = req.body;
    if (!email || !password)
      return res.status(500).send({
        error: "Thiếu thông tin",
      });
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "Tài khoản hoặc mật khẩu sai",
      });
    } else {
      const hashPassword = await sha256(password);
      if (hashPassword === user.password) {
        let payload = {
          name: user.name,
          idUser: user.id,
          role: user.role,
        };
        const generateToken = Token.sign({ payload });
        return res.status(200).json({
          ...generateToken,
          idUser: user.id,
        });
      } else {
        return res.status(401).json({
          message: "Tài khoản hoặc mật khẩu sai",
        });
      }
    }
  }
  async loginWithToken(req, res) {
    try {
      let { refreshToken } = req.body;
      if (!refreshToken)
        return res.status(500).send({
          error: "Thiếu thông tin",
        });
      const token = Token.refresh({ refreshToken });
      return res.status(200).json(token);
    } catch (error) {
      throw error;
    }
  }
  async loginWithQr(req, res) {
    try {
      let { token } = req.body;
      let qr = await AuthQr.findOne({ token, ok: true });
      if (qr) {
        const user = await User.findOne({ _id: qr.userId });
        if (user) {
          let payload = {
            id: user.id,
            name: user.name,
            role: user.role,
          };
          const generateToken = Token.sign({ payload });
          return res.status(200).json({
            success: true,
            data: {
              ...generateToken,
              user: payload,
            },
          });
        }
        return res.status(200).json({ success: false });
      }
      return res.status(200).json({ success: false });
    } catch (error) {
      throw error;
    }
  }
  async createQrLogin(req, res) {
    const now = new Date();
    const textRandom = generateRandomString(10);
    const token = `${now.getTime()}${textRandom}`;
    let qr = await QRCode.toDataURL(token);
    await AuthQr.create({ token, ok: false, userId: null });
    return res.status(200).json(qr);
  }

  async confirmLoginQr(req, res) {
    let { token } = req.body;
    let qr = await AuthQr.findOne({ token });
    if (!qr) {
      return res.status(500).json({ message: "Mã đăng nhập hết hạn" });
    } else {
      await AuthQr.updateOne(
        { _id: qr._id },
        { ok: true, userId: req.user.id }
      );
      return res.status(200).json({ success: true });
    }
  }
}
export default new AuthController();
