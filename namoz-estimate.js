'use strict';

// An estimate for a user-selected missed period after obligation began.
// Nifas is removed first so the monthly hayz estimate cannot overlap it.
function estimateNamoz(days, gender, hayz = 0, births = 0, nifas = 0) {
  if (!Number.isSafeInteger(days) || days < 1 || days > 36525)
    throw new Error('Qazo davri 1 kundan 100 yilgacha bo‘lishi kerak.');
  if (!['male', 'female'].includes(gender)) throw new Error('Erkak yoki Ayol tanlang.');
  if (gender === 'male') return {days, hayz: 0, nifas: 0, amount: days};
  if (!Number.isFinite(hayz) || hayz < 0 || hayz > 10)
    throw new Error('Hayzning oylik o‘rtachasini 0–10 kun oralig‘ida kiriting.');
  if (!Number.isSafeInteger(births) || births < 0 || births > 100)
    throw new Error('Tug‘ruqlar soni 0–100 oralig‘idagi butun son bo‘lsin.');
  if (!Number.isSafeInteger(nifas) || nifas < 0 || nifas > births * 40 || nifas > days)
    throw new Error('Jami nifos kunlari davrdan ham, tug‘ruqlar soni × 40 kundan ham oshmasin.');
  const hayzDays = Math.min(days - nifas, Math.round((days - nifas) / (365.2425 / 12) * hayz));
  return {days, hayz: hayzDays, nifas, amount: Math.max(0, days - nifas - hayzDays)};
}
if (typeof module !== 'undefined') module.exports = {estimateNamoz};
