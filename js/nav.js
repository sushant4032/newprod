function showTab(x) {
    console.dir(x);
    const all = document.querySelectorAll('.section');
    console.log(all);
    all.forEach(function (x) {
        x.classList.add('hidden');
    })
    document.querySelector(x.getAttribute('data-tab')).classList.remove('hidden');

    x.parentElement.querySelectorAll('li').forEach(function (x) {
        x.classList.remove('active-tab');
    });

    x.classList.add('active-tab');
}