<template>
  <div class="bindPhone">
    <div class="outerBox"></div>
    <div class="innerBox">
      <h3>绑定手机号</h3>
      <div class='register'>
        <p class='tel'>
          <input type="number" placeholder-class="input-placeholder" v-model="postData.phone" maxlength="11" placeholder="手机号">
          <button v-if="!postData.phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
        </p>
        <p class='identifying-code'>
          <input type="number" placeholder-class="input-placeholder"  maxlength="6" v-model="postData.token" placeholder="验证码">
          <span :class="{code: true, disabled: !preventCode, isOver: isOver}"  @click.stop="getCode">{{codeText}}</span>
        </p>
        <div class="remind" @click="changeColor">
          <icon type="success" size="19" :color="color"/>
          <div>
            <i>我已阅读并同意</i>
            <span @click.stop="goToRule(1)">《拾贝网用户注册协议》</span>
            <span @click.stop="goToRule(2)">《拾贝宝合伙人协议》</span>
          </div>
        </div>
        <button class="login" :class="{'hight': isHight}" @click="goLogin">{{loginText}}</button>
      </div>

    </div>
    <steps :step="1"></steps>
    <div class="body-mask" v-if="regAgreement" @click="regAgreement = false">
      <div class="dialog-box" v-if="ruleType==1">
        <h1>拾贝网用户注册协议</h1>
        <div class="content">
          <p class="text">版本生效日期：2018年10月1日</p>
          <p class="text">
          本协议是用户（以下亦简称为“您”）与拾贝平台（包括但不限于网页、电脑端及移动客户端等产品及其更新产品，下称“本站”）的所有者杭州拾贝知识产权服务有限公司（下称“拾贝”）之间就本站服务等相关事宜订立的协议，适用于您在本站的全部活动。</p>
          <p class="text">在您注册成为本站用户前请务必认真阅读本《用户注册协议》（以下简称“本协议”）中规定的所有权利和限制。若您已注册为拾贝用户，即表示您已充分阅读、理解并同意自己与拾贝订立本协议，且您自愿受本协议的条款约束。拾贝有权随时更新本协议并在拾贝网站上予以公告。经修订的条款一经在网站公布后，立即自动生效。如您不同意相关变更，必须停止使用本站。本协议内容包括协议正文及所有拾贝已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。一旦您继续使用本站，则表示您已接受并自愿遵守经修订后的条款。</p>
          <p class="text">一、本协议条款的确认和接纳</p>
          <p class="text">1.1本站的各项知识产权服务的所有权和运作权归拾贝所有，用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协议条款是规定双方权利义务的一致约定，始终有效，法律另有强制性规定或双方另有特别约定的除外。</p>
          <p class="text">1.2用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单选购服务等相应的权利能力和行为能力，能够独立承担法律责任。</p>
          <p class="text">1.3如果您在18周岁以下，您需在父母或监护人的监护参与下才能使用本站。</p>
          <p class="text">1.4拾贝保留在中华人民共和国法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</p>
          <p class="text">二、服务的提供</p>
          <p class="text">2.1本站通互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本站相关规定的情况下，方有权使用本站的相关服务。</p>
          <p class="text">2.2用户必须自行准备如下设备和承担如下开支：(1)上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；(2)上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。</p>
          <p class="text">2.3用户可在本站上查询其所选择的相关服务信息、参加本站的有关活动，以及使用本站提供的其他服务。</p>
          <p class="text">三、用户信息</p>
          <p class="text">3.1在完成注册时，用户自行诚信按本站相应页面的提示同意准确提供并及时更新用户的注册资料，以使之真实、准确、完整、合法、有效。如有合理理由怀疑您提供的资料不真实、不准确、不详尽、不合法或无效的，拾贝有权向您发出询问及/或要求改正的通知，并有权直接做出删除相应资料的处理，直至中止/终止对您提供部分或全部服务。拾贝对此不承担任何责任，一切不利后果由您自负。</p>
          <p class="text">3.2您应当准确并及时更新您提供的电子邮件地址、联系电话、姓名等联系方式，以便拾贝与您进行有效联系，因通过这些联系方式无法与您取得联系，导致您在使用本站的服务过程中产生任何损失由您自负。您了解并同意，您有义务保持您提供的联系方式的有效性。</p>
          <p class="text">3.3您授权本站及拾贝可以通过向第三方验证审核您的身份和资格，并取得您使用本站服务的相关资料。</p>
          <p class="text">3.4在您使用本站服务或访问本站网页时，本站自动接收并记录的您的浏览器和计算机上的信息，包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息等；如您下载或使用本站或本站关联公司移动客户端软件，或访问移动网页使用本站平台服务时，本站可能会读取与您位置和移动设备相关的信息，包括但不限于设备型号、设备识别码、操作系统、分辨率等。</p>
          <p class="text">四、用户使用规则</p>
          <p class="text">4.1 用户注册成功后，将产生用户名和密码等账户信息，您须对您的用户登录名和密码自行负责保密，且须对您在该登录名和密码下发生的所有活动（包括但不限于信息披露、发布信息或提交各类规则服务条款及网上续签服务条款等）承担责任。您同意：</p>
          <p class="text">4.1.1如发现任何人未经授权使用您的本站用户登录名和密码或发生违反保密规定的任何其他情况，您会立即通知拾贝，并授权拾贝将前述情况进行处理，以保障您的合法权益。</p>
          <p class="text">4.1.2确保您在每个上网时段结束时，以正确步骤离开本站。拾贝不能也不会对因您未能遵守本款规定而发生的任何损失或损毁及其他不利后果负责。您理解拾贝对您的请求采取行动需要合理时间，拾贝对在采取行动前已经产生的后果（包括但不限于您的任何损失）不承担任何责任。</p>
          <p class="text">4.1.3不应将在本站注册获得的账户以出借、转让、赠与等方式给予他人使用，除非有法律规定或司法裁定，且征得拾贝的同意，否则您将承担由此产生的全部责任，并与实际使用人承担连带责任。</p>
          <p class="text">4.2用户在使用本站服务过程中，必须遵循以下原则：</p>
          <p class="text">4.2.1遵守中国有关的法律和法规。</p>
          <p class="text">4.2.2不得有危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的。</p>
          <p class="text">4.2.3不得有损害国家荣誉和利益的，损害公共利益的。</p>
          <p class="text">4.2.4不得有煽动民族仇恨、民族歧视，破坏民族团结的。</p>
          <p class="text">4.2.5不得有破坏国家宗教政策，宣扬邪教和封建迷信的。</p>
          <p class="text">4.2.6不得有散布谣言，扰乱社会秩序，破坏社会稳定的。</p>
          <p class="text">4.2.7不得有散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的。</p>
          <p class="text">4.2.8不得有侮辱或者诽谤他人，侵害他人合法权益的。</p>
          <p class="text">4.2.9含有法律、行政法规禁止的其他内容的。</p>
          <p class="text">4.2.10遵守所有与网络服务有关的网络协议、规定和程序。</p>
          <p class="text">4.2.11不得利用本站网络服务系统进行任何可能对互联网或移动网正常运转造成不利影响的行为。</p>
          <p class="text">4.2.12不得侵犯本站和其他任何第三方的知识产权或其他任何合法权益。</p>
          <p class="text">4.2.13不得利用本站网络服务系统进行任何不利于本站服务的行为。</p>
          <p class="text">4.2.14如发现任何非法使用用户账号或账号出现安全漏洞的情况，应立即通知本站。</p>
          <p class="text">4.3如用户在使用本站服务时违反上述任何规定，本站或本站授权方有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户上传的信息等、暂停或终止用户使用本站服务的权利）以减轻用户不当行为造成的影响。</p>
          <p class="text">4.4您同意接受本站通过电子邮件、短信、即时通信的客户端、网页或其他合法方式向您发送相关订单信息、具体服务办理状态、服务规则及行业资讯、促销活动等信息，但本站及拾贝不保证您能够收到或者及时收到信息，且不对此承担责任。因此，在服务过程中您应当及时登录到本站查看和进行相关操作。因您没有及时查看和对服务状态进行修改或确认或未能提交相关申请而导致的任何纠纷或损失由您独自承担。</p>
          <p class="text">4.5在您使用本站服务时，拾贝有权依照相应的服务条款向您收取服务费用，拾贝在收取服务费用之前将征得您的同意。拾贝拥有制订及调整服务费的权利，具体收费项详见www.ipsebe.com相关产品与服务或以您与拾贝达成的其他书面服务条款为准。</p>
          <p class="text">4.6您知悉并理解本站上已公布的服务价格、图片及详情等信息随时都有可能发生变动，对此本站及拾贝不作特别通知。</p>
          <p class="text">五、拾贝的权利和义务</p>
          <p class="text">5.1拾贝应根据您选择的服务以及支付款项的情况向您提供相应的网络技术和信息服务。</p>
          <p class="text">5.2拾贝承诺对您提供的资料采取对外保密措施，不向任何第三方披露或授权第三方使用，除非：</p>
          <p class="text">5.2.1依据本站服务条款或者您与拾贝之间其他服务条款、协议、在线条款等规定可以提供。</p>
          <p class="text">5.2.2依据法律法规的规定应当提供。</p>
          <p class="text">5.2.3您同意拾贝向第三方提供。</p>
          <p class="text">5.2.4拾贝解决举报事件、提起诉讼而提交的或为防止严重违法行为或涉嫌犯罪行为发生而采取必要合理行动所必须提交的。</p>
          <p class="text">5.3拾贝保留在您违反国家、地方法律法规规定或违反本站服务条款的情况下终止为您提供服务并注销您账户的权利。</p>
          <p class="text">5.4本站含有到其他网站或资源的链接，用户可能会因此连结至其它运营商经营的网站，但不表示拾贝与这些运营商有任何关系。其它运营商经营的网站均由各经营者自行负责，不属于拾贝控制及负责范围之内。对于存在或来源于此类网站或资源的任何内容、广告、物品或其它资料，拾贝亦不予保证或负责。因使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、物品或服务所产生的任何损害或损失，拾贝不负任何直接或间接的责任。特别是拾贝对其他网站的隐私保护措施不负任何责任。拾贝可能在任何需要的时候增加商业伙伴或共用品牌的网站。</p>
          <p class="text">5.5拾贝仅按现有技术提供相应的安全措施来使拾贝掌握的信息不丢失，不被滥用和变造。这些安全措施包括向其他服务器备份数据和对用户密码加密。尽管有这些安全措施，但拾贝不保证这些信息的绝对安全。</p>
          <p class="text">5.6为向您提供更全面的服务，拾贝会将依法收集到的您的个人信息用于审计、数据分析、研究和关联公司之间分享等内部目的。</p>
          <p class="text">5.7视具体情况，拾贝会向与拾贝合作提供产品和服务或者帮助拾贝向客户进行营销的合作伙伴提供某些个人信息。拾贝只会为提供或改进拾贝的产品、服务和广告宣传之目的而与第三方共享个人信息；而不会为第三方的营销目的与第三方共享个人信息，更不会销售个人信息。拾贝有义务要求上述合作伙伴严格遵守保密约定。</p>
          <p class="text">六、服务中断或终止</p>
          <p class="text">6.1本站系统可能因下列状况无法正常运作，使用户无法使用本站各项服务时，拾贝不承担损害赔偿责任，该状况包括但不限于：</p>
          <p class="text">6.1.1因台风、地震、海啸、洪水、停电、战争、恐怖袭击等不可抗力之因素，造成本站网络系统障碍不能执行业务的。</p>
          <p class="text">6.1.2电信设备出现故障不能进行数据传输的。</p>
          <p class="text">6.1.3由于黑客攻击、电信部门技术调整或故障原因、用户手机故障或病毒、信息损坏或丢失而造成的服务中断或者延迟。</p>
          <p class="text">6.2用户理解，拾贝需要定期或不定期地对提供本站服务的平台（如互联网网站、移动网络、软件等）或相关的设备进行检修或维护更新，如因此情况造成本站服务在合理时间内的中断，拾贝无需为此承担任何责任。</p>
          <p class="text">6.3如发生下列任何一种情形，拾贝有权随时中断或终止向用户提供本站各项服务而无需对用户或任何第三方承担任何责任：</p>
          <p class="text">6.3.1用户提供的个人资料不真实，且侵犯了他人的合法权益。</p>
          <p class="text">6.3.2用户违反本协议中规定的使用规则。</p>
          <p class="text">6.4本站不能随时预见到任何技术上的问题或其他困难，该等困难可能会导致数据损失或其他服务中断。</p>
          <p class="text">七、知识产权的保护</p>
          <p class="text">7.1本站上所有内容，包括但不限于文字信息、图片、档案、分析数据、资料、网站架构、网站画面的安排、网页设计，均由拾贝或拾贝关联公司依法拥有其知识产权。</p>
          <p class="text">7.2本站的标识（包括但不限于域名，APP，微信公众号、订阅号等）、源代码及所有页面的版式设计等，版权归拾贝所有。未经授权，不得用于除拾贝之外的任何站点。</p>
          <p class="text">7.3非经拾贝或拾贝关联公司书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本站程序及内容。</p>
          <p class="text">7.4尊重知识产权是用户应尽的义务，如有违反，用户应承担损害赔偿责任。</p>
          <p class="text">八、本协议责任范围及责任限制</p>
          <p class="text">8.1拾贝仅对本协议中列明的责任承担范围负责。</p>
          <p class="text">8.2本站得到的用户信息是由您本人自行提供的，本站在获得途径保证信息之准确、及时和完整之前，您应对您的判断承担全部责任。</p>
          <p class="text">8.3您自拾贝及拾贝工作人员或经由本站服务取得之建议和资讯，无论该建议和资讯为书面或口头形式，均不构成拾贝对本站服务的保证。</p>
          <p class="text">8.4除另有规定外，在任何情况下，拾贝对本协议所承担的违约赔偿责任总额不超过向您收取的当次服务费用的总额。</p>
          <p class="text">九、隐私</p>
          <p class="text">本站严格保护您的个人信息安全。拾贝使用各种制度、安全技术和程序等措施来保护您的个人信息不被未经授权的访问、篡改、披露或破坏。如果您对拾贝的个人信息保护有任何疑问，请联系拾贝的客服。</p>
          <p class="text">在通过本站与第三方进行网上商品或服务的交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址等。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，尤其是您的账户及密码发生泄露，请您立即联络拾贝的客服，以便拾贝采取相应措施。</p>
          <p class="text">9.1信息的收集</p>
          <p class="text">拾贝收集信息是为了向您提供更好以及更个性化的服务，并努力提高您的用户体验。拾贝收集信息的种类如下：</p>
          <p class="text">9.1.1您向拾贝提供的信息</p>
          <p class="text">当您注册本站账户及您在使用相关本站服务时填写、提交及/或其他任何方式提供的信息，包括但不限于您的姓名、性别、出生年月日、身份证号码、护照姓、护照名、护照号码、电话号码、电子邮箱、收货地址、本站账号、银行卡信息及相关附加信息（如您地址中的所在的省份和城市、邮政编码等）。您可以选择不提供某一或某些信息，但是这样可能使您无法使用本站的许多特色服务。请您理解，拾贝使用您提供的信息是为了回应您的要求，为您在本站享受服务提供便利，完善本站网站以及与您进行信息沟通。另外，拾贝可能会将您所提供的信息与您的本站账户关联，用以识别您的身份。</p>
          <p class="text">9.1.2拾贝在您使用服务过程中获取的信息</p>
          <p class="text">为了提高服务质量和用户体验，拾贝会留存您使用服务以及使用方式的相关信息，这类信息包括：</p>
          <p class="text">a.您的浏览器和计算机上的信息。在您访问本站网站或使用本站服务时，本站系统自动接收并记录的您的浏览器和计算机上的信息（包括但不限于您的IP地址、浏览器的类型、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据）。</p>
          <p class="text">b.您的位置信息。当您下载或使用本站、其关联方及合作伙伴开发的应用程序（例如本站APP），或访问移动网页使用本站服务时，本站可能会读取您的位置（大多数移动设备将允许您关闭定位服务，具体建议您联系您的移动设备的服务商或生产商）。</p>
          <p class="text">c.您的行为或交易信息。本站可能会记录您访问本站或使用本站服务时所进行的操作以及您在本站上进行交易的相关信息。</p>
          <p class="text">除上述信息外，拾贝还可能为了提供服务及改进服务质量的合理需要而获得的您的其他信息，包括您与拾贝的客服团队联系时您提供的相关信息，您参与问卷调查时向拾贝发送的问卷答复信息，以及您与本站的关联方、本站合作伙伴之间互动时拾贝获得的相关信息。同时，为提高您使用本站提供的服务的安全性，更准确地预防钓鱼网站欺诈和木马病毒，拾贝可能会通过了解一些您的网络使用习惯、您常用的软件信息等手段来判断您账户的风险，并可能会记录一些拾贝认为有风险的链接。</p>
          <p class="text">9.1.3来自第三方的信息</p>
          <p class="text">指在您注册本站账户和使用服务过程中，您授权的本站可向本站的关联方、合作伙伴所收集的相关信息，以及您授权的本站的关联方、合作伙伴可向本站分享相关的信息。这些信息包括但不限于您的身份信息、行为信息、交易信息、设备信息等，本站会将此类信息汇总，用于帮助本站向您提供更好以及更加个性化的服务或更好的预防互联网欺诈。</p>
          <p class="text">您了解并同意，以下信息不适用本隐私政策：</p>
          <p class="text">a.您在使用本站提供的搜索服务时输入的关键字信息。</p>
          <p class="text">b.信用评价、违反法律法规规定或违反本站平台规则行为及本站已对您采取的措施。</p>
          <p class="text">c.应法律法规要求需公示的企业名称等相关工商注册信息以及自然人经营者的信息。</p>
          <p class="text">d.所收集的信息是您自行向社会公众公开的。</p>
          <p class="text">e.从合法公开披露的信息中收集的个人信息的。</p>
          <p class="text">f.其他您与本站或本站的关联方所签署的协议（包括在线签署的电子协议，以及本站平台规则中明确约定或提示您不适用本隐私政策的与您有关的信息。</p>
          <p class="text">g.法律法规规定的其他情形。</p>
          <p class="text">9.2信息的使用</p>
          <p class="text">9.2.1拾贝不会向任何人出售或出借用户的个人或法人信息，除非事先得到用户得许可。</p>
          <p class="text">9.2.2拾贝亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播用户的个人或法人信息。任何用户如从事上述活动，一经发现，拾贝有权立即终止与该用户的用户协议，查封其账号。</p>
          <p class="text">9.3信息的披露</p>
          <p class="text">用户的个人或法人信息将在下述情况下部分或全部被披露：</p>
          <p class="text">9.3.1经用户同意，向第三方披露。</p>
          <p class="text">9.3.2用户在使用拾贝过程中涉及到知识产权类纠纷，有他方主张权利的，拾贝在审核主张方提交的资料后认为披露用户信息有助于纠纷解决的。</p>
          <p class="text">9.3.3根据法律的有关规定，或者行政、司法机关的要求，向第三方或者行政、司法机关披露。</p>
          <p class="text">9.3.4若用户出现违反中国有关法律或者网站规定的情况，需要向第三方披露。</p>
          <p class="text">9.3.5为提供你所要求的产品和服务，而必须和第三方分享用户的个人或法人信息。</p>
          <p class="text">9.3.6其它拾贝根据法律或者网站规定认为合适的披露。</p>
          <p class="text">9.4信息的安全：</p>
          <p class="text">9.4.1在使用拾贝服务进行网上交易时，请用户妥善保护自己的个人或法人信息，仅在必要的情形下向他人提供。</p>
          <p class="text">9.4.2如果用户发现自己的个人或法人信息泄密，尤其是用户账户或“支付账户管理”账户及密码发生泄露，请用户立即联络拾贝客服，以便拾贝采取相应措施。</p>
          <p class="text">十、其他</p>
          <p class="text">10.1如果本协议中的任何条款无论何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本协议其余条款仍应有效并且有约束力。</p>
          <p class="text">10.2拾贝有权随时根据有关法律、法规的变化以及公司经营状况经营策略的调整等修改本协议，具体服务条款和公告，无需另行单独通知用户，若您在本协议内容公告变更后继续使用本站的服务，表示您已充分阅读、理解并接受修改后的协议；同时就您在协议、各服务条款或公告修订前通过本站进行的交易及其效力，视为您已同意并已按照本协议进行了相应的授权和追认。若您不同意修改后的协议内容，您应停止使用本站的服务。当发生有关争议时，以最新的协议文本为准。</p>
          <p class="text">10.3本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生的争议，双方应尽力友好协商解决；协商不成时可向被告住所地人民法院提起诉讼。</p>
          <p class="text">10.4本协议的更新调整最终解释权归本平台所有。</p>
        </div>
      </div>
      <div class="dialog-box" v-if="ruleType==2">
        <h1>拾贝宝合伙人协议</h1>
        <div class="content">
          <p class="text">版本生效日期：2018年10月1日</p>
          <p class="text">本协议用户（以下亦简称为“您”）在注册成为拾贝宝用户前请务必认真阅读《拾贝宝合伙人协议》（以下简称“本协议”）中规定的所有权利和限制。若您已注册为拾贝宝用户，即表示您已充分阅读、理解并同意自己与拾贝订立本协议，且您自愿受本协议的条款约束。拾贝有权随时更新本协议并在拾贝网站上予以公告。经修订的条款一经在拾贝网站公布后，立即自动生效。如您不同意相关变更，必须停止使用拾贝宝。本协议内容包括协议正文及所有拾贝已经发布的各类规则。所有规则为本协议不可分割的一部分，与本协议正文具有同等法律效力。一旦您继续使用拾贝宝，则表示您已接受并自愿遵守经修订后的条款。</p>
          <p class="text">第一条 双方情况说明</p>
          <p class="text">1.1杭州拾贝知识产权服务有限公司（以下简称“拾贝”）是中国产学研合作促进会反侵权假冒创新战略联盟理事长单位，具体承担联盟知识产权保护和打假维权工作及为社会共治建设创建的知识产权保护开放性平台的运营支持工作；同时作为浙江清华长三角研究院杭州分院知识产权研究中心的单位，利用云计算和大数据及移动互联网技术，首创开发了专业、简便、互通的“拾贝知识产权服务平台”（以下简称“拾贝平台”），致力于通过线上、线下相结合的方式为大中小企业提供知识产权咨询、保护、监测、维权、扶持、运营等知识产权保护服务，拾贝宝是拾贝平台下为您提供相关服务的工具。</p>
          <p class="text">1.2您已注册成为拾贝平台用户，并自愿使用拾贝宝工具开发客户、为客户提供相关业务服务。您具备客户开拓能力，也可能具备业务的具体操作能力。</p>
          <p class="text">第二条 合作内容</p>
          <p class="text">2.1 您开通拾贝宝账号并使用拾贝宝工具产品，为客户推广拾贝宝工具产品中的标准业务；拾贝宝为您提供品牌、技术、小程序店铺、作业工具、后台流程、资金安全、信息安全等服务支持。</p>
          <p class="text">2.2 对于您具备业务处理能力的，由您负责业务部分的处理，拾贝宝负责收款、开具发票、流程、递交的处理，如您不具备业务的处理能力，则拾贝宝负责业务处理、收款、开具发票、流程、递交的处理。</p>
          <p class="text">2.3 拾贝宝负责提供拾贝宝服务所需的技术及资源投入，保证满足您办理业务流程的需要。</p>
          <p class="text">2.4 拾贝负责拾贝宝平台运营维护，保证业务对接以及数据不丢失，如因第三方服务器和平台用户终端设置等问题造成的投诉，双方应及时沟通确认，并向客户进行合理解释，以获得客户谅解。</p>
          <p class="text">2.5 您同意按拾贝宝要求的服务标准为客户提供合法、专业、高效、标准化的服务。</p>
          <p class="text">2.6 您自行为客户提供的业务服务，如因服务质量问题引起客户的的投诉，其经济和名誉损失由您自行承担，拾贝宝会积极配合妥善处理此类客户投诉的服务工作。如因您不具备业务处理能力，而由拾贝宝提供业务服务的，服务质量问题由拾贝宝自行承担。</p>
          <p class="text">第三条 双方的责任</p>
          <p class="text">3.1拾贝宝责任：</p>
          <p class="text"> （1）拾贝宝应遵守相关法律法规的规定，负责平台的日常运营工作。</p>
          <p class="text"> （2）拾贝宝负责拾贝宝平台业务接入标准的制订，并为您提供规范的业务标准流程。</p>
          <p class="text"> （3）拾贝宝负责为您提供后台应用程序接口，并负责提供接入具体服务时的技术指导。</p>
          <p class="text"> （4）拾贝宝负责拾贝宝的安全和稳定，负责对服务业务运营状况进行监控，发现异常时应及时通报和处理。</p>
          <p class="text">3.2您责任：</p>
          <p class="text"> （1）您应遵守相关法律法规的规定，保证合法、专业、高效的处理客户的业务，如因您业务处理失误而引起的责任纠纷，由您自行承担相关责任。</p>
          <p class="text"> （2）您应提交真实有效的身份证明信息和知识产权服务从业资格证明文件，用以证明您有能力在拾贝宝上提供知识产权业务服务；您以拾贝名义对接的客户应通过拾贝宝进行业务办理；如您接入的客户向拾贝宝投诉您服务态度、服务质量和服务效率等，拾贝宝有权进行调查并根据规则进行处理。如您在单一自然年度内被投诉超过三次，拾贝宝有权单方关闭您的拾贝宝账户，同时有权要求您承担违约责任，违约金不低于10000元；造成拾贝宝损失的，违约金优先偿付该损失，如违约金仍不能弥补拾贝宝的损失，拾贝宝仍有权向您进行追偿。</p>
          <p class="text"> （3）您与客户产生服务纠纷，您应本着诚实守信，勤勉尽责，恪守职业道德的原则自行与客户达成和解；仍不能解决的，拾贝宝可协调解决，您应积极配合。</p>
          <p class="text"> （4）您有义务将发现拾贝宝的问题及时反馈给拾贝宝，并配合拾贝宝共同对故障原因进行分析及处理。</p>
          <p class="text">第四条 利益分配</p>
          <p class="text">4.1双方费用结算以拾贝宝统计结果为准。</p>
          <p class="text">4.2 拾贝宝有权根据实际业务需要增加或降低甲乙双方的分润比例，但需要及时通知您。您签订本协议时已对本协议约定的分润比例有了充分的了解，且同意如实际的分润比例与本协议不一致的，以拾贝宝公布的分润比例为准。</p>
          <p class="text">4.3您通过拾贝宝产生的业务收入，双方按比例分润，具体如下：</p>
          <p class="text"> （1）您通过拾贝宝平台为其客户提供服务，其中，您负责具体业务咨询、销售、具体业务处理；拾贝宝负责确认收款、发票开具、订单审核、及时安排流程向官方递交申请、更新订单进展以及官文收发。该业务在扣除业务官费和税费后，分润比例为：拾贝宝30%；您70%。</p>
          <p class="text"> （2）您通过拾贝宝为其客户提供服务，其中，您仅负责咨询和销售、不负责具体业务处理；拾贝宝负责具体业务处理、确认收款、发票开具、订单审核、及时安排流程向官方递交申请、更新订单进展以及官文收发。该业务在扣除业务官费和税费后，分润比例为：拾贝宝50%；您50%。</p>
          <p class="text"> （3）您仅提供客户需求，拾贝宝负责业务咨询服务、销售、确认收款、发票开具、订单审核、及时安排流程向官方递交申请、更新订单进展以及官文收发。该业务在扣除业务官费和税费后，分润比例为：拾贝宝60%；您40%。</p>
          <p class="text"> （4）如果您向拾贝宝邀约其他合伙人，且该新合伙人通过您在拾贝宝的专属代码信息注册开通拾贝宝账号，该新合伙人以3.3（1）（2）（3）方式通过拾贝宝产生成功订单的，您可以获得该案件扣除官费和税费以外服务费的10%作为业务开拓奖励，该奖励由拾贝承担。</p>
          <p class="text">4.4在您完成承接的案件，递交官方并由客户验收后，拾贝宝将按照3.3所述分润制度，自动核算您应得收入，并将您的应得收入存入您在拾贝宝的账户中。您每月1-20日可以对上一个月的收益申请提现，拾贝宝将在每月20-30日核实申请金额后将相应款项转汇给您在本协议中注明的银行账户。您为个人的，拾贝宝会代为扣除劳务税费；您为公司的，应在申请提现的同时向拾贝宝提供与提现金额等额的增值税专用发票，拾贝宝在收到相应的增值税专用发票后向您支付相应的款项。</p>
          <p class="text">4.5您对拾贝宝统计数据有异议，需与拾贝宝沟通并提供书面异议说明，拾贝宝收到该说明后配合找出问题进行解决。</p>
          <p class="text">第五条 服务响应</p>
          <p class="text">5.1您作为具体业务服务的第一人，应在最短时间内响应其客户的业务咨询。</p>
          <p class="text">5.2拾贝宝作为您及其客户的业务服务工具，应及时解答您及客户的问题与投诉。</p>
          <p class="text">5.3拾贝宝客服联系方式为电话：            ；邮箱：                 。</p>
          <p class="text">第六条 专业支持与培训</p>
          <p class="text">为保证本协议合作的良性发展，双方有必要就专业支持和提高用户服务水平及质量，扩大用户群和加强售后服务问题保持经常的联络、交流和培训。您应至少在每个季度内对拾贝宝进行一次信息反馈，对优化拾贝宝服务流程、提升拾贝宝服务质量提出意见和建议。在拾贝宝组织和主持下，拾贝宝可以为您及您的邀请合伙人提供业务培训和讲座。</p>
          <p class="text">第七条 违约责任</p>
          <p class="text">7.1对于上述约定条款，双方均应遵守执行。如一方违约，违约方应承担由此带来的法律责任，并赔偿另一方由此带来的损失。</p>
          <p class="text">7.2拾贝宝使用期内，如您发布的个人资质和业务内容不符合相关法律法规以及拾贝宝要求，经拾贝宝协商提醒不能及时改正时，拾贝宝有权单方关闭您的拾贝宝账户，取消您在拾贝宝上的展示，并要求您赔偿客户和拾贝宝为此所遭受的损失。</p>
          <p class="text">第八条 保密规定</p>
          <p class="text">8.1双方均对对方所涉及的业务及相应的技术具有保密义务。未经信息的所有权方事先书面同意，另一方不得向任何第三方披露，因不遵守该条款而引发的后果，由披露方承担全部责任，并赔偿因此给对方造成的损失。</p>
          <p class="text">8.2本协议规定的保密期限于该信息交付之日起至该项信息被权利人或他人正式公开之日止。</p>
          <p class="text">第九条 其他规定</p>
          <p class="text">9.1如果本协议中的任何条款无论何种原因完全或部分无效或不具有执行力，或违反任何适用的法律，则该条款被视为删除，但本协议其余条款仍应有效并且有约束力。</p>
          <p class="text">9.2拾贝有权随时根据有关法律、法规的变化以及公司经营状况经营策略的调整等修改本协议，具体服务条款和公告，无需另行单独通知用户，若您在本协议内容公告变更后继续使用拾贝宝的服务，表示您已充分阅读、理解并接受修改后的协议；同时就您在协议、各服务条款或公告修订前通过拾贝宝进行的交易及其效力，视为您已同意并已按照本协议进行了相应的授权和追认。若您不同意修改后的协议内容，您应停止使用拾贝宝的服务。当发生有关争议时，以最新的协议文本为准。</p>
          <p class="text">9.3 本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律。因本协议产生的争议，双方应尽力友好协商解决；协商不成时可向拾贝住所地人民法院提起诉讼。</p>
          <p class="text">9.4本协议的更新调整最终解释权归拾贝所有。</p>
        </div>
      </div>
      <div class="close" @click="regAgreement = false"></div>
    </div>
    <u-message/>
    <mptoast/>
  </div>
