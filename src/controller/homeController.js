import { statusMessage } from "../config/index.js";
import queryWithWhere from "../middleware/searchMiddleware.js";
import { Models } from "../model/index.js";

class HomeController {
    static async getHome(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const home = await Models.home.findById(req.params._id);
            if (!home) {
                return res.status(400).json({ msg: statusMessage.HOME_NOT_FOND })
            };
            await Models.home.findByIdAndUpdate(req.params._id, { $inc: { views: 1 } }, { new: true })
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, home });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getHomesByCustomer(req, res) {
        try {
            const search = req.query;
            const _where = queryWithWhere(search);
            const home = await Models.home.find({ homeStatus: true, ..._where });
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, home });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getHomesByAdmin(req, res) {
        try {
            const homeStatus = req.query.homeStatus;
            let home
            if (homeStatus) {
                home = await Models.home.find({ homeStatus })
            }
            else {
                home = await Models.home.find({})
            }
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, home });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async createHome(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const data = {
                ...req.body,
                createdBy: req.payload._id.toString()
            };
            const home = await Models.home.create(data);
            return res.status(201).json({ msg: statusMessage.CREATE_SUCCESS, home });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async updateHome(req, res) {
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
            const home = await Models.home.findByIdAndUpdate(
                _id,
                { $set: data },
                { new: true }
            );
            if (!home) {
                return res.status(404).json({ msg: statusMessage.NOT_FOUND });
            }
            return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, home });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }


    static async deleteHome(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            await Models.home.findByIdAndDelete(req.params._id);
            return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }
}

export default HomeController