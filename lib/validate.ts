import Validator from "validatorjs";

interface ValidationResult {
  success: boolean;
  data: string | null;
}

function validateData(
  body: Record<string, any>, 
  rules: Record<string, string | any[]>,
  messages?: Record<string, string> 
): ValidationResult {
  const validator = new Validator(body, rules, messages);

  if (validator.fails()) {
    const errorObject = validator.errors.all();
    const firstKey = Object.keys(errorObject)[0];

    const errorMessage = errorObject[firstKey][0];
    return { success: false, data: errorMessage };
  }

  return { success: true, data: null };
}

export default validateData;
