var crypto = require('crypto');
module.exports = {

     sendEmail: function (mailUser, token, username){

         var mailer = require("nodemailer");
        var smtpTransport = mailer.createTransport({
            service: "gmail",
            auth: {
                user: "tremplinecocea@gmail.com",
                pass: "babaorum96"
            }
        });

        var mail = {
            from: "tremplinecocea@gmail.com",
            to: mailUser,
            subject: "Active email",
            html: `<p>Bonjour, voici le lien qui pourra activer votre mail:</p> <a href="http://localhost:3000/register/enableAccount/${token}/${username}" >Ici</a>`
        }

        smtpTransport.sendMail(mail, function(error, response){
            if(error){
                console.log("Erreur lors de l'envoie du mail!");
                console.log(error);
            }else{
                console.log("Mail envoyé avec succès!")
            }
            smtpTransport.close();
        });

    },

    randomValueHex: function (len) {
    return crypto
        .randomBytes(Math.ceil(len / 2))
        .toString('hex') // convert to hexadecimal format
        .slice(0, len) // return required number of characters
}
};