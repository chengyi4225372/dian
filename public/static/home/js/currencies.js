  var Currency = {
    rates: {"USD":1.0,"EUR":1.11817,"GBP":1.26302,"CAD":0.739498,"ARS":0.0223803,"AUD":0.693655,"BRL":0.254698,"CLP":0.00140898,"CNY":0.144834,"CYP":0.397899,"CZK":0.0432091,"DKK":0.149562,"EEK":0.0706676,"HKD":0.127575,"HUF":0.00343798,"ISK":0.00809028,"INR":0.0143701,"JMD":0.00744946,"JPY":0.00923447,"LVL":1.57329,"LTL":0.320236,"MTL":0.293496,"MXN":0.0509705,"NZD":0.653605,"NOK":0.114196,"PLN":0.260817,"SGD":0.72769,"SKK":21.5517,"SIT":175.439,"ZAR":0.0686472,"KRW":0.000841924,"SEK":0.105308,"CHF":0.999602,"TWD":0.0316756,"UYU":0.0283148,"MYR":0.238595,"BSD":1.0,"CRC":0.00169908,"RON":0.235318,"PHP":0.0191807,"AED":0.272294,"VEB":0.000100125,"IDR":7.00514e-05,"TRY":0.171245,"THB":0.0317393,"TTD":0.148172,"ILS":0.275763,"SYP":0.00194097,"XCD":0.370457,"COP":0.000296301,"RUB":0.0152461,"HRK":0.150119,"KZT":0.00261463,"TZS":0.000435812,"XPT":794.011,"SAR":0.266667,"NIO":0.03003,"LAK":0.000115162,"OMR":2.60078,"AMD":0.0020829,"CDF":0.00060944,"KPW":0.00111137,"SPL":6.0,"KES":0.00988121,"ZWD":0.00276319,"KHR":0.000246819,"MVR":0.0638201,"GTQ":0.130444,"BZD":0.496251,"BYR":4.81949e-05,"LYD":0.71279,"DZD":0.00830694,"BIF":0.000545446,"GIP":1.26302,"BOB":0.144409,"XOF":0.00170464,"STD":4.55561e-05,"NGN":0.00277791,"PGK":0.296296,"ERN":0.0666667,"MWK":0.00134295,"CUP":0.0377358,"GMD":0.0200884,"CVE":0.0101403,"BTN":0.0143701,"XAF":0.00170464,"UGX":0.000265744,"MAD":0.10311,"MNT":0.000379342,"LSL":0.0686472,"XAG":14.5819,"TOP":0.424809,"SHP":1.26302,"RSD":0.00948298,"HTG":0.0107671,"MGA":0.000273989,"MZN":0.0160952,"FKP":1.26302,"BWP":0.0916922,"HNL":0.0408417,"PYG":0.00015924,"JEP":1.26302,"EGP":0.0596914,"LBP":0.00066335,"ANG":0.559465,"WST":0.371804,"TVD":0.693655,"GYD":0.00477582,"GGP":1.26302,"NPR":0.00893943,"KMF":0.00227286,"IRR":2.37953e-05,"XPD":1331.58,"SRD":0.134686,"TMM":5.71429e-05,"SZL":0.0686472,"MOP":0.123859,"BMD":1.0,"XPF":0.00937029,"ETB":0.034368,"JOD":1.41044,"MDL":0.054889,"MRO":0.00271891,"YER":0.00400534,"BAM":0.571713,"AWG":0.558659,"PEN":0.295964,"VEF":0.100125,"SLL":0.000110558,"KYD":1.2198,"AOA":0.00302621,"TND":0.335123,"TJS":0.105934,"SCR":0.0714877,"LKR":0.00566993,"DJF":0.00561804,"GNF":0.000108997,"VUV":0.00877228,"SDG":0.0221684,"IMP":1.26302,"GEL":0.359335,"FJD":0.460299,"DOP":0.019756,"XDR":1.37762,"MUR":0.0276631,"MMK":0.00065511,"LRD":0.00523585,"BBD":0.5,"ZMK":7.54124e-05,"XAU":1305.28,"VND":4.27995e-05,"UAH":0.0370948,"TMT":0.285714,"IQD":0.000839882,"BGN":0.571713,"KGS":0.0143164,"RWF":0.00111983,"BHD":2.65957,"UZS":0.000117786,"PKR":0.00659136,"MKD":0.0180873,"AFN":0.0125992,"NAD":0.0686472,"BDT":0.0118322,"AZN":0.588237,"SOS":0.00171393,"QAR":0.274725,"PAB":1.0,"CUC":1.0,"SVC":0.114286,"SBD":0.1221,"ALL":0.00911161,"BND":0.72769,"KWD":3.2787,"GHS":0.185258,"ZMW":0.0754124,"XBT":8722.55,"NTD":0.0337206,"BYN":0.481949,"CNH":0.144145,"MRU":0.0271891,"STN":0.0455561,"VES":0.00017266},
    convert: function(amount, from, to) {
      return (amount * this.rates[from]) / this.rates[to];
    }
  };