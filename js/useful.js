function getData() {
    console.log('Fetching data for ' + readableDate(dn));
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
                show('Data available for ' + date);
            }
            else {
                show('No data for ' + date);
            }
        }
    }
    resetFields();
}