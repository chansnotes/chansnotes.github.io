(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{377:function(a,t,_){"use strict";_.r(t);var i=_(25),e=Object(i.a)({},(function(){var a=this,t=a.$createElement,_=a._self._c||t;return _("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[_("blockquote",[_("h4",{attrs:{id:"nanopore의-가장-최신-버전인-r9을-기준으로-작성되었습니다"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#nanopore의-가장-최신-버전인-r9을-기준으로-작성되었습니다"}},[a._v("#")]),a._v(" Nanopore의 가장 최신 버전인 R9을 기준으로 작성되었습니다.")])]),a._v(" "),_("p",[a._v("인간 게놈 프로젝트의 종료 후, 10년동안 차세대 염기서열 해독법 (Next Generation Sequencing, 이하 NGS) 기술의 비약적인 발전이 있었다.\nIllumina 혹은 IonTorrent와 같은 2세대 NGS 기술은 매우 강력하지만, 100-500bp 길이의 short read만 시퀀싱이 가능하다.\n따라서 2세대 기술은 반복서열, 복제수변이 (CNV)와 같이 유전체의 복잡한 구조를 이해하는데에는 한계가 존재한다.")]),a._v(" "),_("p",[a._v("이러한 문제들을 해결하기 위해서 많은 연구들이 지속적으로 진행되었고, 그 결과 3세대 기술들이 등장하게 되었다.\n3세대 기술의 대표적인 예로는 Pacific Bioscience사의 SMRT 시퀀싱 기술과 Oxford Nanopore Technologies사의 Nanopore 시퀀싱 기술이 있다.")]),a._v(" "),_("p",[a._v("SMRT 시퀀싱은 형광을 사용하여 측정한다는 점에서 기존의 2세대 NGS와 유사하다. 하지만, short read가 아니라 long read까지도 시퀀싱이 가능하다는 점이 다르다.\n우수한 기술력을 가진 PacBio사는 2018년에 Illumina사가 long read 시퀀싱 기술력 확보를 위해 인수 되었다.")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://chansnotes.github.io/images/nanopore/ont_logo.png",alt:"ont_logo"}})]),a._v(" "),_("p",[a._v("PacBio사와는 반대로 독자적인 행보를 걷고 있는 Oxford Nanopore Technologies (이하 ONT)는 나노포어를 사용하여 기존과는 색다른 방식으로 시퀀싱을 한다.\n2012년에 첫 상품인 MinION을 발표하였다. MinION은 long read 시퀀싱이 가능한 포터블 나노포어 기기이며, 이는 많은 사람들의 관심을 한 몸에 받았다.")]),a._v(" "),_("p",[a._v("하지만 나노포어 기술에도 몇가지 문제점들이 존재했고, 이를 ONT에서 지속적인 업데이트를 통해 보완하는 작업을 진행중에 있다.\n현재는 R9.4 버전의 나노포어 기술이 발표된 상태이다.")]),a._v(" "),_("p",[a._v("그렇다면 도대체 이 나노포어는 무엇이고, 어떻게 나노포어를 가지고 시퀀싱을 하는 것일까?\n본 글에서는 나노포어와 나노포어 시퀀싱 기술에 대해 간략하게 소개를 하고자 한다.")]),a._v(" "),_("hr"),a._v(" "),_("h2",{attrs:{id:"나노포어란"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#나노포어란"}},[a._v("#")]),a._v(" 나노포어란?")]),a._v(" "),_("p",[a._v("Nanopore(이하 나노포어)는 문자 그대로 nano-meter 크기의 매우 작은 초소형 구멍을 뜻한다.\n생물세포내에 존재하는 나노포어는 주로 외부의 물질들을 내부로 보내는 역할을 한다.\n이러한 특징을 응용하여 많은 연구원들은 나노포어를 가지고 특정 물질을 전달하는 시스템이나 유전자 시퀀싱에 이용하기 시작하였다.")]),a._v(" "),_("p",[a._v("나노포어는 크게 두가지 종류로 나뉘어진다.")]),a._v(" "),_("h4",{attrs:{id:"_1-solid-state-나노포어"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_1-solid-state-나노포어"}},[a._v("#")]),a._v(" 1. Solid-state 나노포어")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://chansnotes.github.io/images/nanopore/silicon_nanopore.jpg",alt:"silicon_nanopore"}})]),a._v(" "),_("ul",[_("li",[a._v("생물학적 나노포어를 본따, 전도체를 사용하여 nano-meter 사이즈로 만든 나노포어")]),a._v(" "),_("li",[a._v("주로 실리콘, 알루미늄, 그래핀 등의 전도체로 나노포어를 만든다.")]),a._v(" "),_("li",[a._v("생물학적 나노포어의 성능은 완벽하게 균일하지 않지만, solid-state 나노포어는 획일화된 제조 공정을 통해 성능을 어느정도 균일하게 만들수 있다는 장점이 있다.")])]),a._v(" "),_("h4",{attrs:{id:"_2-biological-나노포어"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#_2-biological-나노포어"}},[a._v("#")]),a._v(" 2. Biological 나노포어")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://chansnotes.github.io/images/nanopore/variety_of_nanopores.png",alt:"nanopore_class"}})]),a._v(" "),_("ul",[_("li",[a._v("박테리아 혹은 다른 생물세포내에 존재하는 \b단백질형태의 나노포어")]),a._v(" "),_("li",[a._v("DNA 시퀀싱에 가장 많이 이용되는 4가지 종류\n"),_("ul",[_("li",[a._v("alpha-hemolysin")]),a._v(" "),_("li",[a._v("MspA")]),a._v(" "),_("li",[a._v("CsgG")]),a._v(" "),_("li",[a._v("bacteriophage phi 29")])])])]),a._v(" "),_("hr"),a._v(" "),_("h2",{attrs:{id:"나노포어-시퀀싱-방법"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#나노포어-시퀀싱-방법"}},[a._v("#")]),a._v(" 나노포어 시퀀싱 방법")]),a._v(" "),_("p",[_("img",{attrs:{src:"https://chansnotes.github.io/images/nanopore/sequencing.jpg",alt:"sequencing"}})]),a._v(" "),_("ol",[_("li",[a._v("나노포어를 전기 저항을 띄고 있는 멤브레인 표면에 설치함.")]),a._v(" "),_("li",[a._v("Leader motor가 시퀀싱하고자 하는 dsDNA에 부착됨.")]),a._v(" "),_("li",[a._v("나노포어의 구멍속으로 dsDNA가 차례차례 통과함. 이때, 통과되는 속도는 leader motor가 dsDNA를 single strand로 풀어지는 속도에 의해 조절됨.")]),a._v(" "),_("li",[a._v("일정한 크기의 전압을 나노포어에 지속적으로 걸어줌.")]),a._v(" "),_("li",[a._v("나노포어의 구멍 내부에 DNA가 지나가게되면, 나노포어의 저항 값이 증가함.")]),a._v(" "),_("li",[a._v("'옴의 법칙'에 따라 저항값이 증가하게 되면, 균일한 전압을 맞추기 위해 전류의 값이 감소함.")]),a._v(" "),_("li",[a._v("감소하는 전류 값을 통해 ACTG 핵산 및 methylation을 구분할 수 있음.")]),a._v(" "),_("li",[a._v("실시간으로 기록된 전류값의 변화를 통해 시퀀싱 정보를 얻음.")])]),a._v(" "),_("hr"),a._v(" "),_("h2",{attrs:{id:"나노포어-시퀀싱의-장단점"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#나노포어-시퀀싱의-장단점"}},[a._v("#")]),a._v(" 나노포어 시퀀싱의 장단점")]),a._v(" "),_("h4",{attrs:{id:"장점"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#장점"}},[a._v("#")]),a._v(" 장점")]),a._v(" "),_("ol",[_("li",[a._v("Read length를 길게 시퀀싱 가능 (kilo-base)")]),a._v(" "),_("li",[a._v("빠른 시퀀싱 속도")]),a._v(" "),_("li",[a._v("실시간 분석 가능")]),a._v(" "),_("li",[a._v("증폭 필요 없음 => base modification 혹은 methylation 정보를 잃지 않음")])]),a._v(" "),_("h4",{attrs:{id:"단점"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#단점"}},[a._v("#")]),a._v(" 단점")]),a._v(" "),_("ol",[_("li",[a._v("나노포어안에 하나의 nucleotide가 들어가 있는게 아니라, 한번에 4-5개의 nucleotide가 들어감.\n따라서, 반복되는 시퀀스를 구분하는데에 약간의 어려움이 존재. (= 호모폴리머 이슈)")])]),a._v(" "),_("hr"),a._v(" "),_("h2",{attrs:{id:"r9-나노포어-시퀀싱-개선점"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#r9-나노포어-시퀀싱-개선점"}},[a._v("#")]),a._v(" R9 나노포어 시퀀싱 개선점")]),a._v(" "),_("p",[a._v("2016년 5월에 ONT사에서 R9 버전으로의 업데이트를 발표하였다.\nR9 버전에서는 나노포어 종류와 분석 알고리즘 두가지가 개선되었다.")]),a._v(" "),_("ol",[_("li",[a._v("나노포어 변경; CsgG 사용 (기존 alpha-hemolysin 포어)")]),a._v(" "),_("li",[a._v("속도 빨라짐; 250bp/s")]),a._v(" "),_("li",[a._v("Hairpin ligation 없이 사용 가능\n"),_("ul",[_("li",[a._v("기존에는 leader motor가 dsDNA를 반으로 나누어주면서 나노포어로 들어가게 되고, 말단에서는 hairpin motor가 dsDNA를 묶어줌으로써 나노포어로 들어가는 속도를 조절해줌")]),a._v(" "),_("li",[a._v("기존 2D read => 1D^2 read")])])]),a._v(" "),_("li",[a._v("분석 알고리즘 RNN으로 변경 (기존의 HNN 알고리즘 보다 더 빠르고 정확한 분석)")])]),a._v(" "),_("ul",[_("li",[a._v("ONT CsgG 포어 관련\n"),_("ul",[_("li",[a._v("E.coli가 가지고 있는 CsgG 포어 단백질의 변이체")]),a._v(" "),_("li",[a._v("polypeptide를 translocate시키는 역할\n"),_("ul",[_("li",[a._v("Engineering을 통해 펩타이드 대신, DNA가 잘리도록 바꿈 (냠냠 먹어버리는것과 같은 효과!)")]),a._v(" "),_("li",[a._v("recombinant DNA 기술로 나노포어 생산함")])])]),a._v(" "),_("li",[a._v("36개의 베타-배럴 모양이 9개의 서브유닛을 이루어 pore 형성")])])])]),a._v(" "),_("h3",{attrs:{id:"자료-출처"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#자료-출처"}},[a._v("#")]),a._v(" 자료 출처:")]),a._v(" "),_("p",[a._v("[1] A.Magi et al. Briefings in Bioinformatics, 2017, 1-17")]),a._v(" "),_("p",[a._v("[2] N.Kono et al. Develop Growth Differ. 2019; 1-11")]),a._v(" "),_("p",[a._v("[3] ONT website")]),a._v(" "),_("hr"),a._v(" "),_("p",[a._v("이상으로 나노포어 시퀀싱 기술에 대해 간략하게 알아보았습니다.")]),a._v(" "),_("p",[a._v("다음 글에서는 나노포어 시퀀싱으로 얻어진 전류 데이터가 어떻게 유전체 정보로 바뀌는지 ONT사의 분석 프로세스에 대해\n간단하게 소개하고자 합니다.")])])}),[],!1,null,null,null);t.default=e.exports}}]);