let port, writer, reader;

async function connectSerial() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 115200 });
        writer = port.writable.getWriter();
        reader = port.readable.getReader();
        readSerial();
        console.log("Serial connected");
    } catch (err) {
        console.error("Serial connection failed", err);
    }
}

async function readSerial() {
    while (port.readable) {
        const { value, done } = await reader.read();
        if (done) break;
        const text = new TextDecoder().decode(value);
        console.log("Received:", text);
        processSerialData(text);
    }
}

function processSerialData(data) {
    if (data.startsWith("DATA:")) {
        document.getElementById("nfcOutput").innerText = data.substring(5).trim();
    } else if (data.includes("WRITE_OK")) {
        alert("NFC書き込み成功！");
    } else if (data.includes("READ_FAIL") || data.includes("WRITE_FAIL")) {
        alert("NFCエラー: " + data);
    }
}

async function writeNFC() {
    const setupNumber = document.getElementById("setupNumber").value;
    const location = document.getElementById("location").value;
    const deviceNumber = document.getElementById("deviceNumber").value;
    const dropProtection = document.getElementById("dropProtection").value;
    const nfcData = `SETUP:${setupNumber}, LOC:${location}, DEV:${deviceNumber}, DROP:${dropProtection}`;

    if (!port || !writer) {
        alert("Arduinoと接続してください！");
        return;
    }

    await writer.write(new TextEncoder().encode("WRITE:" + nfcData + "\n"));
    alert("NFCに書き込み完了！");
}

async function readNFC() {
    if (!port || !writer) {
        alert("Arduinoと接続してください！");
        return;
    }

    await writer.write(new TextEncoder().encode("READ\n"));
}

