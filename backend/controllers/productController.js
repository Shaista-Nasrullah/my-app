import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import orderModel from "../models/orderModel.js";
import { uploadOnCloudinary } from "../helpers/cloudinary.js";
import slugify from "slugify";

import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    if (
      [name, description, price, category, quantity].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }
   

    const photooneLocalPath = req.files?.photo2?.[0]?.path;

    let phototwoLocalPath;

    if (
      req.files &&
      Array.isArray(req.files.photo3) &&
      req.files.photo3.length > 0
    ) {
      phototwoLocalPath = req.files.photo3[0].path;
    }

    if (!photooneLocalPath) {
      return res.status(400).send({
        message: "First photo of product is required",
      });
    }
   

    const photo2 = await uploadOnCloudinary(photooneLocalPath);
    if (!photo2) {
      return res.status(400).send({
        message: "Error uploading the first photo",
      });
    }

    const photo3 = await uploadOnCloudinary(phototwoLocalPath);
  

    const product = await productModel.create({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      photo2: photo2.url,
      photo3: photo3?.url || "",
      quantity,
    });

    return res.status(201).send({
      success: true,
      message: "New product created",
      product,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while registering product",
    });
  }
};

//get products
export const getProductsController = async (req, res) => {
  try {
    const products = await productModel.find({}).populate("category");
    res.status(200).json({
      success: true,
      totalProducts: products.length,
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error while getting products",
      error: error.message,
    });
  }
};

//get single product
export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .populate("category");

    console.log("Populated Product:", product);

    res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while single product",
      error: error.message,
    });
  }
};

//to delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params._id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error: error.message,
    });
  }
};

//upadte product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;

    // Check if all required fields are provided
    if (
      [name, description, price, category, quantity].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).send({
        message: "All fields are required!",
      });
    }

    // Find the existing product by ID or some unique identifier (e.g., slug)
    const productId = req.params._id; // Assuming the product ID is passed in the URL
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the product name or description is already taken by another product
    const existingProduct = await productModel.findOne({
      $or: [{ name }, { description }],
      _id: { $ne: productId }, // Exclude the current product from the check
    });

    if (existingProduct) {
      return res.status(409).send({
        success: false,
        message: "Product already exists with this name or description",
      });
    }

    // Handle file uploads for photo2 and photo3
    const photooneLocalPath = req.files?.photo2?.[0]?.path;
    const phototwoLocalPath = req.files?.photo3?.[0]?.path;

    let photo2Url = product.photo2; // Use existing photo2 URL if no new file is provided
    let photo3Url = product.photo3; // Use existing photo3 URL if no new file is provided

    if (photooneLocalPath) {
      const photo2 = await uploadOnCloudinary(photooneLocalPath);
      if (!photo2) {
        return res.status(400).send({
          message: "Error uploading the second photo",
        });
      }
      photo2Url = photo2.url;
    }

    if (phototwoLocalPath) {
      const photo3 = await uploadOnCloudinary(phototwoLocalPath);
      if (!photo3) {
        return res.status(400).send({
          message: "Error uploading the third photo",
        });
      }
      photo3Url = photo3.url;
    }

    // Update the product with the new data
    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      {
        name,
        slug: slugify(name),
        description,
        price,
        category,
        photo2: photo2Url,
        photo3: photo3Url,
        quantity,
      },
      { new: true } // Return the updated product
    );

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({
      success: false,
      error,
      message: "Error while updating product",
    });
  }
};
//filters
export const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error while filtering products",
      error,
    });
  }
};

//product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in products count",
      error,
    });
  }
};

// search
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("name description price photo2 slug");
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in search Product API",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 20;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("name description price photo2 slug")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      // .select(" _id name description price photo2 slug")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error getting related product",
      error,
    });
  }
};

//get product by category
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error getting category wise product",
      error,
    });
  }
};

//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart, paymentMethod } = req.body; // Include paymentMethod in the request
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: {
              method: paymentMethod, // Save the payment method
              success: result.success,
            },
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
