# Gelişmiş Hava Durumu Paneli 🌦️

<div align="center">
Bu proje, React kullanılarak geliştirilmiş, kullanıcılara anlık hava durumu verilerini, saatlik ve 5 günlük tahminleri sunan modern bir web uygulamasıdır. OpenWeatherMap API'sinden alınan veriler, Chart.js ile oluşturulan interaktif grafiklerle görselleştirilmiştir.
</div>

---

### 📸 Uygulama Önizlemesi

<div align="center">

![Uygulama Ekran Görüntüsü](https://imgur.com/a/aAwSQTy)


</div>

---

### ✨ Öne Çıkan Özellikler

-   🌍 **Dinamik Şehir Arama:** Dünya genelindeki herhangi bir şehir için anlık veri alın.
-   🌡️ **Anlık Veriler:** Sıcaklık, hissedilen sıcaklık, nem oranı ve rüzgar hızı gibi temel bilgilere anında ulaşın.
-   🎨 **Dinamik İkonlar:** Hava koşuluna göre değişen, estetik SVG ikonları.
-   📊 **Saatlik Sıcaklık Grafiği:** Önümüzdeki saatlerin sıcaklık değişimini gösteren interaktif ve akıcı bir grafik.
-   📅 **5 Günlük Hava Tahmini:** Gelecek 5 gün için özet hava durumu ve sıcaklık bilgileri.
-   📱 **Tamamen Responsive:** Mobil, tablet ve masaüstü cihazlarda kusursuz bir kullanıcı deneyimi.
-   ⚙️ **Durum Yönetimi:** Veri yüklenirken veya bir hata oluştuğunda kullanıcıyı bilgilendiren modern arayüz bileşenleri.

---

### 🛠️ Kullanılan Teknolojiler

Bu projenin kalbinde yer alan teknolojiler:

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js">
</p>

---

### 🚀 Kurulum ve Başlatma

Bu projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyebilirsiniz.

#### 1. Adım: Projeyi Klonlayın

Öncelikle projeyi bilgisayarınıza indirin.

git clone [https://github.com/ReazGan/hava-durumu-paneli.git](https://github.com/ReazGan/hava-durumu-paneli.git)


2. Adım: Proje Dizinine Gidin
```bash
cd hava-durumu-paneli
```
3. Adım: Gerekli Paketleri Yükleyin
```bash
npm install
```

4. Adım: API Anahtarını Ayarlayın (🔑 En Önemli Adım!)
Bu uygulamanın çalışabilmesi için bir API anahtarına ihtiyacı var.

OpenWeatherMap sitesine giderek ücretsiz bir hesap oluşturun ve API anahtarınızı alın.

Projenin ana dizininde .env adında yeni bir dosya oluşturun.

Oluşturduğunuz bu dosyanın içine aşağıdaki satırı ekleyin ve ... kısmını kendi API anahtarınızla değiştirin:
```bash
REACT_APP_OPENWEATHER_API_KEY=...SIZIN_API_ANAHTARINIZ...```
```
5. Adım: Uygulamayı Başlatın
Her şey hazır! Aşağıdaki komutla uygulamayı başlatın.

```bash
npm start```
```
Uygulama, tarayıcınızda http://localhost:3000 adresinde otomatik olarak açılacaktır.

✍️ Yazar
Baran Ayaztaş (ReazGan)

GitHub: @ReazGan
Instagram: @baranayztas
