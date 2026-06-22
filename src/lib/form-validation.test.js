import { describe, it, expect, vi, beforeEach } from 'vitest';
import { isValidEmail, isValidPhone, isValidName, isValidPrice } from '@/lib/validation';

// ─── VALIDATION FUNCTIONS ────────────────────────────────────────────────────

describe('isValidEmail', () => {
  it('accepts valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('john.doe@company.co.uk')).toBe(true);
    expect(isValidEmail('test+tag@gmail.com')).toBe(true);
    expect(isValidEmail('a@b.co')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('@missing-user.com')).toBe(false);
    expect(isValidEmail('missing-tld@domain')).toBe(false);
    expect(isValidEmail(' spaces@domain.com ')).toBe(true); // trimmed internally
    expect(isValidEmail(null)).toBe(false);
    expect(isValidEmail(undefined)).toBe(false);
    expect(isValidEmail(123)).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('accepts valid phone numbers', () => {
    expect(isValidPhone('+971501234567')).toBe(true);
    expect(isValidPhone('0501234567')).toBe(true);
    expect(isValidPhone('971501234567')).toBe(true);
    expect(isValidPhone('+1 555-123-4567')).toBe(true);
    expect(isValidPhone('+44 20 7123 4567')).toBe(true);
    expect(isValidPhone('1234567')).toBe(true); // 7 digits min
  });

  it('rejects invalid phone numbers', () => {
    expect(isValidPhone('')).toBe(false);
    expect(isValidPhone('12345')).toBe(false); // too short (under 7)
    expect(isValidPhone('abc')).toBe(false);
    expect(isValidPhone(null)).toBe(false);
    expect(isValidPhone(undefined)).toBe(false);
  });

  it('handles edge-case formats with spaces and punctuation', () => {
    expect(isValidPhone('+971 (50) 123-4567')).toBe(true);
    expect(isValidPhone('  +971501234567  ')).toBe(true);
  });
});

describe('isValidName', () => {
  it('accepts valid names', () => {
    expect(isValidName('John')).toBe(true);
    expect(isValidName('A')).toBe(false); // < 2 chars
    expect(isValidName('Jo')).toBe(true);
    expect(isValidName('  Jo  ')).toBe(true);
  });

  it('rejects invalid names', () => {
    expect(isValidName('')).toBe(false);
    expect(isValidName(' ')).toBe(false);
    expect(isValidName(null)).toBe(false);
    expect(isValidName(undefined)).toBe(false);
  });
});

describe('isValidPrice', () => {
  it('accepts valid prices', () => {
    expect(isValidPrice('1000000')).toBe(true);
    expect(isValidPrice('0.5')).toBe(true);
    expect(isValidPrice(500000)).toBe(true);
  });

  it('rejects invalid prices', () => {
    expect(isValidPrice('')).toBe(false);
    expect(isValidPrice(null)).toBe(false);
    expect(isValidPrice(undefined)).toBe(false);
    expect(isValidPrice('abc')).toBe(false);
    expect(isValidPrice('0')).toBe(false); // must be > 0
    expect(isValidPrice('-100')).toBe(false);
  });
});

// ─── APPLY FORM VALIDATION RULES ────────────────────────────────────────────

const EMPTY_FORM = {
  full_name: '',
  preferred_name: '',
  phone: '',
  phone_country_code: '+971',
  email: '',
  dob: '',
  gender: '',
  nationality: '',
  area_of_residency: '',
  full_address: '',
  linkedin_url: '',
  photo_url: '',
  job_title: '',
  joining_status: '',
  target_joining_date: '',
  cv_url: '',
  has_real_estate_experience: '',
  years_in_real_estate: '',
  current_role_dubai: '',
  current_brokerage: '',
  graduation_year: '',
  work_experience: '',
};

function validateApplyForm(form) {
  const errs = {};
  if (!isValidName(form.full_name)) errs.full_name = 'Name must be at least 2 characters';
  if (!isValidEmail(form.email)) errs.email = 'Please enter a valid email address';
  if (!isValidPhone(form.phone)) errs.phone = 'Please enter a valid phone number';
  if (!form.gender) errs.gender = 'Please select your gender';
  if (!form.nationality) errs.nationality = 'Please select your nationality';
  if (!form.job_title) errs.job_title = 'Please enter the position you are applying for';
  if (!form.joining_status) errs.joining_status = 'Please select your availability';
  if (form.linkedin_url && !/^https?:\/\/(www\.)?linkedin\.com\/.+/.test(form.linkedin_url.trim())) {
    errs.linkedin_url = 'Please enter a valid LinkedIn URL';
  }
  if (form.years_in_real_estate && (isNaN(Number(form.years_in_real_estate)) || Number(form.years_in_real_estate) < 0)) {
    errs.years_in_real_estate = 'Please enter a valid number of years';
  }
  if (form.graduation_year && (isNaN(Number(form.graduation_year)) || Number(form.graduation_year) < 1950 || Number(form.graduation_year) > new Date().getFullYear())) {
    errs.graduation_year = 'Please enter a valid year';
  }
  return { isValid: Object.keys(errs).length === 0, errors: errs };
}

describe('Apply Form Validation', () => {
  it('returns errors for an empty form', () => {
    const { isValid, errors } = validateApplyForm(EMPTY_FORM);
    expect(isValid).toBe(false);
    expect(errors.full_name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.gender).toBeDefined();
    expect(errors.nationality).toBeDefined();
    expect(errors.job_title).toBeDefined();
    expect(errors.joining_status).toBeDefined();
  });

  it('passes for a fully valid form', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John Smith',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'United Arab Emirates',
      job_title: 'Property Consultant',
      joining_status: 'Immediate',
    });
    expect(isValid).toBe(true);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('catches invalid email', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'bad-email',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
    });
    expect(isValid).toBe(false);
    expect(errors.email).toContain('valid email');
  });

  it('catches invalid phone', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '123',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
    });
    expect(isValid).toBe(false);
    expect(errors.phone).toContain('valid phone');
  });

  it('catches invalid LinkedIn URL format', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      linkedin_url: 'not-a-url',
    });
    expect(isValid).toBe(false);
    expect(errors.linkedin_url).toContain('valid LinkedIn');
  });

  it('accepts valid LinkedIn URLs', () => {
    const { isValid } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      linkedin_url: 'https://linkedin.com/in/johnsmith',
    });
    expect(isValid).toBe(true);
  });

  it('catches invalid years_in_real_estate (negative)', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      years_in_real_estate: '-5',
    });
    expect(isValid).toBe(false);
    expect(errors.years_in_real_estate).toBeDefined();
  });

  it('accepts float years_in_real_estate', () => {
    const { isValid } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      years_in_real_estate: '3.5',
    });
    expect(isValid).toBe(true);
  });

  it('catches invalid graduation_year (before 1950)', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      graduation_year: '1900',
    });
    expect(isValid).toBe(false);
    expect(errors.graduation_year).toBeDefined();
  });

  it('catches graduation_year in the future', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      graduation_year: String(new Date().getFullYear() + 1),
    });
    expect(isValid).toBe(false);
    expect(errors.graduation_year).toBeDefined();
  });

  it('accepts valid graduation year', () => {
    const { isValid } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@example.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      graduation_year: '2015',
    });
    expect(isValid).toBe(true);
  });
});

