import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";

class CheckoutController {
    static async getCheckout(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const checkout = await Models.checkout.findById(req.params._id);
            if (!checkout) {
                return res.status(400).json({ msg: statusMessage.CHECKOUT_NOT_FOND })
            };
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, checkout });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getCheckouts(req, res) {
        try {
            const checkout = await Models.checkout.find({})
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, checkout });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async createCheckout(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const data = {
                ...req.body,
                createdBy: req.payload._id.toString()
            };
            const checkout = await Models.checkout.create(data);
            return res.status(201).json({ msg: statusMessage.CREATE_SUCCESS, checkout });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async updateCheckout(req, res) {
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
            const checkout = await Models.checkout.findByIdAndUpdate(
                _id,
                { $set: data },
                { new: true }
            );
            if (!checkout) {
                return res.status(404).json({ msg: statusMessage.NOT_FOUND });
            }
            return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, checkout });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async deleteCheckout(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            await Models.checkout.findByIdAndDelete(req.params._id);
            return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }
}

export default CheckoutController