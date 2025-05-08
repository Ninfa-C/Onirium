require("esbuild-register");
const React = require("react");
const { render } = require("@react-email/render");
const fs = require("fs");
const path = require("path");

const { ConfirmationEmail } = require("./emails/confirmation-email.jsx");
const { InvitationEmail } = require("./emails/invitation-email.jsx");

const type = process.argv[2];

async function main() {
  let html = "";
  let fileName = "";
  let data = {};

  if (type === "confirmation") {
    data = {
      name: process.argv[3],
      confirmationLink: process.argv[4],
    };
    html = await render(React.createElement(ConfirmationEmail, data));
    fileName = "conferma-email.html";
  } else if (type === "invitation") {
    data = {
      name: process.argv[3],
      campaignName: process.argv[4],
      inviterName: process.argv[5],
      role: process.argv[6],
      confirmationLink: process.argv[7],
    };
    html = await render(React.createElement(InvitationEmail, data));
    fileName = "invito-email.html";
  } else {
    console.error("Tipo di email non riconosciuto.");
    process.exit(1);
  }

  fs.writeFileSync(
    path.join(__dirname, `../OwlBeers/OwlBeers/EmailTemplates/${fileName}`),
    html
  );

  console.log(`✅ Email ${type} generata con successo!`);
}

main();
