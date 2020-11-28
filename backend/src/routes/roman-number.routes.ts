import { Request, Response, Router } from "express";
import { param, validationResult } from "express-validator";
import { IntegerToRomanNumberService } from "../use_cases/integer-to-roman-number.service";

export const romanNumberRouter = Router();
const integerToRomanNumber = new IntegerToRomanNumberService();

romanNumberRouter.get(
  "/roman-number/:integer",
  [
    param("integer")
      .isInt({min: 0, max: 100})
      .withMessage("Must be an integer between 0 and 100")
  ],
  (request: Request, response: Response) => {
    const validationErrors = validationResult(request);
    if (!validationErrors.isEmpty()) {
      return response.status(400).json({errors: validationErrors.array()});
    }

    const integer: number = parseInt(request.params.integer, 10);

    return response.json(integerToRomanNumber.perform(integer));
  }
);
