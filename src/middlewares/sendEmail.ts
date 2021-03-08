const axios = require('axios')

async function sendEmail(toArray: [{ email: string; name: string }]) {
  const options = {
    method: 'POST',
    url: 'https://api.sendinblue.com/v3/smtp/email',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key':process.env.SENDBLUE_API,
    },
    body: {
      sender: { email: 'rinconrj@gmail.com', name: 'RICARDO JOSE RINCON VILLALOBOS' },
      to: toArray || [{ email: 'rinconrj@gmail.com', name: 'RICARDO JOSE RINCON VILLALOBOS' }],
      replyTo: { email: 'rinconrj@gmail.com', name: 'RICARDO JOSE RINCON VILLALOBOS' },
      textContent: 'clika para confirmar tu cuenta',
      subject: 'confirmacion venexpress',
    },
    json: true,
  }

  return axios
    .post(options)
    .then((data: object) => console.log(data))
    .catch((e: object) => console.error(e))
}
export default sendEmail
