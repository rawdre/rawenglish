// ============================================
// GOOGLE APPS SCRIPT — Cole isso no Google Apps Script
// 1. Vá em https://script.google.com
// 2. Crie novo projeto
// 3. Cole este código
// 4. Deploy > New Deployment > Web App > Anyone
// 5. Copie a URL e me envie
// ============================================

function doPost(e) {
  var sheet = SpreadsheetApp.openById('SHEET_ID_HERE').getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.nome,
    data.email,
    data.telefone,
    data.score,
    data.nivel,
    data.basico,
    data.intermediario,
    data.avancado
  ]);
  
  // Send email to André
  MailApp.sendEmail({
    to: 'rawandre@gmail.com',
    subject: '🎯 Novo Teste — ' + data.nome + ' (' + data.score + ')',
    htmlBody: '<h2>🎯 Novo Aluno fez o Teste de Nível!</h2>' +
      '<p><b>Nome:</b> ' + data.nome + '</p>' +
      '<p><b>Email:</b> ' + data.email + '</p>' +
      '<p><b>📱 Telefone/WhatsApp:</b> ' + data.telefone + '</p>' +
      '<p><b>Score:</b> ' + data.score + '</p>' +
      '<p><b>Nível:</b> ' + data.nivel + '</p>' +
      '<p><b>Básico:</b> ' + data.basico + ' | <b>Intermediário:</b> ' + data.intermediario + ' | <b>Avançado:</b> ' + data.avancado + '</p>' +
      '<hr><p><i>Raw English Level Test</i></p>'
  });
  
  return ContentService.createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
