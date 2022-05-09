import Joi from 'joi'
import {returnErrorResponse} from '../helpers'

export const registerValidation = async (req, res, next) => {
    try {
      
  
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        password:Joi.string().required()
      });
      const { value, error } = await schema.validateAsync(req.body);
  
      if (error) {
        return returnErrorResponse(error.message, res);
      }
      next(value);
    } catch (error) {
      return returnErrorResponse(error.message, res);
    }

  }
export const loginValidation = async (req, res, next) => {
        try {
          
      
          const schema = Joi.object({
            
            email: Joi.string().required().email(),
            password:Joi.string().required()
          });
          const { value, error } = await schema.validateAsync(req.body);
      
          if (error) {
            return returnErrorResponse(error.message, res);
          }
          next(value);
        } catch (error) {
          return returnErrorResponse(error.message, res);
        }
      }