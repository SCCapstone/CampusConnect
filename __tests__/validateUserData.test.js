import 'react-native';

// Function to be tested
const validateUserData = (firstName, lastName, major, gradDate, bio) => {
  const bioLengthValid = bio.length <= 150;
  const firstNameUp = firstName.replace(/\s/g, '');
  const lastNameUp = lastName.replace(/\s/g, '');
  const nameValid = (firstNameUp.length + lastNameUp.length) < 30;

  // Replace the 'if (true)' condition with your email verification logic
    if (
      nameValid &&
      firstName.trim() &&
      lastName.trim() &&
      major &&
      gradDate &&
      bio &&
      bioLengthValid
    ) {
      return true;
    }

  return false;
};

// Test cases
describe('validateUserData', () => {
  test('valid user data', () => {
    const validData = validateUserData(
      'John',
      'Doe',
      'Computer Science',
      'Senior',
      'A brief bio'
    );
    expect(validData).toBe(true);
  });

  test('invalid user data: bio too long', () => {
    const longBio = 'A'.repeat(151);
    const invalidData = validateUserData(
      'John',
      'Doe',
      'Computer Science',
      'Senior',
      longBio
    );
    expect(invalidData).toBe(false);
  });

  test('invalid user data: name too long', () => {
    const longName = 'A'.repeat(15);
    const invalidData = validateUserData(
      longName,
      longName,
      'Computer Science',
      'Senior',
      'A brief bio'
    );
    expect(invalidData).toBe(false);
  });
  test('invalid user data: no last name', () => {
    const invalidData = validateUserData(
        'John',
        '',
        'Computer Science',
        'Senior',
        'A brief bio'
      );
      expect(invalidData).toBe(false);
  });
  test('invalid user data: no major', () => {
    const invalidData = validateUserData(
        'John',
        'Doe',
        '',
        'Senior',
        'A brief bio'
      );
      expect(invalidData).toBe(false);
  });
  test('invalid user data: no class', () => {
    const invalidData = validateUserData(
        'John',
        'Doe',
        'Computer Science',
        '',
        'A brief bio'
      );
      expect(invalidData).toBe(false);
  });

});
