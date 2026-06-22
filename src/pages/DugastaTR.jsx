import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, CheckCircle2, ArrowRight, MapPin, Calendar,
  Star, Shield, Building2, Phone, ChevronDown, Users, Award, Banknote
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { trackLeadEvent } from '@/lib/analytics';
import { sendLeadToBitrix } from '@/lib/bitrix';

// ─── VERİ ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: 'Terra Tower',
    community: 'Dubailand Residence Complex',
    type: 'Daireler',
    priceFrom: '634.000 AED',
    bedrooms: '1-3 Yatak Odası',
    handover: 'Q2 2027',
    paymentPlan: '5 Yıllık Teslim Sonrası Plan',
    roi: '%10 Garantili',
    area: '719 - 1.400 sqft',
    tag: '10 on 10 Planı',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/43ae51b62_generated_image.png',
    highlights: [
      'Sözleşmeli olarak 10 yıl boyunca %10 net yatırım getirisi garantisi',
      'Tam 10 yıllık süre boyunca sıfır hizmet ücreti',
      '10 yıl sonra %100 geri satın alma opsiyonu',
      'Burj Khalifa\'ya 22 dakika, Dubai Havalimanı\'na 23 dakika',
      'Sahada 400\'den fazla otoparkı olan 12 katlı bina',
    ],
    description: 'Terra Tower, Dubailand Residence Complex\'teki amiral gemisi Dugasta projesidir. 12 kat, tatil köyü tarzı olanaklar ve teslimattan 5 yıl sonrasına uzanan ödeme planıyla tam 10 on 10 paketiyle geliyor.',
  },
  {
    name: 'Al Haseen Residences',
    community: 'Dubai South, Sanayi Şehri',
    type: 'Daireler',
    priceFrom: '477.000 AED',
    bedrooms: 'Stüdyo - 2 Yatak Odası',
    handover: 'Q3 2027',
    paymentPlan: 'Esnek Ödeme Planı',
    roi: '%10 Garantili',
    area: '450 sqft\'den başlayan',
    tag: 'Düşük Giriş Fiyatı',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/31f67884a_generated_image.png',
    highlights: [
      'Dugasta portföyündeki en uygun giriş noktası',
      'İlk 5 yıl için yıllık %10 garantili getiri',
      'Hizmet ücreti yok ve %100 geri satın alma dahil',
      'Expo City yakınında Dubai South büyüme koridorunun kalbinde konumlanmış',
      'Havalimanı ve sanayi bölgesi çalışanlarından güçlü süregelen talep',
    ],
    description: "Al Haseen Residences, şehrin en büyük büyüme hikayelerinden birinin tam ortasında, Dubai South'ta yer almaktadır. Yakınındaki yeni Al Maktoum Uluslararası Havalimanı ile bu koridor giderek daha yoğun bir hal alacak.",
  },
  {
    name: 'Moonsa Residences 2',
    community: 'International City (Warsan Fourth)',
    type: 'Daireler',
    priceFrom: '540.000 AED',
    bedrooms: 'Stüdyo - 1 Yatak Odası',
    handover: 'Q4 2026',
    paymentPlan: 'Teslim Sonrası Plan',
    roi: '%9 - %10',
    area: '500 sqft\'den başlayan',
    tag: 'Teslimat Yakın',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/4859121f7_generated_image.png',
    highlights: [
      'Teslimat çok yakın, böylece hızla kazanmaya başlayabilirsiniz',
      'International City sürekli olarak Dubai\'deki en yüksek kiralık talebe sahip',
      'Bu toplulukta ortalama doluluk oranı %95\'in üzerinde',
      'Uzun bir bekleme olmadan kira geliri isteyen yatırımcılar için mükemmel',
      'RERA ile tam kayıtlı ve DLD emanet hesabıyla korunan',
    ],
    description: "Moonsa Residences 2, Dubai\'nin tüm doluluk oranlarının en yükseği olan International City'de bulunuyor. Teslimat çok yakın olduğundan, yatırımcılar gerçekçi olarak birkaç ay içinde kira geliri elde etmeye başlayabilir.",
  },
  {
    name: 'Weybridge Gardens 3',
    community: 'Dubailand',
    type: 'Daireler',
    priceFrom: '650.000 AED',
    bedrooms: '1 - 2 Yatak Odası',
    handover: 'Q2 2027',
    paymentPlan: 'Aylık %1 Teslim Sonrası',
    roi: '%8 - %10',
    area: '700 sqft\'den başlayan',
    tag: 'Yalnızca RE/MAX Zam\'dan',
    image: 'https://media.base44.com/images/public/6a16b586e769393fe031b9fd/889d50666_generated_image.png',
    highlights: [
      'Halka açılmadan önce yalnızca RE/MAX Zam aracılığıyla sunuluyor',
      'Ayda sadece %1 ile Dubai\'deki en erişilebilir planlardan biri',
      'Akıllı ev özellikleri ve boydan boya yüksek kalite işçilik',
      'Dubailand güçlü ve tutarlı kira talebi görüyor',
      'Teslim tarihine kadar güçlü sermaye değer artışı bekleniyor',
    ],
    description: "Weybridge Gardens 3 şu anda yalnızca RE/MAX Zam aracılığıyla edinilebilir. Aylık %1\'lik ödeme planı, piyasadaki en erişilebilir yapılardan biridir ve Dubai'ye ilk kez yatırım yapanlar için harika bir başlangıç noktasıdır.",
  },
];

