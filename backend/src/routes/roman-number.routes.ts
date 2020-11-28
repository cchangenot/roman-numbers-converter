import { EventEmitter } from "events";
import { Request, Response, Router } from "express";
import { param, validationResult } from "express-validator";
import { RomanNumber } from "../domain/roman-number";
import { IntegerToRomanNumberService } from "../use_cases/integer-to-roman-number.service";

export const romanNumberRouter = Router();
const integerToRomanNumber = new IntegerToRomanNumberService();
const romanNumberEmitter = new EventEmitter();
const PUSH_ROMAN_NUMBER_EVENT = "push-roman-number";

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
    romanNumberEmitter.emit(PUSH_ROMAN_NUMBER_EVENT, integerToRomanNumber.perform(integer));

    return response.status(202).end();
  }
);

romanNumberRouter.get(
  "/roman-number",
  (request: Request, response: Response) => {
    response.set({
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
      "Connection": "keep-alive"
    });

    response.flushHeaders();
    response.write("retry: 2000\n\n");

    romanNumberEmitter.on(PUSH_ROMAN_NUMBER_EVENT, (data: RomanNumber) => {
      response.write(`data: ${JSON.stringify(data)}\n\n`);
    });
  }
);