// ─── BITRIX SPA PAYLOAD CONSTRUCTION ────────────────────────────────────────

function buildApplicantPayload(applicantData) {
  return {
    entityTypeId: 1038,
    fields: {
      title: `New Applicant: ${applicantData.full_name}`,
      ufCrm8_1772192069412: applicantData.phone,
      ufCrm8_1772192889128: applicantData.email,
      ufCrm8_1772192916887: applicantData.address,
      ufCrm8_1772192939863: applicantData.job_title,
      ufCrm8_1772192959631: applicantData.nationality,
      ufCrm8_1772193001136: applicantData.joining_date,
      ufCrm8_1772193012616: applicantData.dob,
      ufCrm8_1772193028487: applicantData.preferred_name,
      ufCrm8_1772193037231: applicantData.area_of_residency,
      ufCrm8_1772193061103: applicantData.joining_status === 'Yes' ? '326' : '328',
      ufCrm8_1772193100078: applicantData.graduation_year,
      ufCrm8_1772193111039: applicantData.work_experience,
      ufCrm8_1772193150190: applicantData.has_re_experience === 'Yes' ? '330' : '332',
      ufCrm8_1772194127805: applicantData.gender === 'Male' ? '416' : '418',
      ufCrm8_1774869698: applicantData.linkedin,
      ufCrm8_1774950629779: applicantData.current_dubai_role,
      ufCrm8_1774950641068: applicantData.re_years_exp,
      ufCrm8_1774950651350: applicantData.current_brokerage,
      ufCrm8_1776858189: applicantData.notes,
    },
  };
}

