import bcrypt from "bcrypt"
import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";
import { GenerateToken } from "../middleware/authMiddleware.js";

class AuthController {
    static async registerUser(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST })
            }
            const { phoneNumber } = req.body

            //MEAN: Check exist user before register
            const checkexist = await Models.user.findOne({ phoneNumber });
            if (checkexist) {
                return res.status(400).json({ msg: statusMessage.USER_ALREADY_EXIST })
            }
            let hash = await bcrypt.hash(phoneNumber, 10);
            const newData = {
                ...req.body,
                password: hash,
            };

            //MEAN: Create user
            const user = await Models.user.create(newData);
            const payload = {
                _id: user._id,
                role: user.role
            };

            //MEAN: generate token
            const accessToken = await GenerateToken(payload);
            
            //MEAN: Return user data without the password field
            const { password, ...others } = user._doc;

            return res.status(200).json({
                accessToken,
                ...others
            })

        } catch (error) {
            return res.status(500).json(error)
        }
    }
    static async login(req, res) {
        try {
            const { phoneNumber, password: passwordInput } = req.body; // Rename the password variable to passwordInput
            if (!phoneNumber || !passwordInput) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const user = await Models.user.findOne({ phoneNumber });
            if (!user) {
                return res.status(400).json({ msg: statusMessage.USER_NOT_FOUND });
            }

            //MEAN: Compare password between login and register
            let comparePWD = await bcrypt.compare(passwordInput, user.password); // Use the renamed variable passwordInput here
            if (!comparePWD) {
                return res.status(400).json({ msg: statusMessage.PASSWORD_NOT_MATCH });
            }

            const payload = {
                _id: user._id,
                role: user.role
            };

            //MEAN: Generate token
            const accessToken = await GenerateToken(payload);

            //MEAN: Return user data without the password field
            const { password, ...others } = user._doc;
            return res.status(200).json({
                accessToken,
                ...others
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default AuthController