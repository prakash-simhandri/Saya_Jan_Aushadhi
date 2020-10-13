const Medicine = require('../models/medicine');
module.exports = class MedicineService {

    async findAll(txn) {
        const medicine_details = await Medicine.query(txn);
        return medicine_details;
    }
    async findMedicineNames(UserDemand){
        const medicineNames = await Medicine.query().select("NameID").where("NameID","like",UserDemand.demand+"%")
        const scaling = medicineNames.map(el =>{
            const value = el.NameID.split("_")[0]
            return {"NameID":value}
        })
        return scaling;
    }
    async findMedicineInfo(NameID){
        const medicineData = await Medicine.query().select("*").where("NameID","like",NameID+"%")
        const MedicineList = medicineData.map(el=>{
            const scaling = el.NameID.split("_")[0]
            if (scaling === NameID) {
                return el
            }
        })
        return MedicineList;
    }
};
