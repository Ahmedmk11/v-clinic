import nodemailer from 'nodemailer'

class Email {
    constructor(user, params) {
        this.to = user.email
        this.user = user
        this.params = params
        this.from = process.env.EMAIL_FROM
    }

    newTransport() {
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        })
    }

    async sendOutOfStockMedicines() {
        let medicines = ''
        this.params.map((medicine) => {
            medicines += `<p style="margin-bottom: 40px;">${medicine.name} is out of stock</p>`
        })

        const mailOptions = {
            from: this.from,
            to: this.to,
            subject: 'Out of Stock Medicines',
            html: `
                <!DOCTYPE html>
                <html lang="en" style="padding: 40px; width: 100%;">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <div style="margin: 0 auto; width: 100%; max-width: 600px; background-color: #f5f5f5; padding: 40px;">
                        <div style="background-color: #fff; padding: 40px; border-radius: 10px;">
                            <h1 style="text-align: center; margin-bottom: 40px;">Out of Stock medicines</h1>
                            ${medicines}
                        </div>
                    </div>
                </body>
                </html>
            `,
        }

        return await this.newTransport().sendMail(mailOptions)
    }
}

export default Email
