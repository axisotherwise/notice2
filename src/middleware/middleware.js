const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/?error=로그인 필요");
  }
}

const isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.redirect("/?error=로그인 상태");
  }
}

export {
  isAuthenticated,
  isNotAuthenticated,
}