const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const settings = require(path.join(__dirname, '../config.json'))

// font styles
const headerFont = path.join(__dirname, '../assets/fonts/Montserrat-Black.ttf')
const bodyFont = path.join(__dirname, '../assets/fonts/OpenSans-Regular.ttf')
const headerFontSize = 34
const subheaderFontSize = 16
const bodyFontSize = 11

function formatNumber(x) {
  return x || x === 0 ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
}

function createPDF() {
  // open write stream to file
  const doc = new PDFDocument()
  doc.pipe(fs.createWriteStream(path.join(__dirname, `../static/pdfs/letter.pdf`)))

  const fftfLogoWidth = 300.0
  const fftfLogoX = (doc.page.width - fftfLogoWidth)/2

  doc
    .image(path.join(__dirname, '../assets/images/fftf-pdf-logo.png'), fftfLogoX, doc.page.y, { width: fftfLogoWidth })
    .moveDown()

  const dpLogoWidth = 360.0
  const dpLogoX = (doc.page.width - dpLogoWidth)/2

  doc
    .image(path.join(__dirname, '../assets/images/dp-pdf-logo.png'), dpLogoX, doc.page.y, { width: dpLogoWidth })
    .moveDown(2.0)

  const letterText = settings.letterToCongress.replace(/Sincerely,\n\nThe undersigned\./, '').trim()

  doc
    .font(bodyFont)
    .fontSize(bodyFontSize)
    .text(letterText)
    .moveDown()

  // not sure why this gets mad if you try to combine the sig lines, but it does
  doc
    .text(`Signed by ${formatNumber(settings.signatureCount)} American businesses in support of CRA to block the FCC's repeal of net neutrality.`)
    .moveDown()

  doc
    .text(`See who we are, state-by-state, at: BusinessesforNetNeutrality.com`)

  // all done
  doc.end()
}

async function main() {
  createPDF()
}

main().catch(console.error)
