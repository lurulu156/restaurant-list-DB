const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

// 加入 middleware，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password) {
    errors.push({ message: '您的Email或密碼尚未填寫' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '這個 Email 已經註冊過了。' })
        res.render('register', { errors, name, email, password, confirmPassword })
      } else {
        User.create({ name, email, password })
          .then(() => {
            req.flash('success_msg', '您已註冊成功。請由此登入。')
            return res.redirect('/users/login')})
          .catch(err => console.log(err))
      }
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err) }
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

module.exports = router