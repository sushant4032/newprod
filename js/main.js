const fields = document.querySelectorAll('table input');
const dateField = document.querySelector('#date');
const statusField = document.querySelector('#status');
const begining = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
const values = {};
const calculated = {};
let date = "";
let dn = 0;


document.querySelectorAll('input').forEach(function (x) {
    x.addEventListener('change', calculate);
});

dateField.addEventListener('change', readDate);

start();

async function start() {
    dn = Math.floor((new Date().getTime() - begining) / (24 * 3600 * 1000));
    setDate();
    show('Fetching server data');
    await downloadServerData();
    getData();
}

function setDate() {
    dateField.value = formattedDate(dn);
    document.querySelector('.pdate-disp').innerHTML = readableDate(dn - 1);
    document.querySelector('.hdate-disp').innerHTML = readableDate(dn - 2);
    document.querySelector('.odate-disp').innerHTML = readableDate(dn - 1);
}

function formattedDate(dn) {
    const a = new Date(begining + (dn * 24 * 3600 * 1000));
    const b = a.getFullYear().toString() + "-" + (a.getMonth() + 1).toString().padStart(2, '0')
        + "-" + a.getDate().toString().padStart(2, '0');
    return b;
}

function getData() {
    const currentDateData = JSON.parse(localStorage.getItem(dn));
    resetFields();
    if (currentDateData) {
        show('Data found for ' + readableDate(dn));
        console.log(currentDateData);
        for (x of Object.keys(currentDateData)) {
            document.querySelector('#' + x).value = currentDateData[x];
        }
        calculate();
    }
    else {
        show('Data not available for ' + readableDate(dn));
    }
}

function downloadServerData() {
    promise = new Promise((resolve, reject)=>{
        let count = 0;
        localStorage.clear();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', './serv/get.php');
        xhr.send();
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const rs = this.responseText;
                const a = rs.indexOf("#[");
                const b = rs.indexOf(']#');
                const res = rs.slice(a + 1, b + 1);
                const rows = JSON.parse(res);
                rows.forEach(x => {
                    localStorage.setItem(x.dn, x.val);
                    count++;
                });
                show(`Fetched ${count} entries `);
                resolve();
            }
        }
    });
    return promise;
}

function readDate() {
    const dt = dateField.value;
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    const b = new Date(dt).getTime();
    dn = Math.floor((b - a) / (24 * 3600 * 1000));
    date = formattedDate(dn);
    getData();
}



function readableDate(dn) {
    return new Date(begining + (dn * 24 * 3600 * 1000)).toDateString();
}



function resetFields() {
    fields.forEach(x => {
        x.value = "";
    });
    calculate();
}

function calculate() {

    fields.forEach(x => {
        values[x.id] = +x.value;
    });

    calculated.coalsd = values.g8 + values.g10sd;
    calculated.coalsm = values.g10sm;
    calculated.totalcoal = calculated.coalsd + calculated.coalsm;
    calculated.obsd = values.depteast + values.deptwest + values.deptcoal;
    calculated.obdl = values.jwalasolid + values.vindhyasolid + values.jyotisolid + values.pawansolid;
    calculated.dlreh = values.jwalareh + values.vindhyareh + values.jyotireh + values.pawanreh;
    calculated.deptob = calculated.obsd + calculated.obdl;
    calculated.outob = values.outeasttop + values.outwesttop + values.outeastmid + values.outwestmid + values.outeastdl + values.outwestdl;
    calculated.totalob = calculated.deptob + calculated.outob;
    calculated.silog8 = values.g8;
    calculated.silog10 = values.totalsilo - values.g8;
    calculated.totaldesp = values.totalsilo + values.wwg10 + values.roadg10;
    calculated.netdesp = calculated.totaldesp - values.rwwg10 - values.rchpg10;
    calculated.dlah = values.dlavl;
    calculated.dlwh = values.dlutl;
    calculated.shvah = values.shvavl + values.shvutls;
    calculated.shvwh = values.shvutl + values.shvutls;
    calculated.d85ah = values.d85avl + values.d85utls;
    calculated.d85wh = values.d85utl + values.d85utls;
    calculated.d120ah = values.d120avl + values.d120utls;
    calculated.d120wh = values.d120utl + values.d120utls;
    calculated.dumperah = values.d85avl + values.d85utls + values.d120avl + values.d120utls;
    calculated.dumperwh = values.d85utl + values.d85utls + values.d120utl + values.d120utls

    for (x of Object.keys(calculated)) {
        document.querySelector('#' + x).innerText = calculated[x];
    }
}



function submit() {
    const xhr = new XMLHttpRequest();
    const data = {
        'dn': dn,
        'dt': date,
        'val': JSON.stringify(values)
    }
    xhr.open('POST', './serv/sub.php', true);
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
        }
    }
}

function show(txt) {
    statusField.value = txt;
    console.log(txt);
}

function dummy() {
    const k = dn;
    for (i = k - 50; i <= k + 50; i++) {
        dn = i;
        date = formattedDate(dn);
        for (x of Object.keys(values)) {
            values[x] = Math.floor(100 * Math.random());
        }
        submit();
    }
}