describe('Bitrix SPA Payload Construction', () => {
  it('builds a correct payload for a fully populated application', () => {
    const payload = buildApplicantPayload({
      full_name: 'Sarah Ahmed',
      preferred_name: 'Sarah',
      phone: '0509876543',
      email: 'sarah@example.com',
      dob: '1995-06-15',
      gender: 'Female',
      nationality: 'United Arab Emirates',
      area_of_residency: 'Dubai Marina',
      address: 'Marina Tower, Apt 12B',
      linkedin: 'https://linkedin.com/in/sarahahmed',
      job_title: 'Property Consultant',
      joining_status: 'Immediate',
      joining_date: '2026-07-01',
      has_re_experience: 'Yes',
      re_years_exp: '4',
      current_dubai_role: 'Senior Agent',
      current_brokerage: 'DAMAC Properties',
      graduation_year: '2018',
      work_experience: '5 years at DAMAC\nTop performer 2024',
      notes: 'Enthusiastic candidate',
    });

    expect(payload.entityTypeId).toBe(1038);
    expect(payload.fields.title).toBe('New Applicant: Sarah Ahmed');
    expect(payload.fields.ufCrm8_1772192069412).toBe('0509876543');
    expect(payload.fields.ufCrm8_1772192889128).toBe('sarah@example.com');
    expect(payload.fields.ufCrm8_1772192916887).toBe('Marina Tower, Apt 12B');
    expect(payload.fields.ufCrm8_1772192939863).toBe('Property Consultant');
    expect(payload.fields.ufCrm8_1772192959631).toBe('United Arab Emirates');
    expect(payload.fields.ufCrm8_1772193001136).toBe('2026-07-01');
    expect(payload.fields.ufCrm8_1772193012616).toBe('1995-06-15');
    expect(payload.fields.ufCrm8_1772193028487).toBe('Sarah');
    expect(payload.fields.ufCrm8_1772193037231).toBe('Dubai Marina');
    expect(payload.fields.ufCrm8_1772193111039).toBe('5 years at DAMAC\nTop performer 2024');
    expect(payload.fields.ufCrm8_1772193150190).toBe('330'); // Yes → 330
    expect(payload.fields.ufCrm8_1772194127805).toBe('418'); // Female → 418
    expect(payload.fields.ufCrm8_1774869698).toBe('https://linkedin.com/in/sarahahmed');
    expect(payload.fields.ufCrm8_1774950629779).toBe('Senior Agent');
    expect(payload.fields.ufCrm8_1774950641068).toBe('4');
    expect(payload.fields.ufCrm8_1774950651350).toBe('DAMAC Properties');
    expect(payload.fields.ufCrm8_1776858189).toBe('Enthusiastic candidate');
  });

  it('omits empty fields from payload', () => {
    const payload = buildApplicantPayload({
      full_name: 'Minimal User',
      email: 'minimal@test.com',
      phone: '0501234567',
    });

    expect(payload.fields.title).toBe('New Applicant: Minimal User');
    expect(payload.fields.ufCrm8_1772192069412).toBe('0501234567');
    expect(payload.fields.ufCrm8_1772192889128).toBe('minimal@test.com');
    // Unfilled ufCrm fields send undefined (no runtime error)
    expect(payload.fields.ufCrm8_1772192916887).toBeUndefined();
    expect(payload.fields.ufCrm8_1772192959631).toBeUndefined();
  });

  it('correctly maps enum IDs for dropdown fields', () => {
    // Male → 416, Female → 418
    const male = buildApplicantPayload({
      full_name: 'John', email: 'j@t.com', phone: '0501234567', gender: 'Male',
    });
    expect(male.fields.ufCrm8_1772194127805).toBe('416');

    const female = buildApplicantPayload({
      full_name: 'Jane', email: 'j@t.com', phone: '0501234567', gender: 'Female',
    });
    expect(female.fields.ufCrm8_1772194127805).toBe('418');

    // Has RE Experience Yes → 330, No → 332
    const exp = buildApplicantPayload({
      full_name: 'John', email: 'j@t.com', phone: '0501234567', has_re_experience: 'Yes',
    });
    expect(exp.fields.ufCrm8_1772193150190).toBe('330');

    const noExp = buildApplicantPayload({
      full_name: 'Jane', email: 'j@t.com', phone: '0501234567', has_re_experience: 'No',
    });
    expect(noExp.fields.ufCrm8_1772193150190).toBe('332');
  });
});

// ─── EDGE CASES ─────────────────────────────────────────────────────────────

describe('Edge Cases', () => {
  it('phone with leading/trailing whitespace is trimmed', () => {
    expect(isValidPhone('  0501234567  ')).toBe(true);
  });

  it('email with whitespace is trimmed', () => {
    expect(isValidEmail('  user@domain.com  ')).toBe(true);
  });

  it('name with only spaces is rejected', () => {
    expect(isValidName('    ')).toBe(false);
  });

  it('price "0" is rejected (must be positive)', () => {
    expect(isValidPrice('0')).toBe(false);
    expect(isValidPrice(0)).toBe(false);
  });

  it('graduation_year as non-numeric text', () => {
    const { isValid, errors } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@test.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      graduation_year: 'two thousand',
    });
    expect(isValid).toBe(false);
    expect(errors.graduation_year).toBeDefined();
  });

  it('linkedin_url is optional (empty should not error)', () => {
    const { isValid } = validateApplyForm({
      ...EMPTY_FORM,
      full_name: 'John',
      email: 'john@test.com',
      phone: '0501234567',
      gender: 'Male',
      nationality: 'UAE',
      job_title: 'Agent',
      joining_status: 'Immediate',
      linkedin_url: '',
    });
    expect(isValid).toBe(true);
  });
});