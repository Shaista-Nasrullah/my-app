//routes
import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  brainTreePaymentController,
  braintreeTokenController,
  createProductController,
  deleteProductController,
  getProductController,
  getProductsController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

// Use the upload middleware in the route
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload,
  createProductController
);

//get all products
router.get("/get-products", getProductsController);

//get single products
router.get("/get-product/:slug", getProductController);

//update product
router.put(
  "/update-product/:_id",
  requireSignIn,
  isAdmin,
  upload,
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:_id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//filter product
router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//search product
router.get("/search/:keyword", searchProductController);

//products per page
router.get("/product-list/:page", productListController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//Category wise product
router.get("/product-category/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router;
