const fields = document.querySelectorAll('table input');
const dateField = document.querySelector('#date');
const status = document.querySelector('#status');
const values = {};
const calculated = {};
let date = "";
let dn = 0;

document.querySelectorAll('input').forEach(function (x) {
    x.addEventListener('change', calculate);
});

dateField.addEventListener('change', getDate);

start();
// dummy();

function start() {
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    const b = new Date().getTime();
    dn = Math.ceil((b - a) / (24 * 3600 * 1000));
    setDate();
    // getDate();
}

function getDate() {
    const dt = dateField.value;
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    const b = new Date(dt).getTime();
    dn = Math.ceil((b - a) / (24 * 3600 * 1000));
    console.log(dn);
    date = readableDate(dn);
    getData();
}

function setDate() {
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    const b = new Date(a + (dn - 1) * (24 * 3600 * 1000));
    console.log(b,b.toISOString().slice(0, 10));
    dateField.value = b.toISOString().slice(0, 10);
    console.log(new Date(dateField.value));
    const pdn = dn - 1;
    const hdn = dn - 2;
    document.querySelector('.pdate-disp').innerHTML = readableDate(pdn);
    document.querySelector('.hdate-disp').innerHTML = readableDate(hdn);
    document.querySelector('.odate-disp').innerHTML = readableDate(pdn);
}

function readableDate(dn) {
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    const b = new Date(a + (dn - 1) * (24 * 3600 * 1000));
    return b.toString().slice(0, 15);
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

function getData() {
    
    console.log('Fetching data for' + readableDate(dn));
    const xhr = new XMLHttpRequest();
    xhr.open('GET', './serv/get.php');
    xhr.send();
    fields.forEach(x => {
        x.val = 0;
    });
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const rs = this.responseText;
            const a = rs.indexOf("#[");
            const b = rs.indexOf(']#');
            const res = rs.slice(a + 1, b + 1);
            const rows = JSON.parse(res);
            let found = false;
            rows.forEach(x => {
                if (x.dn == dn) {
                    const k = JSON.parse(x.val);
                    for (y of Object.keys(k)) {
                        document.querySelector('#' + y).value = k[y];
                    }
                    calculate();

                    found = true;
                }
            })
            if (found) {
                log('Data available for ' + date);
            }
            else {
                log('No data for ' + date);
            }
        }
    }
    resetFields();
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

function log(txt) {
    status.value = txt;
}

function dummy() {
    console.log(readableDate(1));
    for (i = 1; i <= 10; i++) {
        dateField.value = readableDate(i);
    }
}