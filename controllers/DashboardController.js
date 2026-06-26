const Product = require("../db_schema/product");
const Supplier = require("../db_schema/supplier");
const Location = require("../db_schema/location");
const Receipt = require("../db_schema/Receipt");
const Outbound = require("../db_schema/outbound");

exports.GetDashboardData = async (req, res) => {
  try {
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const endOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const [
      totalProducts,
      totalSuppliers,
      totalLocations,
      products,
      receiptsToday,
      outboundToday,
      recentReceipts,
      recentOutbound
    ] = await Promise.all([
      Product.countDocuments(),
      Supplier.countDocuments(),
      Location.countDocuments(),
      Product.find({}),
      Receipt.countDocuments({
        ReceivedDate: {
          $gte: startOfToday,
          $lt: endOfToday
        }
      }),
      Outbound.countDocuments({
        OutboundDate: {
          $gte: startOfToday,
          $lt: endOfToday
        }
      }),
      Receipt.find({})
        .populate("SupplierId")
        .sort({ ReceivedDate: -1 })
        .limit(5),
      Outbound.find({})
        .populate("CustomerId")
        .sort({ OutboundDate: -1 })
        .limit(5)
    ]);

    const totalStockQuantity = products.reduce(
      (total, product) => total + Number(product.Quantity || 0),
      0
    );

    const lowStockProducts = products.filter(
      (product) =>
        Number(product.Quantity || 0) > 0 &&
        Number(product.Quantity || 0) <=
          Number(product.MinimumStock || 0)
    );

    const outOfStockProducts = products.filter(
      (product) => Number(product.Quantity || 0) === 0
    );

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalProducts,
          totalStockQuantity,
          totalSuppliers,
          totalLocations,
          lowStockCount: lowStockProducts.length,
          outOfStockCount: outOfStockProducts.length,
          receiptsToday,
          outboundToday
        },

        lowStockProducts: lowStockProducts.slice(0, 10),

        recentReceipts,

        recentOutbound
      }
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
};