import Verifier from "email-verifier";


function verifyEmail(req, res, next) {

    let verifier = new Verifier("te.email0007", "Test@1234");
    verifier.verify(req.body.email, (err, data) => {
        if (err) {
            res.status(406);
        }
        else {
            next();
        }
    });
  
  }

export default verifyEmail;