</template>

<script>
  const userUrl = CONFIG.userUrl;
  const indexUrl = CONFIG.indexUrl;
  const indexPath = CONFIG.indexPath;
  import md5 from 'md5'
  import qs from 'qs'
  import steps from './components/steps'

  export default {
    components: {
      steps
    },
    data () {
      return {
        ruleType: 1,
        isOver: false,
        color: '#EEEEEE',
        submitDisabled: false,
        codeText: '获取验证码',
        loginText: '确定',
        ver_tip: '',
        preventCode: true,
        regAgreement: false,
        postData:{
          phone:'',
          password:'',
          beforeLoginCode:'',
          token:''
        }
      }
    },
    computed: {
      isChecked() {
        return this.color !== '#EEEEEE'
      },
      isHight() {
        return !!(this.postData.phone && this.postData.token)
      }
    },
    mounted() {
      let query = this.$root.$mp.query;
      console.log('bindPhone_query:', query)
    },
    methods: {
      tips (msg){
        this.$message({content: msg, type: 'error'})
      },
      changeColor() {
        this.color = this.color === '#EEEEEE' ? '#2F80F6' : '#EEEEEE';
      },
      async getPhoneNumber(e) {
        let phone = await this.API.interfaces.getPhoneNumber(e);
        this.postData.phone = phone;
      },

      goToRule (type) {
        this.regAgreement = true;
        this.ruleType = type;
      },

      // 获取验证码  判断是否有可用的手机号
      getCode () {
        let postData = this.postData;
        let phone = postData.phone;
        if (!phone.trim()) {
          this.tips('请输入手机号')
          this.checkPostData = true;
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.tips('请输入正确的手机号')
          this.checkPostData = true;
          return false;
        };
        if (this.preventCode) {
          this.preventCode = false;
          this.getCapcha();
        }
      },

      //向手机号发送 验证码
      async getCapcha () {
        try {
          await this.API.interfaces.sms(this.postData.phone, {
            errorAction: true
          });
          this.timeout();
          this.$mptoast('验证码已发送');
          this.isOver = false;
        } catch(e) {
          this.preventCode = true;
          /*this.$mptoast({
            text: e.msg,
            icon:'error',
            duration:  2000,
          })*/
        }
      },

      //定时器 发送验证码的定时器
      timeout () {
        var self = this;
        var second = 59, timer;
        timer = setInterval(function(){
          if(second<=0){
            clearInterval(timer);
            second = 59;
            self.codeText = "重发验证码";
            self.preventCode = true;
          }else{
            self.codeText = second + "s后可重发";
            self.preventCode = false;
            second--;
          }
        }, 1000);
      },

      //校验 手机号 密码 验证码
      checkValid() {
        var postData = this.postData;
        var phone = postData.phone;
        var token = postData.token;
        if (!phone.trim()) {
          this.tips('请输入手机号')
          return false;
        } else if(!/^1\d{10}$/.test(phone)){
          this.tips('请输入正确的手机号')
          return false;
        }
        if (!token.trim()) {
          this.tips('请输入验证码')
          return false;
        }else if(token.length !== 6){
          this.tips('校验码为6位数')
          return false;
        }
        if (!this.isChecked) {
          this.tips('请阅读同意《拾贝网用户注册协议》《拾贝宝合伙人协议》')
          return false;
        }
        return true;
      },

      async goLogin() {
        if (!this.checkValid()) {
          return;
        }
        try {
          let interfaces = this.API.interfaces;
          let query = this.$root.$mp.query;
          let scene = query.scene;
          scene = scene ? qs.parse(scene) : query;
          console.log('scene：', scene);
          let memberId = scene.memberId;
          let loginRes = await interfaces.login(this.postData.phone, this.postData.token, memberId);
          if(loginRes.code == 0) {
            interfaces.syncStore(loginRes);
            this.loginSuccessHandle();
          } else if(loginRes.code == 10013) {
            this.tips('您的账号存在异常，请先联系4000-315-426解除异常');
            return;
          } else if(loginRes.code == 10023) {
            this.tips('手机验证码错误');
            return;
          } else if(loginRes.code == 10009) {
            this.tips('验证码发送过于频繁');
            return;
          } else if(loginRes.code == 10010 || loginRes.code == 10012 || loginRes.code == 500 || loginRes.code == 400 || loginRes.code == 100004 || loginRes.code == 100003 || loginRes.code == 10002) {
            this.init = false;
            this.isErr = true;
            return;
          } else if(loginRes.code == 300017){
            wx.showModal({
              title: '',
              showCancel:false,
              confirmColor:"#10AEFF",
              content: '手机号已与另一个微信账号关联，请换一个手机号再试'
            })
          } else if(loginRes.code == 300016){
            wx.showModal({
              title: '',
              showCancel:false,
              confirmColor:"#10AEFF",
              content: '微信账号已与另一个手机号关联，请换一个微信账号再试'
            })
          }else{
            this.init = false;
            this.isErr = true;
          }
          console.log('loginRes:',loginRes)
        }
        catch(err){
          console.log('login error')
          // this.loaded();
        }
      },

      loginSuccessHandle(){
        let query = Object.assign({}, this.$root.$mp.query);
        let from = query.path;
        let userData = this.$storage.get('auth');
        let path = ''
        if (from) {
          path = from
        } else if (userData.isHaveStore == 1) {
          path = indexPath;
          wx.switchTab({ url: indexPath})
          return
        }else{
          path = '/pages/authorize/openShop'
          query.noHandle = 1;
        }
        this.$router.replace({
          path,
          query
        });
      }
    },
    watch: {
      'postData.phone': function() {
        let phone = this.postData.phone;
        if (phone && phone.length == 11) {
          this.isOver = true;
        }
      }
    }
  }
