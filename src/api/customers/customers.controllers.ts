import { Request, Response } from "express";
import Customers from "./customer.model.js";

const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customers.find();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customers.create(req.body);
    return res.status(201).json(customer);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createCustomer, getAllCustomers };
