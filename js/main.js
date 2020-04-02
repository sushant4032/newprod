const fields = document.querySelectorAll('table input');
const dateField = document.querySelector('#date');
const values = {};
const calculated = {};
let date = "";
let dn = 0;

document.querySelectorAll('input').forEach(function (x) {
    x.addEventListener('change', calculate);
});

start();

function start() {
    dateField.value = new Date().toISOString().slice(0, 10);
    updateDates();
}

function updateDates() {
    date = dateField.value;
    dn = date2number(date);
    const pdn = dn - 1;
    const hdn = dn - 2;
    document.querySelector('.pdate-disp').innerHTML = formatedDate(pdn);
    document.querySelector('.hdate-disp').innerHTML = formatedDate(hdn);
    document.querySelector('.odate-disp').innerHTML = formatedDate(pdn);
}

function date2number(dt) {
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    const b = new Date(dt).getTime();
    return Math.ceil((b - a) / (24 * 3600 * 1000))
}

function number2date(dn) {
    const a = new Date(2018, 3, 1, 0, 6, 0, 0).getTime();
    return new Date(a + (dn - 1) * (24 * 3600 * 1000));
}

function formatedDate(dn) {
    const a = new Date(number2date(dn));
    return a.toString().slice(0, 15);
}

function calculate() {
    updateDates();

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
    xhr.open('POST', './serv/prod.php', true);
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    }
}