</script>

<style lang='scss'>
  .bindPhone{
    height: 100%;
    .input-placeholder{color: #bbb;}
    .innerBox{
      position: absolute;top: 30px;left: 40px;right: 40px;bottom: 30px;padding-top: 90px;background-color: #fff;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5);border-radius:6px;
      h3{height:56px;line-height: 56px;font-size:40px;text-align: center;font-weight:600;}
      .register{
        width: 600px;margin: 100px auto 0;
        p{
          width: 600px;height: 90px;padding: 4px;border-radius:45px;border:1px solid #E6E6E6;position: relative;font-size:30px;
        }
        .tel{
          input{width: 100%;height: 100%;border-radius:50%;padding-left: 36px;}
          button{height: 78px;line-height: 78px;padding: 0; border: 0;position: absolute;right: 40px;top:4px;color: #2F80F6;z-index: 2;}
        }
        .identifying-code{
          margin-top: 20px;
          input{width: 100%;height: 100%;border-radius:50%;padding-left: 36px;}
          .code{position: absolute;right: 40px;top:20px;color: #BBB;z-index: 2;}
          .isOver{color: #2F80F6;}
        }
        .remind{
          margin-top: 30px;font-size:24px;color: #999;padding-left: 27px;vertical-align: top;
          icon{margin-right: 12px;}
          div{width: 510px;display: inline-block;vertical-align: top;}
          i{color: #999;}
          span{color: #2F80F6;}
        }
        .login{margin-top: 30px;;width:600px;padding: 29px 0;text-align: center;background:linear-gradient(90deg,rgba(0,150,255,1) 0%,rgba(47,128,246,1) 100%);border-radius:45px;opacity:0.5;color: #fff;font-size:32px;line-height: 1;border:0;}
        .hight{opacity:1;}
      }

    }
    .outerBox{
      position: absolute;top: 70px;left: 20px;right: 20px;bottom: 90px;background-color: #fff;box-shadow:0px 0px 20px 0px rgba(221,221,221,0.5);border-radius:6px;
    }
    .body-mask {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: 10;
      width: 750px;
      height: 100%;
      background: rgba(0,0,0,0.40);

      .dialog-box {
        position: absolute;
        top: 30px;
        right: 30px;
        bottom: 30px;
        width: 690px;
        height: 1071px;
        background: #fff;
        padding: 0 40px;
        box-shadow: 0 6px 30px 0 rgba(0,0,0,0.10);
        border-radius: 6px;

        h1 {
          margin: 60px auto 20px;
          font-size: 32px;
          color: #333;
        }

        .content {
          width: 610px;
          height: 870px;
          margin: 0 auto;
          overflow: auto;

          p {
            font-size: 24px;
            line-height: 36px;
            color: #666;
            text-align: left;
          }

        }

      }

      .close {
        position: absolute;
        top: 1060.8px;
        left: 336.8px;
        width: 90.5px;
        height: 90.5px;
        border-radius: 50%;
        background: url(~assets/img/icon/chacha.png) no-repeat center center #666;
        background-size: 42.5px;
      }

    }
  }
</style>
