const Table = require("../model/Table.model");
const Employee = require("../model/Employee.model");
const Order = require("../model/Order.model");


const tableController = {

    getAllTable: async (req, res) => {
        try {

            const listTable = await Table.find(req.query);

            res.status(200).json(listTable);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    updateStatus: async (req, res) => {
        try {
            const table = Table.findById(req.query.id);
            await table.updateOne({ $set: { "status": req.body.status } });
            res.status(200).json("Update successfully");
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
    udpateTableOrder: async (req, res) => {
        try {
            const idOrder = req.body.order_id;

            const orders = await Order.findById(idOrder);
            const idTables = orders?.tables;

            await deleteTableOrder(idTables, idOrder)

            await addTableOrder(req.body.table, idOrder, req.body.status)

            res.status(200).json("Update successfully");
        } catch (error) {
            res.status(500).json(error);
        }
    }
};


async function deleteTableOrder(idTables, idOrder) {
    for (const id of idTables) {
        await Table.updateOne({ _id: id }, { $unset: { order: 1 }, $set: { status: 0 } })
    }
    await Order.updateOne({ _id: idOrder }, { $unset: { tables: 1 } })
}

async function addTableOrder(idTables, idOrder, status) {
    for (const id of idTables) {
        await Table.updateOne({ _id: id }, { $set: { order: idOrder, status: status } })
    }
    await Order.updateOne({ _id: idOrder }, { $set: { tables: [...idTables] } })
}


module.exports = tableController;