const FAQS = [
  {
    q: 'Dugasta 10 on 10 garantili yatırım getirisi planı nedir?',
    a: '10 on 10 planı, satın alma fiyatınız üzerinden her yıl sözleşmeli olarak garantilenmiş %10 net getiri alacağınız anlamına gelir. Bu bir projeksiyon, tahmin ya da sözlü verilen söz değildir. Satış ve Satın Alma Sözleşmenize yazılır ve BAE hukuku kapsamında yasal olarak uygulanabilir niteliktedir. Bunun üzerine Dugasta, aynı 10 yıllık dönem için tüm hizmet ücretlerini siler ve 10 yılın sonunda birimi orijinal fiyatınızdan size geri satma opsiyonu sunar.',
  },
  {
    q: 'Çoğu Dubai ev sahibi %6-8 kazanırken gerçekten %10 garantili kazanabilir miyim?',
    a: "Evet, ve işte neden mümkün olduğu: Dugasta\'nın ana şirketi City Towers Real Estate, 1991\'den beri Dubai\'de konut mülklerini yönetiyor. Tüm kiraları bünyelerinde yönettikleri için geliri kontrol ediyorlar. Herhangi bir yılda piyasa yalnızca %7 getiri sağlasa bile, City Towers kendi operasyonlarından kalan %3\'ü karşılıyor. Siz yine de %10\'unuzu alıyorsunuz. Risk tamamen onlara ait, size değil.",
  },
  {
    q: 'Bu, mülkünü bizzat yönetemeyen yurt dışındaki yatırımcılar için uygun mu?',
    a: "Bu plan tam olarak o yatırımcı için tasarlanmıştır. Mülkü satın alır, sözleşmeleri imzalarsınız ve sonra hiçbir şey yapmazsınız. City Towers kiracıları, bakımı, kira tahsilatını ve tüm günlük yönetimi üstlenir. Dubai'de bulunmanıza gerek yok. Tek bir kiracıyla konuşmanıza gerek yok. Garantili geliriniz, dünyanın neresinde olursanız olun yıllık olarak gelir.",
  },
  {
    q: '10 yıl sonra ne olur?',
    a: 'Üç temiz çıkış seçeneğiniz var. Mülkü elinizde tutabilir ve piyasa oranında kira geliri elde etmeye devam edebilirsiniz — bu, on yıllık Dubai büyümesinin ardından genellikle güçlüdür. Açık piyasada satabilirsiniz; Dubai mülk değerleri tarihsel olarak 10 yıllık dönemler boyunca önemli ölçüde yükselmiştir. Ya da %100 geri satın alma opsiyonunu kullanabilir ve Dugasta\'nın birimi orijinal satın alma fiyatınızdan geri almasını sağlayabilirsiniz. Bu geri satın alma opsiyonu garantili tabanınızdır.',
  },
  {
    q: 'Sıfır hizmet ücreti ile gerçekte ne kadar tasarruf ediyorum?',
    a: "Dubai'de hizmet ücretleri genellikle mülk değerinin yıllık yaklaşık %1,5'i oranında gerçekleşir. 700.000 AED değerindeki bir mülk için bu yılda yaklaşık 10.500 AED, yani 10 yıllık dönemde 105.000 AED demektir. Dugasta tüm bunları karşılar; bu da tasarrufu dahil ettiğinizde efektif yıllık getirinizin %11 ila %11,5'e yaklaştığı anlamına gelir.",
  },
  {
    q: 'Dugasta düzenlenmiş mi ve param güvende mi?',
    a: "Her Dugasta projesi RERA (Gayrimenkul Düzenleme Kurumu) ile kayıtlıdır ve tüm satın alma fonları, BAE hukuku tarafından zorunlu kılındığı üzere DLD tarafından düzenlenen bir emanet hesabında tutulmaktadır. Yatırım getirisi garantisi ve hizmet ücreti feragatnamesi, yasal olarak bağlayıcı bir sözleşme olan Satış ve Satın Alma Sözleşmenizde belgelenmiştir. Tam anlamıyla düzenlenmiştir, gayri resmi bir düzenleme değildir.",
  },
  {
    q: 'Başlamak için minimum yatırım miktarı ne kadar?',
    a: "Giriş fiyatları, Dubai South\'taki Al Haseen Residences\'ta bir stüdyo dairesi için 477.000 AED\'den başlamaktadır. Terra Tower\'daki bir yatak odalı daireler 634.000 AED'den başlamaktadır. Tüm projeler için ödeme planları mevcuttur; bazıları ayda yalnızca %1 sunmakta olup bu, çeşitli bütçe düzeylerindeki yatırımcılar için erişilebilir kılmaktadır.",
  },
];

