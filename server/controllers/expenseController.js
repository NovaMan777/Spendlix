const writeXLSX = require("xlsx");
const Expense = require("../models/Expense");

//Add Expense source
exports.addExpense = async (req, res) => {
  const userId = req.user._id;

  try {
    const { icon, category, amount, date } = req.body;

    //validation:check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

//Get All Expense source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//Delete Income source
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense source deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    //Prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = writeXLSX.utils.book_new();
    const ws = writeXLSX.utils.json_to_sheet(data);
    writeXLSX.utils.book_append_sheet(wb, ws, "Expense");
    writeXLSX.writeFile(wb, "expense_details.xlsx");
    res.download("expense_details.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
