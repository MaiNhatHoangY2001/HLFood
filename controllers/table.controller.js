const Table = require('../model/Table.model');
const Employee = require('../model/Employee.model');
const Order = require('../model/Order.model');

const tableController = {
	addTables: async (req, res) => {
		try {
			const numTables = parseInt(req.body.numTables);
			const floor = parseInt(req.body.floor);
			const chair = parseInt(req.body.chair);

			const newTables = [];
			for (let i = 0; i < numTables; i++) {
				const tables = await Table.find();
				const newTable = new Table(getTableMissing(tables, floor, chair));
				const tableAdd = await newTable.save();
				newTables.push(tableAdd);
			}
			res.status(200).json(newTables);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	updateNumTable: async (_req, res) => {
		try {
			const tables = await Table.find({ is_deleted: false }).sort('table_num is_deleted');

			let currentNum = 1;
			for (const table of tables) {
				table.table_num = currentNum;
				await Table.findByIdAndUpdate(table._id, table);
				currentNum++;
			}
			const updateTables = await Table.find({ is_deleted: false }).sort('table_num is_deleted');

			res.status(200).json(updateTables);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	updateTable: async (req, res) => {
		try {
			const table = Table.findById(req.query.id);
			await table.updateOne({
				$set: {
					floor: req.body.floor,
					chair: req.body.chair,
				},
			});
			res.status(200).json('Update successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	deleteTable: async (req, res) => {
		try {
			const ids = req.query.ids.split(',');

			for (const id of ids) {
				await Table.updateOne(
					{ _id: id },
					{
						$set: {
							is_deleted: true,
						},
					}
				);
			}

			res.status(200).json('Delete successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	getAllTable: async (req, res) => {
		try {
			const listTable = await Table.find(req.query).populate('employee').sort('table_num is_deleted');
			res.status(200).json(listTable);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	updateStatus: async (req, res) => {
		try {
			const table = Table.findById(req.query.id);
			await table.updateOne({ $set: { status: req.body.status } });
			res.status(200).json('Update successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	setEmpTable: async (req, res) => {
		try {
			const empId = req.body.empId;
			const tablesInput = req.body.tables.split(',').map(Number);

			//Update employee in table
			const listTableWithNum = Table.find({ table_num: { $in: tablesInput } });
			await Table.updateMany({ employee: empId }, { $unset: { employee: 1 } });
			await Table.updateMany({ table_num: { $in: tablesInput } }, { $set: { employee: empId } });

			//Update tables in employee
			const employee = Employee.findById(empId);
			const arrayIds = await listTableWithNum.distinct('_id');
			await employee.updateOne({ $set: { tables: arrayIds } });

			res.status(200).json('Update successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	udpateTableOrder: async (req, res) => {
		try {
			const idOrder = req.body.order_id;

			const orders = await Order.findById(idOrder);
			const idTables = orders?.tables;

			await deleteTableOrder(idTables, idOrder);

			await addTableOrder(req.body.table, idOrder, req.body.status);

			res.status(200).json('Update successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

async function deleteTableOrder(idTables, idOrder) {
	for (const id of idTables) {
		await Table.updateOne({ _id: id }, { $unset: { order: 1 }, $set: { status: 0 } });
	}
	await Order.updateOne({ _id: idOrder }, { $unset: { tables: 1 } });
}

async function addTableOrder(idTables, idOrder, status) {
	for (const id of idTables) {
		await Table.updateOne({ _id: id }, { $set: { order: idOrder, status: status } });
	}
	await Order.updateOne({ _id: idOrder }, { $set: { tables: [...idTables] } });
}

function getTableMissing(existingArray, floor, chair) {
	const existingNums = existingArray.map((item) => item.table_num);
	const maxNum = Math.max(...existingNums);
	let newNum = maxNum + 1;

	for (const item of existingArray) {
		if (item.is_deleted) {
			const isTableAdd = existingArray.filter((table) => table.table_num == item.table_num);
			if (isTableAdd.length === 1) {
				newNum = item.table_num;
			}
		}
	}

	return { table_num: newNum, status: 0, floor: floor, chair: chair };
}

module.exports = tableController;