document.getElementById("setupInput").addEventListener("click", function() {
    document.getElementById("mainContent").innerHTML = `
        <h4>セットアップ証明書入力</h4>
        <p>
        <label for="name">セットアップ申込者</label>
<input 
  type="text" 
  id="name" 
  name="name" 
  required 
  minlength="4" 
  maxlength="8" 
  size="10" 
/>
<p>
            <label>セットアップ管理番号:</label>
            <select id="setupNumber">
<option value="48293741">48293741</option>
<option value="19530628">19530628</option>
<option value="67231849">67231849</option>
<option value="80472195">80472195</option>
<option value="39485712">39485712</option>
<option value="50394827">50394827</option>
<option value="78104936">78104936</option>
<option value="28576193">28576193</option>
<option value="67930418">67930418</option>
<option value="81049237">81049237</option>
<option value="26483975">26483975</option>
<option value="52703186">52703186</option>
<option value="34820759">34820759</option>
<option value="75948316">75948316</option>
<option value="94102735">94102735</option>
<option value="20485973">20485973</option>
<option value="81732490">81732490</option>
<option value="69502837">69502837</option>
<option value="37248591">37248591</option>
<option value="15870934">15870934</option>
<option value="83047529">83047529</option>
<option value="49237518">49237518</option>
<option value="67482930">67482930</option>
<option value="59184732">59184732</option>
<option value="30675942">30675942</option>
<option value="74509281">74509281</option>
<option value="21894736">21894736</option>
<option value="93745260">93745260</option>
<option value="52368147">52368147</option>
<option value="80791634">80791634</option>
<option value="42683957">42683957</option>
<option value="56123098">56123098</option>
<option value="73958204">73958204</option>
<option value="48576312">48576312</option>
<option value="25037489">25037489</option>
<option value="61497520">61497520</option>
<option value="39758240">39758240</option>
<option value="48263917">48263917</option>
<option value="85029137">85029137</option>
<option value="61958347">61958347</option>
<option value="43752018">43752018</option>
<option value="57381049">57381049</option>
<option value="20487365">20487365</option>
<option value="67934028">67934028</option>
<option value="39572014">39572014</option>
<option value="81743260">81743260</option>
<option value="52849301">52849301</option>
<option value="37264891">37264891</option>
<option value="96058324">96058324</option>
<option value="81023794">81023794</option>
<option value="25743180">25743180</option>
<option value="39482715">39482715</option>
<option value="60473891">60473891</option>
<option value="29164783">29164783</option>
<option value="87034195">87034195</option>
<option value="13657042">13657042</option>
<option value="74892036">74892036</option>
<option value="38507142">38507142</option>
<option value="50983674">50983674</option>
<option value="74059281">74059281</option>
<option value="61237458">61237458</option>
<option value="95082347">95082347</option>
<option value="48392075">48392075</option>
<option value="27583049">27583049</option>
<option value="82641937">82641937</option>
<option value="43095821">43095821</option>
<option value="61943075">61943075</option>
<option value="57892034">57892034</option>
<option value="34729058">34729058</option>
<option value="89532074">89532074</option>
<option value="20967341">20967341</option>
<option value="73840529">73840529</option>
<option value="26483905">26483905</option>
<option value="58019437">58019437</option>
<option value="13978264">13978264</option>
<option value="67549128">67549128</option>
<option value="82395740">82395740</option>
<option value="40723981">40723981</option>
<option value="52648179">52648179</option>
<option value="18394726">18394726</option>
<option value="45739218">45739218</option>
<option value="59420387">59420387</option>
<option value="73284910">73284910</option>
<option value="48203975">48203975</option>
<option value="63017492">63017492</option>
<option value="90718435">90718435</option>
<option value="51739264">51739264</option>
<option value="29473850">29473850</option>
<option value="83745019">83745019</option>
<option value="90438527">90438527</option>
<option value="56147390">56147390</option>
<option value="37291864">37291864</option>
<option value="84720591">84720591</option>
<option value="63951742">63951742</option>
<option value="21580473">21580473</option>
<option value="48719365">48719365</option>
<option value="92650418">92650418</option>
<option value="73481925">73481925</option>
<option value="38019264">38019264</option>
<option value="52168374">52168374</option>
<option value="69740381">69740381</option>
<option value="83659104">83659104</option>
<option value="49137285">49137285</option>
<option value="25794068">25794068</option>
<option value="61084395">61084395</option>
<option value="30827416">30827416</option>
<option value="57963041">57963041</option>
<option value="82476093">82476093</option>
<option value="14683705">14683705</option>
<option value="60258741">60258741</option>
<option value="49831726">49831726</option>
<option value="71349528">71349528</option>
<option value="35694017">35694017</option>
<option value="82037495">82037495</option>
<option value="47586132">47586132</option>
<option value="94068253">94068253</option>
<option value="32851647">32851647</option>
<option value="61748290">61748290</option>
<option value="84015736">84015736</option>
<option value="19583042">19583042</option>
<option value="27364158">27364158</option>
<option value="61940375">61940375</option>
<option value="78420916">78420916</option>
<option value="30587149">30587149</option>
<option value="46029371">46029371</option>
<option value="59248036">59248036</option>
<option value="81039572">81039572</option>
<option value="43751928">43751928</option>
<option value="95864027">95864027</option>
<option value="60471938">60471938</option>
<option value="37268419">37268419</option>
<option value="24987356">24987356</option>
<option value="71820549">71820549</option>
<option value="53687140">53687140</option>
<option value="40952783">40952783</option>
<option value="89231057">89231057</option>
<option value="67415892">67415892</option>
<option value="52039478">52039478</option>

            </select>
<p>
            <label>設置場所:</label>
            <select id="location">
                <option value="屋内">屋内</option>
                <option value="屋外">屋外</option>
            </select>
            <p>
<label>総務省規定内電波の有無</label>
            <select id="location">
                <option value="〇">〇</option>
                <option value="✕">✕</option>
            </select>
<p>
            <label>モジュールな
どによる電波
発信</label>
            <select id="location">
                <option value="〇">〇</option>
                <option value="✕">✕</option>
            </select>
            <p>
            <label>電源モジュール</label>
            <select id="location">
                <option value="〇">〇</option>
                <option value="✕">✕</option>
            </select>
            <p>
            <label>機器管理番号:</label>
            <select id="deviceNumber">
                <option value="42085713">42085713</option>
<option value="91830642">91830642</option>
<option value="70324985">70324985</option>
<option value="59613478">59613478</option>
<option value="83104756">83104756</option>
<option value="47291583">47291583</option>
<option value="60973824">60973824</option>
<option value="37418250">37418250</option>
<option value="82571934">82571934</option>
<option value="19384627">19384627</option>
<option value="54829163">54829163</option>
<option value="61248579">61248579</option>
<option value="72905348">72905348</option>
<option value="30485716">30485716</option>
<option value="49083274">49083274</option>
<option value="87562349">87562349</option>
<option value="21983765">21983765</option>
<option value="74859032">74859032</option>
<option value="63048192">63048192</option>
<option value="50927384">50927384</option>
<option value="18347592">18347592</option>
<option value="68275943">68275943</option>
<option value="42169580">42169580</option>
<option value="73920458">73920458</option>
<option value="56084379">56084379</option>
<option value="81726435">81726435</option>
<option value="34581907">34581907</option>
<option value="60295841">60295841</option>
<option value="48372095">48372095</option>
<option value="28457031">28457031</option>
<option value="90751248">90751248</option>
<option value="62489305">62489305</option>
<option value="51372048">51372048</option>
<option value="87965420">87965420</option>
<option value="74268501">74268501</option>
<option value="63091725">63091725</option>
<option value="58120439">58120439</option>
<option value="49273810">49273810</option>
<option value="75043291">75043291</option>
<option value="91468507">91468507</option>
<option value="32058741">32058741</option>
<option value="85674920">85674920</option>
<option value="40726159">40726159</option>
<option value="53482769">53482769</option>
<option value="61395824">61395824</option>
<option value="82745016">82745016</option>
<option value="34059827">34059827</option>
<option value="56284719">56284719</option>
<option value="47805329">47805329</option>
<option value="90623148">90623148</option>
<option value="75892063">75892063</option>
<option value="48217395">48217395</option>
<option value="62904813">62904813</option>
<option value="91756238">91756238</option>
<option value="34827051">34827051</option>
<option value="85192407">85192407</option>
<option value="60381752">60381752</option>
<option value="27419386">27419386</option>
<option value="42965830">42965830</option>
<option value="71058294">71058294</option>
<option value="39487561">39487561</option>
<option value="58246039">58246039</option>
<option value="40791352">40791352</option>
<option value="83572904">83572904</option>
<option value="69248175">69248175</option>
<option value="10395248">10395248</option>
<option value="74982036">74982036</option>
<option value="50649137">50649137</option>
<option value="28761059">28761059</option>
<option value="85492301">85492301</option>
<option value="31948572">31948572</option>
<option value="94058761">94058761</option>
<option value="50743692">50743692</option>
<option value="21843750">21843750</option>
<option value="60438197">60438197</option>
<option value="75692043">75692043</option>
<option value="14038792">14038792</option>
<option value="58164739">58164739</option>
<option value="94728106">94728106</option>
<option value="36874019">36874019</option>
<option value="50298374">50298374</option>
<option value="83249057">83249057</option>
<option value="74810925">74810925</option>
<option value="20937546">20937546</option>
<option value="63489520">63489520</option>
<option value="19387452">19387452</option>
<option value="42718503">42718503</option>
<option value="56923748">56923748</option>
<option value="40256813">40256813</option>
<option value="85049327">85049327</option>
<option value="93847152">93847152</option>
<option value="61928504">61928504</option>
<option value="75123089">75123089</option>
<option value="29037548">29037548</option>
<option value="40521879">40521879</option>
<option value="84715029">84715029</option>
<option value="63198475">63198475</option>
<option value="50219386">50219386</option>
<option value="94057283">94057283</option>
<option value="31870425">31870425</option>
<option value="75249168">75249168</option>
<option value="61023479">61023479</option>
<option value="85943210">85943210</option>
<option value="49372185">49372185</option>
<option value="76120843">76120843</option>
<option value="43958721">43958721</option>
<option value="85730249">85730249</option>
<option value="20694578">20694578</option>
<option value="93457201">93457201</option>
<option value="41827536">41827536</option>
<option value="76592830">76592830</option>
<option value="82940137">82940137</option>
<option value="50418396">50418396</option>
<option value="71804325">71804325</option>
<option value="30795241">30795241</option>
<option value="84913276">84913276</option>
<option value="69387105">69387105</option>
<option value="24089573">24089573</option>
<option value="83276049">83276049</option>
<option value="54128930">54128930</option>
<option value="93841562">93841562</option>
<option value="76843250">76843250</option>
<option value="62049538">62049538</option>
<option value="75920148">75920148</option>
<option value="40581793">40581793</option>
<option value="31649287">31649287</option>
<option value="89453027">89453027</option>
<option value="72045981">72045981</option>
<option value="50382746">50382746</option>
<option value="61890423">61890423</option>
<option value="75934182">75934182</option>
<option value="49283710">49283710</option>
<option value="68247105">68247105</option>
<option value="35097184">35097184</option>
<option value="42918367">42918367</option>
<option value="67105948">67105948</option>
<option value="54281736">54281736</option>
<option value="30178469">30178469</option>
<option value="72984310">72984310</option>
<option value="48507219">48507219</option>
<option value="62948375">62948375</option>
<option value="81305792">81305792</option>
<option value="57048329">57048329</option>
<option value="94217536">94217536</option>
<option value="32841950">32841950</option>
<option value="60749182">60749182</option>
<option value="81426530">81426530</option>
<option value="52948037">52948037</option>
<option value="30842795">30842795</option>
<option value="75019286">75019286</option>
<option value="98204537">98204537</option>
<option value="57302849">57302849</option>
<option value="30596481">30596481</option>
<option value="82034759">82034759</option>
<option value="75492083">75492083</option>
</option>
            </select>
<p>
            <label>落下防止装置の有無:</label>
            <select id="dropProtection">
                <option value="あり">あり</option>
                <option value="なし">なし</option>
            </select>
<p>
            <button id="connectSerial">データクリア</button>
            <p>
            <button id="writeNFC">書き込み開始</button>
            

        </form>
    `;
    document.getElementById("connectSerial").addEventListener("click", connectSerial);
    document.getElementById("writeNFC").addEventListener("click", function() {
        document.getElementById("mainContent").innerHTML = `
            <h4>NFC書き込み中...</h4>
            <div id="progressBar" style="width: 100%; background-color: #f3f3f3;">
                <div id="progress" style="width: 0%; height: 30px; background-color: #4caf50;"></div>
            </div>
        `;
        let progress = document.getElementById("progress");
        let width = 0;
        let interval = setInterval(function() {
            if (width >= 100) {
                clearInterval(interval);
                document.getElementById("mainContent").innerHTML = `
                    <h4>NFC書き込み完了</h4>
                    <a href="11.pdf" download="セットアップ証明書.pdf">
                        PDFをダウンロード
                    </a>
                `;
            } else {
                width += Math.random() * 2; // 進行速度をランダムにする
                progress.style.width = width + '%';
            }
        }, 200); // 200msごとに更新
    });
});

document.getElementById("nfcRead").addEventListener("click", function() {
    document.getElementById("mainContent").innerHTML = `
        <h4>カード読み取り</h4>
        <button id="readNFC">カードを読み取る</button>
        <pre id="nfcOutput">カード情報がここに表示されます</pre>
    `;
    document.getElementById("readNFC").addEventListener("click", readNFC);
});
