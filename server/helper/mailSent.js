const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { successResponse } = require("./responseHandler");

dotenv.config();

// Create a transporter using Gmail and App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail email address from .env file
    pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password from .env file
  },
});

// Function to send an email
const sendResetEmail = async (
  emailData
) => {
  const { email, first_name, verificationLink, shcedule,subject, chamberName, body, } = emailData;

  const emailTemplate = `

<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">

      <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      </style>

<style type="text/css">
          #outlook a { padding: 0; }
          .ReadMsgBody { width: 100%; }
          .ExternalClass { width: 100%; }
          .ExternalClass * { line-height:100%; }
          body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
          p { display: block; margin: 13px 0; }
      </style>

      <style type="text/css">
          @media only screen and (max-width:480px) {
              @-ms-viewport { width:320px; }
              @viewport { width:320px; }
          }
      </style>




      <style type="text/css">
          .outlook-group-fix {
              width:100% !important;
          }
      </style>

<style>                
  @media only screen and (min-width:480px) {
              .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
          }
      </style>
</head>


<body style="background: #F9F9F9;">
<div style="background-color:#F9F9F9;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
    <tr>
      <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <style type="text/css">
          html, body, * {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
          }
          a {
          color:#1EB0F4;
          text-decoration:none;
          }
          a:hover {
          text-decoration:underline;
          }
        </style>

        <div style="margin:0px auto;max-width:640px;background:transparent;">
          <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
            <tbody>
              <tr>
                <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="vertical-align:top;width:640px;">
                        <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;		display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                            <tbody>
                              <tr>
                                <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                  <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0">
                                    <tbody>
                                      <tr>
                                        <td style="width:138px;">
                                          <a href="#"
                                           target="_blank">
                                            <img alt="" title=""
                                             height="" src="../image/favicon.png" style="border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100%;height:38px;" width="138">
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>							
                          </table>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>

          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden">
                  <div style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;">
                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
                    <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
                    <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">

                    <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png">
                      <tbody>
                        <tr>
                          <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="vertical-align:undefined;width:640px;">
                                  <div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">
                                    Welcome to for Your doctor Appointment in ${chamberName}!
                                  </div>
                                </td>
                              </tr>
                            </table>		
                          </td>
                        </tr>
                      </tbody>
                    </table>		

                  </div>
                </div>
              </td>
            </tr>
          </table>

          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <div style="margin:0px auto;max-width:640px;background:#ffffff;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0">
                    <tbody>
                      <tr>
                        <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                                <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left">
                                      <div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
                                        <h2 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px; text-transform: uppercase;">
                                          Hey ${
                                            first_name ? first_name : "Visitor"
                                          },
                                        </h2>
                                        <h1 style="font-family: Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 24px;color: #4F545C;letter-spacing: 0.27px; text-transform: uppercase;">${subject}</h1>
                                        <p  >
                                          Wow! ${body}
                                        </p>

                                       
                                        
                                      </div>
                                    </td>
                                  </tr>
                                  
                                  <tr>
                                    <td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center">
                                      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0">
                                        <tbody>
                                          <tr>
                                            <td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA">
                                              <a href="${verificationLink}" 
                                              style="display:none; text-decoration:none;
                                              line-height:100%;
                                              background:#7289DA;
                                              color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                                                ${chamberName}
                                              </a>
                                              <button  
                                              style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:25px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
                                                ${shcedule}
                                              </button>

                                            </td>
                                          </tr>
                                        </tbody>	
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>	
                              </table>	
                            </div>	
                          </table>
                        </td>
                      </tr>
                    </tbody>	
                  </table>		
                  </div>
              </td>
            </tr>
          </table>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                  <div style="margin:0px auto;max-width:640px;background:transparent;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                    <tbody>
                      <tr>
                        <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                            <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">
                                    &nbsp;
                                    </td>
                                  </tr>
                                </tbody>	
                              </table>
                            </div>
                          </table>
                        </td>
                      </tr>
                    </tbody>	
                  </table>
                </div>
              </td>
            </tr>

          </table>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
                <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                    <div style="margin:0px auto;max-width:640px;background:transparent;">
                  <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0">
                    <tbody>
                      <tr>
                        <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;">
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
                                <div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                <tbody>
                                  <tr>
                                    <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                      <div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">

                                        Developed by Rabbinur Muktar • 
                                        <a href="https://rabbinur-muktar-portfolio.netlify.app/" style="color:#1EB0F4;text-decoration:none;" target="_blank">
                                          Visit Website
                                        </a> • <br />
                                        <a href="https://www.linkedin.com/in/md-rabbinur-muktar-89a364232/" style="color:#1EB0F4;text-decoration:none;" target="_blank">
                                          @MD. Rabbinur Muktar (Visit LinkedIn)
                                        </a>
                                      </div>
                                  
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style="word-break:break-word;font-size:0px;padding:0px;" align="center">
                                      <div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
                                          Email:rabbinur345@gmail.com <br />
                                           <a href="https://wa.me/+8801685111860">WhatsApp Message  01685111860</a> 
                                           <br />  Contact NO: 
                                          <a href="tel:+8801685111860">01685-111860</a>
                                      </div>
                                    </td>
                                  </tr>

                                </tbody>
                              </table>
                            </div>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>			
              </td>
            </tr>			
          </table>
        </div>
      </td>
    </tr>
  </table>
</div>
</body>

  `;
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `${subject}`,
    // text: `Here is your ${subject} link: ${resetLink}`,
    // html: `<p>Click <a href="${resetLink}">here</a> ${body}.</p>`,
    html: emailTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    //console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendResetEmail;
