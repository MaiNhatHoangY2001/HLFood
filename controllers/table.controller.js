const Table = require("../model/Table.model");
const Employee = require("../model/Employee.model");

const tableController = {

    getAllTable: async (req, res) => {
        try {

            const listTable = await Table.find(req.query);
            
            res.status(200).json(listTable);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    setEmpTable: async (req, res) => {
        try {
            const empId = req.body.empId;
            const tablesInput = req.body.tables.split(",").map(Number);

            //Update employee in table
            const listTableWithNum = Table.find({ "table_num": { "$in": tablesInput } });
            await Table.updateMany({ "table_num": { "$in": tablesInput } }, { $set: { employee: empId } });

            //Update tables in employee
            const employee = Employee.findById(empId);
            const arrayIds = await listTableWithNum.distinct("_id");
            await employee.updateOne({ $set: { tables: arrayIds } })

            res.status(200).json("Update successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    },
};

module.exports = tableController;
