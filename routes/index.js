const { response } = require('express');
var express = require('express');
var router = express.Router();
const MedicineService = require('../services/medicine')
const JAmedicineService = require('../services/JA_medicine')
const JA_Services = new JAmedicineService()
const Services = new MedicineService()

/* GET home page. */
router.post('/medicine/names', async function (req, res, next) {
  const data = await Services.findMedicineNames(req.body)
  res.json({ data })
});

router.post("/medicine/details", async (req, res) => {
  const medicineInfo = await Services.findMedicineInfo(req.body.userchoice)
  const {Composition,Price} = medicineInfo[0];
  console.log(medicineInfo);
  var R = require("r-script");
   await R("./Rscript/Engine_Temp.R")
  .data({NewData: medicineInfo[0].NameID})
  .call(async function(err, d) {
    if (err) throw err;
    if (d === '404' || d.length === 0) {
      console.log("error");
      res.json({"Error":"Not Found"})
    }else{
      console.log(Object.keys(d[0])[0]);
      const JAmedicine = await JA_Services.findMedicineInfo(Object.keys(d[0])[0])
      // console.log(Object.assign({}, JAmedicine[0], { "NameID":req.body.userchoice,Composition,Price}));
      res.json([Object.assign({}, JAmedicine[0], { "NameID":req.body.userchoice,Composition,Price})])
    }
  });
})

// router.post("/rscript",async (req, res) => {
// var R = require("r-script");
//  await R("./R/Engine_Temp.R")
//   .data({NewData: "alphamix-bt_51692"})
//   .call(function(err, d) {
//     console.log(err);
//     if (err) throw err;
//     console.log(d);
//   });
//   res.send("Hello")
  
// })

module.exports = router;