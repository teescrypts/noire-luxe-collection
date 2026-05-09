export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

function err(field: string, message: string): ValidationError {
  return { field, message };
}

// ── Field validators ──────────────────────────────────────

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isPhone(value: string): boolean {
  return /^[\+]?[\d\s\-\(\)]{7,15}$/.test(value.trim());
}

export function isStrongPassword(value: string): boolean {
  return value.length >= 8;
}

export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0;
}

export function isPositiveNumber(value: number): boolean {
  return typeof value === "number" && value > 0;
}

export function isValidZip(value: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(value.trim());
}

export function isValidSlug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

// ── Form validators ───────────────────────────────────────

export function validateRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.firstName)) {
    errors.push(err("firstName", "First name is required."));
  } else if (data.firstName.trim().length < 2) {
    errors.push(err("firstName", "First name must be at least 2 characters."));
  }

  if (!isNonEmpty(data.lastName)) {
    errors.push(err("lastName", "Last name is required."));
  } else if (data.lastName.trim().length < 2) {
    errors.push(err("lastName", "Last name must be at least 2 characters."));
  }

  if (!isNonEmpty(data.email)) {
    errors.push(err("email", "Email is required."));
  } else if (!isEmail(data.email)) {
    errors.push(err("email", "Please enter a valid email address."));
  }

  if (!isNonEmpty(data.password)) {
    errors.push(err("password", "Password is required."));
  } else if (!isStrongPassword(data.password)) {
    errors.push(err("password", "Password must be at least 8 characters."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateLogin(data: {
  email: string;
  password: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.email)) {
    errors.push(err("email", "Email is required."));
  } else if (!isEmail(data.email)) {
    errors.push(err("email", "Please enter a valid email address."));
  }

  if (!isNonEmpty(data.password)) {
    errors.push(err("password", "Password is required."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateContact(data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.name)) {
    errors.push(err("name", "Name is required."));
  } else if (data.name.trim().length < 2) {
    errors.push(err("name", "Name must be at least 2 characters."));
  }

  if (!isNonEmpty(data.email)) {
    errors.push(err("email", "Email is required."));
  } else if (!isEmail(data.email)) {
    errors.push(err("email", "Please enter a valid email address."));
  }

  if (!isNonEmpty(data.message)) {
    errors.push(err("message", "Message is required."));
  } else if (data.message.trim().length < 10) {
    errors.push(err("message", "Message must be at least 10 characters."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateCheckoutContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.firstName)) {
    errors.push(err("firstName", "First name is required."));
  }

  if (!isNonEmpty(data.lastName)) {
    errors.push(err("lastName", "Last name is required."));
  }

  if (!isNonEmpty(data.email)) {
    errors.push(err("email", "Email is required."));
  } else if (!isEmail(data.email)) {
    errors.push(err("email", "Please enter a valid email address."));
  }

  if (!isNonEmpty(data.phone)) {
    errors.push(err("phone", "Phone number is required."));
  } else if (!isPhone(data.phone)) {
    errors.push(err("phone", "Please enter a valid phone number."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateShippingAddress(data: {
  street: string;
  city: string;
  state: string;
  zip: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.street)) {
    errors.push(err("street", "Street address is required."));
  }

  if (!isNonEmpty(data.city)) {
    errors.push(err("city", "City is required."));
  }

  if (!isNonEmpty(data.state)) {
    errors.push(err("state", "State is required."));
  }

  if (!isNonEmpty(data.zip)) {
    errors.push(err("zip", "ZIP code is required."));
  } else if (!isValidZip(data.zip)) {
    errors.push(err("zip", "Please enter a valid ZIP code."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateProduct(data: {
  name: string;
  price: number;
  stockCount: number;
  description: string;
  category: string;
  length: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.name)) {
    errors.push(err("name", "Product name is required."));
  } else if (data.name.trim().length < 3) {
    errors.push(err("name", "Product name must be at least 3 characters."));
  }

  if (!isPositiveNumber(data.price)) {
    errors.push(err("price", "Price must be greater than 0."));
  }

  if (typeof data.stockCount !== "number" || data.stockCount < 0) {
    errors.push(err("stockCount", "Stock count must be 0 or more."));
  }

  if (!isNonEmpty(data.description)) {
    errors.push(err("description", "Description is required."));
  }

  if (!isNonEmpty(data.category)) {
    errors.push(err("category", "Category is required."));
  }

  if (!isNonEmpty(data.length)) {
    errors.push(err("length", "Length is required."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateBlogPost(data: {
  title: string;
  excerpt: string;
  content: string;
}): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(data.title)) {
    errors.push(err("title", "Title is required."));
  } else if (data.title.trim().length < 5) {
    errors.push(err("title", "Title must be at least 5 characters."));
  }

  if (!isNonEmpty(data.excerpt)) {
    errors.push(err("excerpt", "Excerpt is required."));
  } else if (data.excerpt.trim().length < 10) {
    errors.push(err("excerpt", "Excerpt must be at least 10 characters."));
  }

  if (!isNonEmpty(data.content)) {
    errors.push(err("content", "Content is required."));
  } else if (data.content.replace(/<[^>]*>/g, "").trim().length < 50) {
    errors.push(err("content", "Content must be at least 50 characters."));
  }

  return { valid: errors.length === 0, errors };
}

export function validateNewsletterEmail(email: string): ValidationResult {
  const errors: ValidationError[] = [];

  if (!isNonEmpty(email)) {
    errors.push(err("email", "Email is required."));
  } else if (!isEmail(email)) {
    errors.push(err("email", "Please enter a valid email address."));
  }

  return { valid: errors.length === 0, errors };
}

// ── Helper — get field error message ─────────────────────

export function getFieldError(
  errors: ValidationError[],
  field: string,
): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}
