import { statusMessage } from "../config/index.js";
import { sendEmail, sendEmailToAdmin } from "../middleware/sendGmailMiddleware.js";
import { Models } from "../model/index.js";

class BookingController {
    //MEAN: Query a Booking
    static async getBooking(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const booking = await Models.booking.findById(req.params._id);
            if (!booking) {
                return res.status(400).json({ msg: statusMessage.BOOKING_NOT_FOND })
            };

            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, booking });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    //MEAN: Query Booking with booking status
    static async getBookings(req, res) {
        try {
            const bookingStatus = req.query.bookingStatus;
            let booking

            //MEAN: if user input bookingStatus then query with status but not input Query all
            if (bookingStatus) {
                booking = await Models.booking.find({ bookingStatus })
            }
            else {
                booking = await Models.booking.find({})
            }
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, booking });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    //MEAN: Create booking with home or apartment user input
    static async createBooking(req, res) {
        try {
            if (!req.body) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }

            //MEAN: Add ID user who is create this booking
            const data = {
                ...req.body,
                createdBy: req.payload._id.toString()
            };
            const booking = await Models.booking.create(data);
            return res.status(201).json({ msg: statusMessage.CREATE_SUCCESS, booking});
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    //MEAN: Update to booking status to process
    static async updateToProcess(req, res) {
        try {
            const { _id, email } = req.body;
            if (!_id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const statusBooking = await Models.booking.findById(_id)
            if (statusBooking.bookingStatus !== "BOOKING") {
                return res.status(400).json({ msg: statusMessage.PERMISSION_DENIED })
            }
            const emailInfo = await sendEmailToAdmin(email, `${statusMessage.BOOKING_MESSAGE} ${email}`);
            const data = {
                ...req.body,
                bookingStatus: "PROCESS"
            }
            const booking = await Models.booking.findByIdAndUpdate(
                _id,
                { $set: data },
                { new: true }
            );
            if (!booking) {
                return res.status(404).json({ msg: statusMessage. BOOKING_NOT_FOND});
            }
            return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, result: {booking, email: `ມີການຈອງເຂົ້າໃໝ່ຈາກ ${email} ສະຖານະ ${emailInfo}` }});
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    //MEAN: Update the booking status to success or cancel
    static async updateEnd(req, res) {
        try {
            const { _id, bookingStatus } = req.body;
            if (!_id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            const customerBooking = await Models.booking.findById(_id)
            if (customerBooking.bookingStatus !== "PROCESS") {
                return res.status(400).json({ msg: statusMessage.PERMISSION_DENIED })
            }
            const customerEmail = customerBooking.email
            let emailInfo
            if (bookingStatus == "SUCCESS") {
                emailInfo = await sendEmail(customerEmail, statusMessage.BOOKING_SUCCESS);
            }
            else{
                emailInfo = await sendEmail(customerEmail, statusMessage.BOOKING_CANCEL);
            }

            //MEAN: Add ID admin who is update this booking then update date time
            const data = {
                ...req.body,
                bookingStatus,
                updatedBy: req.payload._id.toString(),
                updatedAt: Date.now()
            }
            const booking = await Models.booking.findByIdAndUpdate(
                _id,
                { $set: data },
                { new: true }
            );
            if (!booking) {
                return res.status(404).json({ msg: statusMessage.BOOKING_NOT_FOND });
            }
            return res.status(200).json({ msg: statusMessage.UPDATE_SUCCESS, result:{booking, email:` ສົ່ງ Gmail ສຳເລັດໄປທີ່ ${customerEmail} ສະຖານະ ${emailInfo}`  }});
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    //MEAN: Delete the booking
    static async deleteBooking(req, res) {
        try {
            if (!req.params._id) {
                return res.status(400).json({ msg: statusMessage.BAD_REQUEST });
            }
            await Models.booking.findByIdAndDelete(req.params._id);
            return res.status(200).json({ msg: statusMessage.DELETE_SUCCESS });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }
}

export default BookingController