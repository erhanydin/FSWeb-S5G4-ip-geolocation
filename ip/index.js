//axios import buraya gelecek
import axios from 'axios';
var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl(){
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
	.then(function (response) {
		return response.data
	})
	.then(function (a) {
		benimIP=a
	});
}				
// ------------ değiştirmeyin --------------


/*
	ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
    (tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
    https://apis.ergineer.com/ipgeoapi/<ipniz>
	
	NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
	ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

const getData = async function() {
	await ipAdresimiAl();
	axios.get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
	.then(function(response) {
		return response.data;
	})
	.then(function(ipDatasi) {
		document.querySelector("div.cards").appendChild(createCard(ipDatasi));
	})
}

getData();

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/
/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
    DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	{
    "sorgu": "176.234.89.56",
    "durum": "OK",
    "kıta": "Asia",
    "ülke": "Turkey",
    "ülkeKodu": "TR",
    "ülkebayrağı": "https://apis.ergineer.com/ulkebayraklari/TR",
    "bölge": "34",
    "bölgeAdı": "Istanbul",
    "şehir": "Istanbul",
    "zip": "34010",
    "enlem": 41.0247,
    "boylam": 28.9252,
    "saatdilimi": "Europe/Istanbul",
    "parabirimi": "TRY",
    "isp": "SUPERONLINE-Broadband",
    "organizasyon": "Superonline Iletisim Hizmetleri",
    "as": "AS34984 Superonline Iletisim Hizmetleri A.S."
    }

	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
    </div>
*/

function createCard(veri) {

	const cardDiv = document.createElement("div");
	cardDiv.classList.add("card");

	const cardImg = document.createElement("img");
	cardImg.src = veri["ülkebayrağı"];
	cardDiv.appendChild(cardImg);

	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");
	cardDiv.appendChild(cardInfo);

	const cardHeader = document.createElement("h3");
	cardHeader.classList.add("ip");
	cardHeader.textContent = veri["sorgu"];
	cardInfo.appendChild(cardHeader);

	const cardUlke = document.createElement("p");
	cardUlke.classList.add("ulke");
	cardUlke.textContent = `(${veri["ülke"]} ${veri["ülkeKodu"]})`;
	cardInfo.appendChild(cardUlke);

	const cardEnlem = document.createElement("p");
	cardEnlem.textContent = `Enlem: ${veri["enlem"]} Boylam: ${veri["boylam"]}`;
	cardInfo.appendChild(cardEnlem);

	const cardSehir = document.createElement("p");
	cardSehir.textContent = veri["şehir"];
	cardInfo.appendChild(cardSehir);

	const cardSaat = document.createElement("p");
	cardSaat.textContent = `Saat dilimi: ${veri["saatdilimi"]}`;
	cardInfo.appendChild(cardSaat);

	const cardPara = document.createElement("p");
	cardPara.textContent = `Para birimi: ${veri["parabirimi"]}`;
	cardInfo.appendChild(cardPara);

	const cardISP = document.createElement("p");
	cardISP.textContent = `ISP: ${veri["isp"]}`;
	cardInfo.appendChild(cardISP);

	return cardDiv;
}


/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve 
	bu kartı DOM olarak .cards elementinin içine ekleyin. 
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün. 
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna 
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine 
	bilgisayarınızın IP adresini atayacaktır. 
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP; 
*/



//kodlar buraya gelecek