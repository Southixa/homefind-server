import { statusMessage } from "../config/index.js";
import queryWithWhere from "../middleware/searchMiddleware.js";
import { Models } from "../model/index.js";

class ApartmentController {
    static async getApartment(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const apartment = await Models.apartment.findById(req.params._id);
            if (!apartment) {
                return res.status(400).json({ msg: statusMessage.APARTMENT_NOT_FOND })
            };

            //MEAN: Plus field views when click to view details
            await Models.apartment.findByIdAndUpdate(req.params._id, { $inc: { views: 1 } }, { new: true })
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, apartment });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getApartmentsByCustomer(req, res) {
        try {
            const search = req.query;

            //MEAN: Query with where By search
            const _where = queryWithWhere(search);

            //MEAN: Query only the apartmentStatus is true and with conditional where
            const apartment = await Models.apartment.find({ apartmentStatus: true, ..._where });
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, apartment });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async getApartmentsByAdmin(req, res) {
        try {
            const apartmentStatus = req.query.apartmentStatus;
            let apartment

            //MEAN: if user input apartmentStatus then query with status but not input Query all
            if (apartmentStatus) {
                apartment = await Models.apartment.find({ apartmentStatus })
            }
            else {
                apartment = await Models.apartment.find({})
            }
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, apartment });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async createApartment(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }

            //MEAN: Add ID admin who is create this apartment
            const data = {
                ...req.body,
                createdBy: req.payload._id.toString()
            };
            const apartment = await Models.apartment.create(data);
            return res.status(201).json({ msg: statusMessage.CREATE_SUCCESS, apartment });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async updateApartment(req, res) {
        try {
            const { _id } = req.body;
            if (!_id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }

            //MEAN: Add ID admin who is update this apartment then update date time
            const data = {
                ...req.body,
                updatedBy: req.payload._id.toString(),
                updatedAt: Date.now()
            };
            const apartment = await Models.apartment.findByIdAndUpdate(
                _id,
                { $set: data },
                { new: true }
            );
            if (!apartment) {
                return res.status(404).json({ msg: statusMessage.NOT_FOUND });
            }
            return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, apartment });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }


    static async deleteApartment(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            await Models.apartment.findByIdAndDelete(req.params._id);
            return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }
}

export default ApartmentController