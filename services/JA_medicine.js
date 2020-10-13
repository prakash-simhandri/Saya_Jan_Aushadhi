const JA_Medicine = require('../models/JA_medicine');
module.exports = class JAmedicineService {

    async findAll(MED_Name) {
        const JAmedicine_details = await JA_Medicine.query(txn);
        return JAmedicine_details;
    }
    async findMedicineInfo(Drug_Code){
         return await JA_Medicine.query().select("Drug_Code","Database_Comp","Packet","MRP").where({Drug_Code})
    }
};
