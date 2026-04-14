import { jsPDF } from 'jspdf'

export function generatePDF(title, markdownContent) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - margin * 2
  let y = margin

  function checkPageBreak(neededSpace = 10) {
    if (y + neededSpace > pageHeight - margin) {
      doc.addPage()
      y = margin
    }
  }

  function addText(text, options = {}) {
    const {
      fontSize = 11,
      fontStyle = 'normal',
      color = [30, 30, 30],
      lineHeight = 7,
      indent = 0,
    } = options

    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    doc.setTextColor(...color)

    const lines = doc.splitTextToSize(text, maxWidth - indent)
    lines.forEach(line => {
      checkPageBreak(lineHeight)
      doc.text(line, margin + indent, y)
      y += lineHeight
    })
  }

  // Header bar
  doc.setFillColor(14, 165, 233)
  doc.rect(0, 0, pageWidth, 16, 'F')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(255, 255, 255)
  doc.text('AILearn Platform', margin, 10)
  doc.setFont('helvetica', 'normal')
  doc.text(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), pageWidth - margin, 10, { align: 'right' })

  y = 28

  // Title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(10, 10, 60)
  doc.text(title, margin, y)
  y += 12

  // Divider
  doc.setDrawColor(14, 165, 233)
  doc.setLineWidth(0.8)
  doc.line(margin, y, pageWidth - margin, y)
  y += 8

  // Parse markdown into sections
  const lines = markdownContent.split('\n')

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      y += 3
      continue
    }

    if (trimmed.startsWith('# ')) {
      checkPageBreak(14)
      y += 4
      addText(trimmed.slice(2), { fontSize: 16, fontStyle: 'bold', color: [10, 10, 60], lineHeight: 9 })
      y += 2
    } else if (trimmed.startsWith('## ')) {
      checkPageBreak(12)
      y += 3
      addText(trimmed.slice(3), { fontSize: 13, fontStyle: 'bold', color: [20, 60, 120], lineHeight: 8 })
      y += 1
    } else if (trimmed.startsWith('### ')) {
      checkPageBreak(10)
      y += 2
      addText(trimmed.slice(4), { fontSize: 11, fontStyle: 'bold', color: [40, 80, 150], lineHeight: 7 })
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      const bulletText = '• ' + trimmed.slice(2).replace(/\*\*/g, '')
      addText(bulletText, { fontSize: 10, color: [50, 50, 80], indent: 4, lineHeight: 6 })
    } else if (/^\d+\.\s/.test(trimmed)) {
      const numText = trimmed.replace(/\*\*/g, '')
      addText(numText, { fontSize: 10, color: [50, 50, 80], indent: 4, lineHeight: 6 })
    } else if (trimmed.startsWith('> ')) {
      checkPageBreak(8)
      doc.setFillColor(240, 249, 255)
      doc.rect(margin, y - 4, maxWidth, 8, 'F')
      doc.setDrawColor(14, 165, 233)
      doc.setLineWidth(1.5)
      doc.line(margin, y - 4, margin, y + 4)
      addText(trimmed.slice(2).replace(/\*\*/g, ''), {
        fontSize: 10,
        fontStyle: 'italic',
        color: [60, 100, 150],
        indent: 5,
        lineHeight: 6,
      })
      y += 2
    } else if (trimmed.startsWith('```') || trimmed.startsWith('|')) {
      // Skip code blocks and tables in PDF (complex to render)
      continue
    } else if (!trimmed.startsWith('!')) {
      const clean = trimmed.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`(.*?)`/g, '$1').replace(/\[(.*?)\]\(.*?\)/g, '$1')
      addText(clean, { fontSize: 10, color: [50, 50, 70], lineHeight: 6 })
    }
  }

  // Footer on each page
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(180, 180, 180)
    doc.setFont('helvetica', 'normal')
    doc.text(`${title} — AILearn Platform`, margin, pageHeight - 8)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 8, { align: 'right' })
  }

  const safeTitle = title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
  doc.save(`${safeTitle}-notes.pdf`)
}
