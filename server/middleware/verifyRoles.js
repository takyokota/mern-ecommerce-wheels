const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // console.log(req.roles);
    if (!req?.roles) return res.status(401).json({ "message": "You are not authorized" });
    const rolesArray = [...allowedRoles];
    const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
    if (!result) return res.status(401).json({ "message": "You are not authorized" });
    next();
  };
};

module.exports = verifyRoles;