// ─── BAŞVURU FORMU ─────────────────────────────────────────────────────────────

function DugastaLeadForm({ dark = true }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', investment_budget: '', notes: '' });

  const createLead = useMutation({
    mutationFn: async (data) => {
      const res = await base44.functions.invoke('createLead', data);
      // Forward to Bitrix
      try {
        await sendLeadToBitrix({
          title: 'DUGASTA Website Lead (TR)',
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          investment_budget: data.investment_budget,
          source: 'DUGASTA TR',
        });
      } catch (e) {
        console.error('[Dugasta TR] Bitrix forward failed:', e);
      }
      return res;
    },
    onSuccess: () => {
      setSubmitted(true);
      trackLeadEvent('form_submission', { lead_type: 'Investor', source: 'Dugasta Türkçe Sayfası', form_id: 'dugasta-lead-form-tr' });
    },
  });

  const inputClass = dark
    ? 'bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12'
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 h-12';

  const labelClass = dark ? 'text-white/50' : 'text-gray-500';

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${dark ? 'bg-emerald-500/20' : 'bg-emerald-50'}`}>
          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
        </div>
        <h3 className={`font-heading font-bold text-xl mb-2 ${dark ? 'text-white' : 'text-gray-900'}`}>Talebiniz Alındı</h3>
        <p className={`font-body text-sm ${dark ? 'text-white/50' : 'text-gray-500'}`}>
          Dugasta uzmanımız 2 saat içinde tam proje detayları ve yatırım getirisi analizi ile sizinle iletişime geçecektir.
        </p>
      </div>
    );
  }

  return (
    <form id="dugasta-lead-form-tr" onSubmit={(e) => { e.preventDefault(); createLead.mutate({ ...form, lead_type: 'Investor', source: 'Dugasta Türkçe Sayfası — 10 on 10' }); }} className="space-y-3">
      <Input placeholder="Ad Soyad *" required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={inputClass} />
      <Input placeholder="E-posta Adresi *" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
      <Input placeholder="Telefon / WhatsApp *" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
      <Select value={form.investment_budget} onValueChange={(v) => setForm({ ...form, investment_budget: v })}>
        <SelectTrigger className={inputClass}>
          <SelectValue placeholder="Yatırım Bütçesi" />
        </SelectTrigger>
        <SelectContent>
          {['500K AED Altı', '500K - 1M AED', '1M - 3M AED', '3M - 5M AED', '5M+ AED'].map(b => (
            <SelectItem key={b} value={b}>{b}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" disabled={createLead.isPending} className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-black font-heading font-bold text-sm tracking-wide">
        {createLead.isPending ? 'Gönderiliyor...' : 'Tam Proje Detayları & Yatırım Getirisi Analizi Al'} <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      <p className={`text-[10px] font-body text-center ${dark ? 'text-white/25' : 'text-gray-400'}`}>
        Spam yok. Dugasta yatırım uzmanı 2 saat içinde doğrudan sizinle iletişime geçer.
      </p>
    </form>
  );
}

// ─── SSS ÖĞESİ ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left gap-4">
        <span className="font-heading font-semibold text-gray-900 text-sm leading-snug">{q}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <p className="pb-5 text-sm text-gray-500 font-body leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── SAYFA ─────────────────────────────────────────────────────────────────────

export default function DugastaTR() {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="min-h-screen bg-white" dir="ltr">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080808]">
        <div className="absolute inset-0 bg-center bg-cover opacity-20" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.12),transparent_60%)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">

            {/* Metin — 3 sütun */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 rounded-full px-4 py-1.5 mb-7">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-amber-400 font-heading font-bold text-[10px] tracking-[0.25em] uppercase">RE/MAX Zam Dubai Aracılığıyla Sunuluyor</span>
              </div>

              <h1 className="font-display font-black text-white leading-[0.95] mb-6">
                <span className="block text-5xl sm:text-7xl lg:text-8xl">%10 Garantili</span>
                <span className="block text-5xl sm:text-7xl lg:text-8xl text-amber-400">ROI. 10 Yıl.</span>
                <span className="block text-xl sm:text-2xl text-white/35 font-body font-normal mt-4 leading-relaxed">Hizmet Ücreti Yok &nbsp;·&nbsp; Vergi Yok &nbsp;·&nbsp; Tam Yönetim &nbsp;·&nbsp; %100 Geri Alım</span>
              </h1>

              <p className="text-white/60 font-body text-base leading-relaxed mb-8 max-w-xl">
                Çoğu Dubai mülk yatırımcısı piyasa belirsizliği, beklenmedik hizmet ücretleri ve kiracı yönetiminin stresiyle boğuşur. Dugasta 10 on 10 planı tüm bunları ortadan kaldırır. <strong className="text-white/85">Siz yatırım yaparsınız. Onlar her şeyi yönetir. Siz tam 10 yıl boyunca, sözleşmeli olarak garantilenmiş şekilde her yıl %10 tahsil edersiniz.</strong>
              </p>

              {/* 3 sütun */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { value: '%10', label: 'Net ROI / Yıl', sub: 'Sözleşmenize yazılmıştır' },
                  { value: '0 AED', label: 'Hizmet Ücreti', sub: '10 yıl boyunca sıfır' },
                  { value: '%100', label: 'Geri Alım Opsiyonu', sub: 'Orijinal fiyattan çıkış' },
                ].map(s => (
                  <div key={s.label} className="bg-white/[0.05] border border-white/10 rounded-xl p-4 text-center">
                    <p className="text-amber-400 font-display font-black text-2xl">{s.value}</p>
                    <p className="text-white font-heading font-semibold text-xs mt-1">{s.label}</p>
                    <p className="text-white/30 font-body text-[9px] mt-0.5 leading-tight">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://wa.me/97145828158?text=Merhaba, Dugasta 10 on 10 garantili ROI planı hakkında daha fazla bilgi almak istiyorum" target="_blank" rel="noopener noreferrer"
                  onClick={() => trackLeadEvent('whatsapp', { source: 'DugastaTR' })}
                  className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-sm px-7 py-3.5 rounded-xl transition-colors">
                  <Phone className="w-4 h-4" /> WhatsApp ile Uzmanla Konuş
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-sm px-7 py-3.5 rounded-xl transition-colors">
                  Mevcut Projeleri Gör <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Başvuru Formu — 2 sütun */}
            <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}>
              <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-7 backdrop-blur-sm">
                <h2 className="font-display font-black text-white text-2xl mb-1">Rakamları Kendiniz Görün</h2>
                <p className="text-white/40 font-body text-xs mb-6">Tam ROI sözleşmesi, proje broşürü ve ödeme planı detayları doğrudan size gönderilsin.</p>
                <DugastaLeadForm dark={true} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CITY TOWERS MİRASI ── */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Garantinin Neden Gerçek Olduğu</p>
              <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-5">
                1991'den Beri Dubai Mülklerini<br />Yöneten Şirket
              </h2>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                Dugasta'nın ortalama Dubai ev sahibi %6-8 kazanırken %10 garanti edebilmesinin nedeni basit: ana şirketleri <strong className="text-gray-800">City Towers Real Estate</strong>, tüm mülkleri bünyesinde yönetiyor. Bunu Dubai'de 1991'den beri yapıyorlar.
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-4">
                Bu da tüm kiralama döngüsünü kontrol ettikleri anlamına geliyor: kiracı bulma, kira sözleşmeleri, kira tahsilatı ve bakım. Herhangi bir yılda piyasa %10'un altında getiri sağlıyorsa, <strong className="text-gray-800">City Towers farkı kendi operasyonlarından karşılıyor. Açık onların sorunu, sizin değil.</strong>
              </p>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
                Ev sahibi zahmeti olmadan gayrimenkul yatırımı yapmak isteyen yatırımcılar için bu mümkün olan en temiz yapıdır. Siz bir Dubai dairesine sahipsiniz. Onlar yönetiyor. Siz yıllık gelirinizi alıyorsunuz. İlişki bu kadar.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, label: 'Kuruluş', value: '1991' },
                  { icon: Users, label: 'Liderlik', value: 'Khan Ailesi' },
                  { icon: Award, label: 'Teslim Edilen Konut', value: '5.000+' },
                  { icon: Banknote, label: 'Yönetim', value: 'Bünyesinde' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-gray-900 text-sm">{value}</p>
                      <p className="text-gray-400 font-body text-[10px]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-[#0a0a0a] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.1),transparent_60%)]" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-12 bg-amber-500 rounded-full" />
                    <div>
                      <p className="text-white font-heading font-bold text-sm">Tauseef Khan</p>
                      <p className="text-white/40 font-body text-xs">Kurucu & Yönetim Kurulu Başkanı, Dugasta Properties</p>
                    </div>
                  </div>
                  <blockquote className="text-white/70 font-body text-sm leading-relaxed italic mb-8">
                    "Dugasta'da güven yalnızca bir slogan değil — işimizin DNA'sının ta kendisidir. Tanıttığım '10 on 10' modeli bu felsefenin en iyi örneği olarak duruyor; yatırımcılara sıfır hizmet ücretiyle 10 yıl boyunca %10 net yatırım getirisi sunuyor. Belirsizliği ortadan kaldırarak müşterilerimize mutlak açıklık ve tam güven sağlıyoruz."
                  </blockquote>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-white/30 font-body text-xs mb-3">Liderlik Ekibi</p>
                    <div className="space-y-2">
                      {[
                        { name: 'Tauseef Khan', role: 'Kurucu & Yönetim Kurulu Başkanı' },
                        { name: 'Azaan Khan', role: 'İcra Kurulu Başkanı' },
                        { name: 'Eifaad Khan', role: 'Başkan' },
                      ].map(p => (
                        <div key={p.name} className="flex items-center justify-between">
                          <span className="text-white font-heading font-semibold text-xs">{p.name}</span>
                          <span className="text-white/40 font-body text-xs">{p.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10 on 10 NASIL ÇALIŞIR ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Gerçekte Ne Alıyorsunuz</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-4">
              Dubai'de %10 Garantili Yatırım Getirisi:<br />İşte Nasıl Çalıştığı
            </h2>
            <p className="text-gray-500 font-body text-sm max-w-2xl mx-auto leading-relaxed">
              Bu bir projeksiyon, tahmin ya da pazarlama vaadi değildir. Aşağıdaki her rakam Satış ve Satın Alma Sözleşmenize yazılmıştır ve BAE hukuku kapsamında tamamen uygulanabilir niteliktedir.
            </p>
          </motion.div>

          {/* Karşılaştırma tablosu */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-center">
                <div className="p-5 border-r border-gray-100">
                  <p className="text-gray-400 font-body text-xs uppercase tracking-wider mb-1">Metrik (5 Yıl)</p>
                </div>
                <div className="p-5 bg-amber-50 border-r border-amber-100">
                  <p className="text-amber-700 font-heading font-bold text-sm uppercase tracking-wider">Dugasta 10 on 10</p>
                </div>
                <div className="p-5">
                  <p className="text-gray-400 font-heading font-semibold text-sm">Normal Dubai Dairesi</p>
                </div>
              </div>
              {[
                ['Yıllık Getiri', '%10 Garantili', '%6-8 (garantisiz)'],
                ['Kira Geliri (5 yıl, 691K AED üzerinden)', '345.500 AED', '207.300 - 276.400 AED'],
                ['Hizmet Ücretleri (5 yıl)', '0 AED (tamamen muaf)', '~51.825 AED'],
                ['Boşluk Riski', 'Sıfır (geliştirici destekli)', 'Piyasa riski geçerli'],
                ['Çıkış Stratejisi', '%100 geri alım garantili', 'Piyasaya bağlı satış'],
                ['Net 5 Yıllık Kâr', '~345.500 AED', '~155.475-224.575 AED'],
              ].map(([metric, dugasta, regular], i) => (
                <div key={metric} className={`grid grid-cols-3 text-sm border-t border-gray-100 ${i % 2 === 0 ? '' : 'bg-gray-50/50'}`}>
                  <div className="p-4 font-body text-gray-500 border-r border-gray-100">{metric}</div>
                  <div className="p-4 font-heading font-semibold text-emerald-700 bg-amber-50/50 border-r border-amber-100 text-center">{dugasta}</div>
                  <div className="p-4 font-body text-gray-500 text-center">{regular}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-400 font-body text-xs mt-3">
              Terra Tower 1+1 dairesine 691.000 AED baz alınmıştır. Hizmet ücretleri yıllık %1,5 olarak tahmin edilmiştir. Kaynak: RERA / DLD piyasa verileri.
            </p>
          </motion.div>

          {/* 4 temel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', title: 'Her Yıl %10 Net Yatırım Getirisi — Garantili', desc: 'Getiriniz satın alma fiyatınızın %10\'una sözleşmeli olarak sabitlenmiş ve yıllık ödenmiştir. Kiralama piyasası yükselip düşebilir. Geliriniz tamamen aynı kalır.' },
              { num: '02', title: '10 Yıl Boyunca Sıfır Hizmet Ücreti', desc: 'Dubai mülkündeki hizmet ücretleri genellikle yılda %1,5 oranında gerçekleşir. Dugasta tam 10 yıl boyunca tüm ücretleri siler; bu da efektif yıllık getirinizi yıllık %11,5\'e yaklaştırır.' },
              { num: '03', title: 'Tamamen Ellerinizi Kirletmeden Yatırım', desc: 'City Towers mülkünüzün her yönünü yönetir: kiracılar, bakım ve kira tahsilatı. Hiçbir zaman tek bir kiracı şikayetiyle uğraşmazsınız. Sadece gelirinizi alırsınız.' },
              { num: '04', title: '10 Yıl Sonra Garantili Çıkış', desc: 'Çoğu mülk yatırımcısı ne zaman ve nasıl çıkacağı konusunda endişelenir. Dugasta ile birimi orijinal satın alma fiyatınızdan geri satma opsiyonunuz var, yazılı olarak garantilenmiş.' },
            ].map((p, i) => (
              <motion.div key={p.num} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <p className="text-amber-500 font-display font-black text-4xl mb-4">{p.num}</p>
                <h3 className="font-heading font-bold text-gray-900 text-sm mb-2">{p.title}</h3>
                <p className="text-gray-500 font-body text-xs leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJELER ── */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Nerede Yatırım Yapılır</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-gray-900 leading-tight mb-3">
              %10 Garantili Getirili Dubai Mülkleri
            </h2>
            <p className="text-gray-500 font-body text-sm max-w-2xl leading-relaxed">
              Aşağıdaki her proje tam 10 on 10 paketiyle geliyor: garantili yatırım getirisi, sıfır hizmet ücreti ve geri alım opsiyonu. Giriş fiyatları 477.000 AED'den başlıyor.
            </p>
          </motion.div>

          {/* Proje sekmeleri */}
          <div className="flex flex-wrap gap-2 mb-8">
            {PROJECTS.map((p, i) => (
              <button key={p.name} onClick={() => setActiveProject(i)}
                className={`px-4 py-2 rounded-full text-xs font-heading font-semibold transition-all ${activeProject === i ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                {p.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeProject} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                {/* Görsel */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={PROJECTS[activeProject].image} alt={PROJECTS[activeProject].name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-amber-500 text-black text-[10px] font-heading font-bold px-3 py-1.5 rounded-full">
                    {PROJECTS[activeProject].tag}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-display font-black text-2xl leading-tight">{PROJECTS[activeProject].name}</p>
                    <p className="text-white/60 text-xs font-body flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />{PROJECTS[activeProject].community}
                    </p>
                  </div>
                </div>
                {/* Detaylar */}
                <div className="p-8">
                  <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">{PROJECTS[activeProject].description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs font-body">
                    {[
                      { label: 'Başlangıç Fiyatı', value: PROJECTS[activeProject].priceFrom },
                      { label: 'Yatak Odası', value: PROJECTS[activeProject].bedrooms },
                      { label: 'Teslim Tarihi', value: PROJECTS[activeProject].handover },
                      { label: 'Ödeme Planı', value: PROJECTS[activeProject].paymentPlan },
                      { label: 'Alan', value: PROJECTS[activeProject].area },
                      { label: 'Yatırım Getirisi', value: PROJECTS[activeProject].roi },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white rounded-xl p-3 border border-gray-100">
                        <p className="text-gray-400 mb-0.5 text-[10px] uppercase tracking-wider">{label}</p>
                        <p className={`font-heading font-bold text-sm ${label === 'Yatırım Getirisi' ? 'text-emerald-600' : 'text-gray-900'}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2 mb-7">
                    {PROJECTS[activeProject].highlights.map(h => (
                      <li key={h} className="flex items-start gap-2 text-xs text-gray-600 font-body">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/contact" className="flex-1 text-center bg-black hover:bg-gray-800 text-white font-heading font-bold text-sm py-3.5 rounded-xl transition-colors">
                      Broşür İste
                    </Link>
                    <a href="https://wa.me/97145828158?text=Merhaba, Dugasta projesi hakkında bilgi almak istiyorum" target="_blank" rel="noopener noreferrer"
                      onClick={() => trackLeadEvent('whatsapp', { source: 'DugastaTR' })}
                      className="flex-1 text-center bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-sm py-3.5 rounded-xl transition-colors">
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── NEDEN RE/MAX ZAM ── */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 bg-black rounded-full px-3 py-1 mb-4">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-white font-heading font-bold text-[10px] tracking-[0.2em] uppercase">Neden RE/MAX Zam'dan Satın Almalı</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-gray-900 leading-tight mb-5">
                RE/MAX Zam Aracılığıyla<br />Dugasta Mülkü Nasıl Satın Alınır
              </h2>
              <p className="text-gray-600 font-body text-sm leading-relaxed mb-3">
                RE/MAX Zam, Dubai'de Dugasta'nın yetkili satış acentesidir. Danışmanlarımız düzinelerce yatırımcıya 10 on 10 satın alma sürecinde rehberlik etti — ilk soruşturmadan DLD tescili ve teslimatına kadar.
              </p>
              <p className="text-gray-600 font-body text-sm leading-relaxed mb-6">
                Komisyonumuzu geliştirici ödediği için <strong className="text-gray-900">sizin ödeyeceğiniz herhangi bir acente ücreti bulunmuyor.</strong> Sıfır maliyet karşılığında tam profesyonel rehberlik alıyorsunuz.
              </p>
              <ul className="space-y-3">
                {[
                  'Mevcut birimleri gösteriyor ve her seçeneği sizinle inceliyoruz',
                  'Tam ROI sözleşme incelemesi — tam olarak ne imzaladığınızı anlayın',
                  'Acente ücreti yok. Masraflarımızı geliştirici karşılıyor.',
                  'DLD tescili, izin belgesi ve tüm evrakları sizin adınıza hallediyoruz',
                  'Teslimat tarihinden itibaren City Towers devralıyor — hiç kiracıyla muhatap olmuyorsunuz',
                ].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-700 font-body">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <h3 className="font-display font-black text-gray-900 text-2xl mb-1">Danışma Randevusu Al</h3>
                <p className="text-gray-400 font-body text-xs mb-6">Tam proje broşürü, yatırım getirisi analizi ve ödeme planı seçenekleri doğrudan size gönderilsin.</p>
                <DugastaLeadForm dark={false} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SSS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-gray-400 font-body text-xs tracking-[0.2em] uppercase mb-3">Yaygın Yatırımcı Soruları</p>
            <h2 className="text-4xl font-display font-black text-gray-900 mb-3">Dubai'de Garantili Yatırım Getirisi: Sorular Yanıtlandı</h2>
            <p className="text-gray-500 font-body text-sm leading-relaxed">İlk kez ve deneyimli yatırımcıların 10 on 10 planına geçmeden önce sorduğu her şey.</p>
          </motion.div>
          <div>
            {FAQS.map(faq => <FaqItem key={faq.q} {...faq} />)}
          </div>
        </div>
      </section>

      {/* ── ALT CTA ── */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08),transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-amber-400 font-body text-xs tracking-[0.2em] uppercase mb-4">%10 Garantili Kazanmaya Başlayın</p>
            <h2 className="text-4xl sm:text-5xl font-display font-black text-white leading-tight mb-5">
              Dubai Mülküne Yatırım Yapın.<br />Her Yıl %10 Toplayın.<br />Başka Bir Şey Yapmayın.
            </h2>
            <p className="text-gray-400 font-body text-sm mb-10 max-w-xl mx-auto leading-relaxed">
              Dubai mülkünden hizmet ücreti, kiracı stresi ve yerleşik bir çıkış stratejisi olmadan garantili kira geliri arıyorsanız, 10 on 10 planı tam size göre yapılandırılmıştır. Bugün ekibimizle konuşun. Baskı yok, maliyet yok.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a onClick={() => trackLeadEvent('whatsapp', { source: 'DugastaTR' })}
                 href="https://wa.me/97145828158?text=Merhaba, Dugasta 10 on 10 planı hakkında daha fazla bilgi almak istiyorum" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-heading font-bold text-sm px-8 py-4 rounded-xl transition-colors">
                <Phone className="w-4 h-4" /> WhatsApp ile Uzmanla Konuş
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-gray-100 font-heading font-bold text-sm px-8 py-4 rounded-xl transition-colors">
                Ücretsiz Danışma Al <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}