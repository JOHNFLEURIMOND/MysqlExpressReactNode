export const handleRegistration = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    phone,
    email,
    confirmEmail,
    streetAddress,
    unit,
    city,
    state,
    zip,
    typeOfDegree,
    degreeAttained,
    educationalInstitution,
    otherInformation,
  } = req.body;

  if (!email || !confirmEmail || email !== confirmEmail) {
    return res.status(400).json({ error: 'Emails do not match' });
  }

  try {
    // Use ORM methods to interact with the database
    const user = await db.createUser({
      firstName,
      middleName,
      lastName,
      phone,
      email,
      streetAddress,
      unit,
      city,
      state,
      zip,
      typeOfDegree,
      degreeAttained,
      educationalInstitution,
      otherInformation,
    });

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
