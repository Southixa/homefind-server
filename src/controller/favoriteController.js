import { statusMessage } from "../config/index.js";
import { Models } from "../model/index.js";

class FavoriteController {

    static async getFavorites(req, res) {
        try {
            const favorite = await Models.favorite.find({createdBy: req.payload._id})
            return res.status(200).json({ msg: statusMessage.GET_SUCCESS, favorite });
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }

    static async createFavorite(req, res) {
        try {
            const favoriteData = await Models.favorite.findOne({
                $or: [
                    { home: req.body.home },
                    { apartment: req.body.apartment }
                ],
                createdBy: req.payload._id
            });
            if(favoriteData){
                const data = {
                    ...req.body,
                    createdBy: req.payload._id.toString()
                };
                const favorite = await Models.favorite.create(data);
                return res.status(201).json({ msg: statusMessage.CREATE_SUCCESS, favorite });
            }
            await Models.favorite.findByIdAndDelete({_id: favoriteData._id})
            return res.status(400).json({msg: statusMessage.DELETE_SUCCESS})            
        } catch (error) {
            return res.status(500).json({ msg: statusMessage.SERVER_ERROR, error });
        }
    }
}

export default FavoriteController