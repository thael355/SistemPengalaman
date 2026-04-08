const users = [];
const experiences = [];

let userIdSeq = 1;
let expIdSeq = 1;

function createUser({ name, email, passwordHash, role }) {
  const user = {
    id: userIdSeq++,
    name,
    email,
    passwordHash,
    role: role || 'user',
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === String(email).toLowerCase());
}

function findUserById(id) {
  return users.find((u) => u.id === Number(id));
}

function createExperience({ ownerId, title, description }) {
  const item = {
    id: expIdSeq++,
    ownerId: Number(ownerId),
    title,
    description,
    createdAt: new Date().toISOString(),
  };

  experiences.push(item);
  return item;
}

function getAllExperiences() {
  return experiences;
}

function getExperienceById(id) {
  return experiences.find((x) => x.id === Number(id));
}

module.exports = {
  users,
  experiences,
  createUser,
  findUserByEmail,
  findUserById,
  createExperience,
  getAllExperiences,
  getExperienceById,
};
