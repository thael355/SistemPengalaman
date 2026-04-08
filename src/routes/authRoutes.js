const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createUser, findUserByEmail } = require('../store/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, dan password wajib diisi.' });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    const normalizedRole = role === 'admin' ? 'admin' : 'user';
    const passwordHash = await bcrypt.hash(password, 10);

    const user = createUser({
      name,
      email,
      passwordHash,
      role: normalizedRole,
    });

    return res.status(201).json({
      message: 'Registrasi berhasil.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email dan password wajib diisi.' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
  }
});

module.exports = router;
