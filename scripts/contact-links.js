'use strict';

// Contatos oficiais vêm da configuração; destinos ainda não informados ficam inativos.
const escapeAttribute = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));

function renderContacts(site) {
  const email = String(site.contact?.email || '').trim();
  const phone = String(site.contact?.whatsapp || '').trim();
  const validEmail = /^[^\s@<>"'?#]+@[^\s@<>"'?#]+\.[^\s@<>"'?#]+$/.test(email);
  const validPhone = /^\+?[1-9]\d{9,14}$/.test(phone);
  const instagram = String(site.social?.instagram || '');
  const validInstagram = /^https:\/\/(?:www\.)?instagram\.com\/[^\s"'<>]+\/?$/.test(instagram);
  const contacts = [
    { key: 'instagram', label: 'Instagram', href: validInstagram ? instagram : '', external: true },
    { key: 'mail', label: 'E-mail', href: validEmail ? 'mailto:' + email : '', external: false },
    { key: 'whatsapp', label: 'WhatsApp', href: validPhone ? 'https://wa.me/' + phone.replace(/^\+/, '') : '', external: true }
  ];
  return '<div class="contact-bar" role="group" aria-label="Redes sociais e contato">' + contacts.map(item => {
    const contents = '<span class="contact-icon contact-icon--' + item.key + '" aria-hidden="true"></span><span class="contact-text">' + item.label + '</span>';
    if (!item.href) return '<button class="contact-button contact-button--pending" type="button" disabled aria-label="' + item.label + ' em breve" title="' + item.label + ' em breve">' + contents + '</button>';
    const extra = item.external ? ' target="_blank" rel="noopener noreferrer"' : '';
    const hint = item.external ? ', abre em nova aba' : ', abrir aplicativo de e-mail';
    return '<a class="contact-button" href="' + escapeAttribute(item.href) + '"' + extra + ' aria-label="' + item.label + ' do Portal Sul MA' + hint + '" title="' + item.label + '">' + contents + '</a>';
  }).join('') + '</div>';
}

module.exports = { renderContacts };
