import bcrypt from "bcrypt"
import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";

class UserController {
    static async getProfile(req, res) {
        try {
            if (!req.payload._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const user = await Models.user.findById(req.payload._id);
            if (!user) {
                return res.status(400).json({ msg: statusMessage.USER_NOT_FOUND })
            };
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, user });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getUser(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const user = await Models.user.findById(req.params._id);
            if (!user) {
                return res.status(400).json({ msg: statusMessage.USER_NOT_FOUND })
            };
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, user });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getUsers(req, res) {
        try {
            const user = await Models.user.find({})
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, user });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async createUser(req, res) {
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
            let hash = await bcrypt.hash(req.body.password, 10);
            const newData = {
                ...req.body,
                password: hash,
                createdBy: req.payload._id.toString()
            };

            //MEAN: Create user
            const user = await Models.user.create(newData);
            
            //MEAN: Return user data without the password field
            const { password, ...others } = user._doc;

            return res.status(200).json(...others)
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async updateUser(req, res) {
        try {
            const { _id } = req.body;
            if (!_id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const data = {
                ...req.body,
                updatedBy: req.payload._id.toString(),
                updatedAt: Date.now()
            };
            const user = await Models.user.findByIdAndUpdate(
                _id,
                { $set: data },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ msg: statusMessage.NOT_FOUND });
            }

            //MEAN: Return user data without the password field
            const { password, ...others } = user._doc;

            return res.status(200).json({msg: statusMessage.UPDATE_SUCCESS,...others})
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async forgetPassword(req, res) {
        try {
            const { phoneNumber, newPassword } = req.body;
            if (!phoneNumber && !newPassword) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }

            const userPhoneNumber = await Models.user.findOne({phoneNumber})
            if(!userPhoneNumber){
                return res.status(400).json({msg: statusMessage.PASSWORD_NOT_MATCH})
            }

            let hash = await bcrypt.hash(newPassword, 10);
            const newData = {
                ...req.body,
                password: hash,
                updatedAt: Date.now()
            };

            const user = await Models.user.findByIdAndUpdate(
                userPhoneNumber._id,
                { $set: newData },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ msg: statusMessage.NOT_FOUND });
            }

            //MEAN: Return user data without the password field
            const { password, ...others } = user._doc;

            return res.status(200).json({msg: statusMessage.UPDATE_SUCCESS,...others})
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async updatePassword(req, res) {
        try {
            const _id = req.payload._id
            const { oldPassword, newPassword } = req.body;
            if (!oldPassword && !newPassword) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }

            const user = await Models.user.findById({_id})
            if(!user){
                return res.status(400).json({msg: statusMessage.USER_NOT_FOUND})
            }
             //MEAN: Compare password between login and register
             let comparePWD = await bcrypt.compare(oldPassword, user.password); // Use the renamed variable passwordInput here
             if (!comparePWD) {
                 return res.status(400).json({ msg: statusMessage.PASSWORD_NOT_MATCH });
             }

            let hash = await bcrypt.hash(newPassword, 10);
            const newData = {
                ...req.body,
                password: hash,
                updatedBy: req.payload._id.toString(),
                updatedAt: Date.now()
            };

            const userUpdate = await Models.user.findByIdAndUpdate(
                _id,
                { $set: newData },
                { new: true }
            );
            if (!userUpdate) {
                return res.status(404).json({ msg: statusMessage.NOT_FOUND });
            }

            //MEAN: Return user data without the password field
            const { password, ...others } = userUpdate._doc;

            return res.status(200).json({msg: statusMessage.UPDATE_SUCCESS,...others})
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async deleteUser(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            await Models.user.findByIdAndDelete(req.params._id);
            return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }
}

export default UserController