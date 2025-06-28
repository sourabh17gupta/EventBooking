const { faker } = require('@faker-js/faker');

const generateEvent = () => {
  const houseNumber = `H.No-${faker.number.int({ min: 1, max: 999 })}`;
  const sector = `Sector-${faker.number.int({ min: 1, max: 50 })}`;
  const city = faker.location.city();
  const state = faker.location.state();
  const zip = faker.location.zipCode();
  const address = `${houseNumber}, ${sector}, ${city}, ${state} ${zip}`;

  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(3),
    organiser: faker.string.uuid(),
    attendees: Array.from({ length: faker.number.int({ min: 5, max: 20 }) }, () => faker.string.uuid()),
    date: faker.date.future().toISOString().split('T')[0],
    address: address, // ✅ Full address replaces venue
    description: faker.lorem.paragraph(),
    ratingReview: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.string.uuid()),
    comments: Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => faker.string.uuid()),
    image: faker.image.url(),
    category: faker.helpers.arrayElement(["Sports", "Concerts", "Workshops", "Conferences"]),
  };
};

module.exports = generateEvent;
