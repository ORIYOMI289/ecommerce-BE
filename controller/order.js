const order = require('../models/order')

//create order
exports.newOrder = async (req, res) => {
   const newOrder = new order(req.body);
   try {
       await newOrder.save((err, success) => {
           if (err) {console.log(err)}
       }) 
       res.status(200).json(newOrder)
   } catch (err) {
       console.log(err)
   }

}

//get Order
exports.Order = async (req, res) => {
    try {
        const Order = await order.findOne(req.params.userId) ;
        res.satus(200).json(Order)
    } catch (err) { console.log(err)}
 }

//get Orders
exports.Orders = async (req, res) => {
   try {
       const orders = await order.find() ;
       res.satus(200).json(orders)
   } catch (err) { console.log(err)}
}

//update Order

exports.updateOrder = async (req, res) => {
   try {
      const update = await cart.findByIdAndUpdate(req.params.userId, { $set: req.body})
      res.satus(200).json(update)
   } catch (err) { console.log(err)}
}

//delete Order
exports.deleteOrder= async (req, res) => {
   try {
       const deleteOrder = await cart.findByIdAndDelete(req.params.userId)
       res.satus(200).json(deleteOrder)
    } catch (err) { console.log(err)}

}


//getMonthlyStats

exports.MonthlyStats= async (req, res) => {
    const date = new Date()
        const lstMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(date().setMonth(lstMonth.getMonth() - 1))

    try {
        const income = await order.aggregate([
            { $match: { createdAt: {$gte: previousMonth}}},
            { $project: {
                month: { $month: "$createdAt"},
                sales: "$amount"
            }},
            {
                $group: {
                    _id: "$month",
                    total : {$sum: "$sales"}
                }
            }
        ])
        res.satus(200).json(income)

    } catch (err) { console.log(err)}
 
}