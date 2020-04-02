
const pf = document.querySelectorAll('.production table input');
const hf = document.querySelectorAll('.hemm table input');
const of = document.querySelectorAll('.others table input');

const df = document.querySelector('#date');

const pfv = {};
const hfv = {};
const ofv = {};

const pcv = {};
const hcv = {};
const ocv = {};


const adf = document.querySelectorAll('input');
adf.forEach(function (x) {
    x.addEventListener('change', calculate);
});


start();

function start() {
    const a = new Date();
    const b = a.toISOString();
    const c = b.slice(0, 10);
    df.value = c; 
    updateDates();
}

function updateDates() {
    const dt = df.value;
    cdn = date2number(dt);
    pdn = cdn - 1;
    hdn = cdn - 2;
    pdf = formatedDate(pdn);
    hdf = formatedDate(hdn);
    document.querySelector('.pdate-disp').innerHTML = pdf;
    document.querySelector('.hdate-disp').innerHTML = hdf;
    document.querySelector('.odate-disp').innerHTML = pdf;

}

function date2number(dt) {
    const a = new Date(2018, 3, 1, 0, 6, 0, 0);
    const b = a.getTime();
    const u = new Date(dt);
    const v = u.getTime();
    const w = Math.ceil((v - b) / (24 * 3600 * 1000))
    return w;
}

function number2date(dn) {

    const a = new Date(2018, 3, 1, 0, 6, 0, 0);
    const b = a.getTime();
    const c = b + (dn-1) * (24 * 3600 * 1000);
    const d = new Date(c);
    return d;
}

function formatedDate(dn) {
    const a = new Date(number2date(dn));
    return a.toString().slice(0, 15);
}

function calculate() {

    updateDates();
 

    pf.forEach(x => {
        pfv[x.id] = +x.value;
    });

    hf.forEach(x => {
        hfv[x.id] = +x.value;
    });


    of.forEach(x => {
        ofv[x.id] = +x.value;
    });


    pcv.coalsd = pfv.g8 + pfv.g10sd;
    pcv.coalsm = pfv.g10sm;

    pcv.totalcoal = pcv.coalsd + pcv.coalsm;

    pcv.obsd = pfv.depteast + pfv.deptwest + pfv.deptcoal;
    pcv.obdl = pfv.jwalasolid + pfv.vindhyasolid + pfv.jyotisolid + pfv.pawansolid;
    pcv.dlreh = pfv.jwalareh + pfv.vindhyareh + pfv.jyotireh + pfv.pawanreh;

    pcv.deptob = pcv.obsd + pcv.obdl;
    pcv.outob = pfv.outeasttop + pfv.outwesttop + pfv.outeastmid + pfv.outwestmid + pfv.outeastdl + pfv.outwestdl;
    pcv.totalob = pcv.deptob + pcv.outob;

    pcv.silog8 = pfv.g8;
    pcv.silog10 = pfv.totalsilo - pfv.g8;
    pcv.totaldesp = pfv.totalsilo + pfv.wwg10 + pfv.roadg10;
    pcv.netdesp = pcv.totaldesp - pfv.rwwg10 - pfv.rchpg10;



    hcv.dlah = hfv.dlavl;
    hcv.dlwh = hfv.dlutl;
    hcv.shvah = hfv.shvavl + hfv.shvutls;
    hcv.shvwh = hfv.shvutl + hfv.shvutls;
    hcv.d85ah = hfv.d85avl + hfv.d85utls;
    hcv.d85wh = hfv.d85utl + hfv.d85utls;
    hcv.d120ah = hfv.d120avl + hfv.d120utls;
    hcv.d120wh = hfv.d120utl + hfv.d120utls;
    hcv.dumperah = hfv.d85avl + hfv.d85utls + hfv.d120avl + hfv.d120utls;
    hcv.dumperwh = hfv.d85utl + hfv.d85utls + hfv.d120utl + hfv.d120utls

    displayCalculated();
}

function displayCalculated() {

    for (x of Object.keys(pcv)) {
        document.querySelector('#' + x).innerText = pcv[x];
    }

    for (x of Object.keys(hcv)) {
        document.querySelector('#' + x).innerText = hcv[x];
    }
}




