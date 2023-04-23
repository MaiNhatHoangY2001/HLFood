const Receipt = require("../model/Receipt.model");

const receiptController = {
    getAllReceipt: async (req, res) => {
        try {
            const receipt = await Receipt.find();

            res.status(200).json(receipt);
        } catch (error) {
            res.status(500).json(error);
        }
    },

}



module.exports = receiptController;